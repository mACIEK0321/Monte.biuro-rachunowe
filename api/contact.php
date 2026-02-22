<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=UTF-8');

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

const OFFICE_EMAIL = 'kontakt@montebiuro.pl';
const FROM_EMAIL = 'kontakt@montebiuro.pl';
const FROM_NAME = 'Monte Biuro Rachunkowe';
const MIN_PHONE_DIGITS = 7;
const MIN_TOPIC_LEN = 3;
const MAX_TOPIC_LEN = 120;
const PHPMAILER_SRC = __DIR__ . '/../lib/phpmailer/src';
const DEBUG_LOG_FILE = __DIR__ . '/mail-debug.log';

function json_response(bool $ok, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode(
        ['ok' => $ok, 'message' => $message],
        JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
    );
    exit;
}

function write_debug_log(string $message): void
{
    $line = sprintf("[%s] %s%s", date('Y-m-d H:i:s'), $message, PHP_EOL);
    @file_put_contents(DEBUG_LOG_FILE, $line, FILE_APPEND | LOCK_EX);
}

function as_bool(mixed $value, bool $default = false): bool
{
    if ($value === null || $value === '') {
        return $default;
    }

    if (is_bool($value)) {
        return $value;
    }

    $normalized = strtolower(trim((string) $value));
    if (in_array($normalized, ['1', 'true', 'yes', 'on'], true)) {
        return true;
    }
    if (in_array($normalized, ['0', 'false', 'no', 'off'], true)) {
        return false;
    }

    return $default;
}

function load_config(): array
{
    $config = [
        'office_email' => OFFICE_EMAIL,
        'from_email' => FROM_EMAIL,
        'from_name' => FROM_NAME,
        'smtp_host' => getenv('SMTP_HOST') ?: '',
        'smtp_port' => getenv('SMTP_PORT') ?: '',
        'smtp_user' => getenv('SMTP_USER') ?: '',
        'smtp_pass' => getenv('SMTP_PASS') ?: '',
        'smtp_encryption' => getenv('SMTP_ENCRYPTION') ?: (getenv('SMTP_SECURE') ?: 'starttls'),
        'smtp_auth' => getenv('SMTP_AUTH') ?: '1',
        'smtp_debug' => getenv('SMTP_DEBUG') ?: '0',
        'mail_log_only' => getenv('MAIL_LOG_ONLY') ?: '0',
    ];

    $configFile = __DIR__ . '/config.php';
    if (is_file($configFile)) {
        $fileConfig = require $configFile;
        if (is_array($fileConfig)) {
            $config = array_merge($config, $fileConfig);
        }
    }

    return $config;
}

function parse_payload(): array
{
    $contentType = (string) ($_SERVER['CONTENT_TYPE'] ?? '');

    if (stripos($contentType, 'application/json') !== false) {
        $raw = file_get_contents('php://input') ?: '';
        $decoded = json_decode($raw, true);
        return is_array($decoded) ? $decoded : [];
    }

    if (!empty($_POST)) {
        return $_POST;
    }

    $raw = file_get_contents('php://input') ?: '';
    if ($raw === '') {
        return [];
    }

    parse_str($raw, $parsed);
    return is_array($parsed) ? $parsed : [];
}

function sanitize_single_line(string $value): string
{
    $value = strip_tags($value);
    $value = str_replace(["\r", "\n"], ' ', $value);
    $value = trim($value);
    return preg_replace('/\s+/u', ' ', $value) ?? '';
}

function has_header_injection(string $value): bool
{
    return preg_match('/(\r|\n|%0a|%0d|content-type:|bcc:|cc:|to:|mime-version:|from:|reply-to:)/i', $value) === 1;
}

function utf8_length(string $value): int
{
    if (function_exists('mb_strlen')) {
        return mb_strlen($value, 'UTF-8');
    }

    return strlen($value);
}

function require_phpmailer(): void
{
    $requiredFiles = ['Exception.php', 'PHPMailer.php', 'SMTP.php'];
    foreach ($requiredFiles as $file) {
        $path = PHPMAILER_SRC . '/' . $file;
        if (!is_file($path)) {
            json_response(false, 'Brak biblioteki PHPMailer w katalogu lib/phpmailer/src.', 500);
        }
    }

    require_once PHPMAILER_SRC . '/Exception.php';
    require_once PHPMAILER_SRC . '/PHPMailer.php';
    require_once PHPMAILER_SRC . '/SMTP.php';
}

function build_mailer(array $config): PHPMailer
{
    $host = trim((string) ($config['smtp_host'] ?? ''));
    $user = trim((string) ($config['smtp_user'] ?? ''));
    $pass = (string) ($config['smtp_pass'] ?? '');
    $port = (int) ($config['smtp_port'] ?? 0);
    $encryption = strtolower(trim((string) ($config['smtp_encryption'] ?? 'starttls')));
    $smtpAuth = as_bool($config['smtp_auth'] ?? true, true);
    $smtpDebug = as_bool($config['smtp_debug'] ?? false, false);
    $fromEmail = sanitize_single_line((string) ($config['from_email'] ?? FROM_EMAIL));
    $fromName = sanitize_single_line((string) ($config['from_name'] ?? FROM_NAME));

    if ($host === '' || $port <= 0 || $port > 65535) {
        throw new RuntimeException('Nieprawidlowa konfiguracja SMTP_HOST / SMTP_PORT.');
    }
    if ($smtpAuth && ($user === '' || $pass === '')) {
        throw new RuntimeException('Brak SMTP_USER lub SMTP_PASS.');
    }
    if ($fromEmail === '' || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
        throw new RuntimeException('Nieprawidlowa konfiguracja from_email.');
    }
    if ($fromName === '') {
        $fromName = 'Kontakt';
    }

    $mailer = new PHPMailer(true);
    $mailer->CharSet = 'UTF-8';
    $mailer->Encoding = 'base64';
    $mailer->isSMTP();
    $mailer->Host = $host;
    $mailer->Port = $port;
    $mailer->SMTPAuth = $smtpAuth;
    $mailer->Username = $user;
    $mailer->Password = $pass;
    $mailer->SMTPDebug = $smtpDebug ? 2 : 0;
    $mailer->Timeout = 15;
    $mailer->isHTML(false);

    if ($encryption === 'smtps' || $encryption === 'ssl') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    } elseif ($encryption === 'starttls' || $encryption === 'tls') {
        $mailer->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    } else {
        throw new RuntimeException('Nieprawidlowe SMTP_ENCRYPTION. Uzyj: smtps albo starttls.');
    }

    $mailer->setFrom($fromEmail, $fromName);
    return $mailer;
}

function send_or_log(array $config, string $to, string $subject, string $body, ?string $replyTo = null): void
{
    if (as_bool($config['mail_log_only'] ?? false, false)) {
        write_debug_log(
            sprintf(
                "MAIL_LOG_ONLY to=%s subject=\"%s\" replyTo=%s\n%s",
                $to,
                $subject,
                $replyTo ?: '-',
                $body
            )
        );
        return;
    }

    $mailer = build_mailer($config);
    $mailer->addAddress($to);

    if ($replyTo !== null && $replyTo !== '') {
        $mailer->addReplyTo($replyTo);
    }

    $mailer->Subject = $subject;
    $mailer->Body = $body;
    $mailer->send();
}

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    json_response(false, 'Dozwolona jest tylko metoda POST.', 405);
}

require_phpmailer();
$config = load_config();
$payload = parse_payload();
$officeEmail = sanitize_single_line((string) ($config['office_email'] ?? OFFICE_EMAIL));
$fromEmail = sanitize_single_line((string) ($config['from_email'] ?? FROM_EMAIL));

if ($officeEmail === '' || !filter_var($officeEmail, FILTER_VALIDATE_EMAIL)) {
    json_response(false, 'Nieprawidlowa konfiguracja adresu odbiorczego.', 500);
}
if ($fromEmail === '' || !filter_var($fromEmail, FILTER_VALIDATE_EMAIL)) {
    json_response(false, 'Nieprawidlowa konfiguracja adresu nadawcy.', 500);
}

$emailRaw = (string) ($payload['email'] ?? '');
$phoneRaw = (string) ($payload['telefon'] ?? ($payload['phone'] ?? ''));
$topicRaw = (string) ($payload['temat'] ?? ($payload['topic'] ?? ''));

if (has_header_injection($emailRaw) || has_header_injection($phoneRaw) || has_header_injection($topicRaw)) {
    json_response(false, 'Wykryto niedozwolone znaki w formularzu.', 400);
}

$email = sanitize_single_line($emailRaw);
$phone = sanitize_single_line($phoneRaw);
$topic = sanitize_single_line($topicRaw);

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(false, 'Podaj poprawny adres e-mail.', 400);
}

if ($phone === '') {
    json_response(false, 'Pole telefon jest wymagane.', 400);
}
if (preg_match('/^[0-9+\-\s]+$/', $phone) !== 1) {
    json_response(false, 'Telefon moze zawierac tylko cyfry, spacje, plus i myslnik.', 400);
}
$phoneDigits = preg_replace('/\D/', '', $phone) ?? '';
if (strlen($phoneDigits) < MIN_PHONE_DIGITS) {
    json_response(false, 'Numer telefonu jest zbyt krotki.', 400);
}

if ($topic === '') {
    json_response(false, 'Pole temat rozmowy jest wymagane.', 400);
}
$topicLength = utf8_length($topic);
if ($topicLength < MIN_TOPIC_LEN || $topicLength > MAX_TOPIC_LEN) {
    json_response(false, 'Temat musi miec od 3 do 120 znakow.', 400);
}

$timestamp = date('Y-m-d H:i:s');

$officeSubject = 'Nowe zapytanie ze strony';
$officeBody = implode("\n", [
    'Nowe zapytanie kontaktowe:',
    'Imie/Email: ' . $email,
    'Telefon: ' . $phone,
    'Temat rozmowy: ' . $topic,
    'Data: ' . $timestamp,
]);

$clientSubject = 'Potwierdzenie otrzymania zgloszenia';
$clientBody = implode("\n", [
    'Dziekujemy za kontakt z Monte Biuro.',
    'Otrzymalismy Twoje zgloszenie i skontaktujemy sie mozliwie szybko.',
    'Jesli sprawa jest pilna, mozesz odpisac bezposrednio na tego maila.',
]);

try {
    send_or_log($config, $officeEmail, $officeSubject, $officeBody, $email);
    send_or_log($config, $email, $clientSubject, $clientBody, $fromEmail);

    json_response(true, 'Dziekujemy. Formularz zostal wyslany poprawnie.');
} catch (Exception $e) {
    write_debug_log('PHPMailer exception: ' . $e->getMessage());
    json_response(false, 'Nie udalo sie wyslac wiadomosci. Sprobuj ponownie za chwile.', 500);
} catch (Throwable $e) {
    write_debug_log('General exception: ' . $e->getMessage());
    json_response(false, 'Blad konfiguracji serwera poczty.', 500);
}
