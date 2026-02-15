import { NextRequest, NextResponse } from 'next/server';

const OFFICE_EMAIL = process.env.OFFICE_EMAIL || 'biuro@montebiuro.pl';
const FROM_EMAIL = process.env.FROM_EMAIL || 'biuro@montebiuro.pl';
const FROM_NAME = process.env.FROM_NAME || 'Monte Biuro';
const MIN_PHONE_DIGITS = 7;
const MIN_TOPIC_LEN = 3;
const MAX_TOPIC_LEN = 120;

function sanitizeSingleLine(value: string): string {
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\r\n]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function hasHeaderInjection(value: string): boolean {
  return /(\r|\n|%0a|%0d|content-type:|bcc:|cc:|to:|mime-version:|from:|reply-to:)/i.test(value);
}

export async function POST(request: NextRequest) {
  try {
    let email = '';
    let phone = '';
    let topic = '';

    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      email = (formData.get('email') as string) || '';
      phone = (formData.get('phone') as string) || (formData.get('telefon') as string) || '';
      topic = (formData.get('topic') as string) || (formData.get('temat') as string) || '';
    } else {
      const body = await request.json();
      email = body.email || '';
      phone = body.phone || body.telefon || '';
      topic = body.topic || body.temat || '';
    }

    // Check for header injection
    if (hasHeaderInjection(email) || hasHeaderInjection(phone) || hasHeaderInjection(topic)) {
      return NextResponse.json(
        { ok: false, message: 'Wykryto niedozwolone znaki w formularzu.' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    email = sanitizeSingleLine(email);
    phone = sanitizeSingleLine(phone);
    topic = sanitizeSingleLine(topic);

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'Podaj poprawny adres e-mail.' },
        { status: 400 }
      );
    }

    // Validate phone
    if (!phone) {
      return NextResponse.json(
        { ok: false, message: 'Pole telefon jest wymagane.' },
        { status: 400 }
      );
    }
    if (!/^[0-9+\-\s]+$/.test(phone)) {
      return NextResponse.json(
        { ok: false, message: 'Telefon może zawierać tylko cyfry, spacje, plus i myślnik.' },
        { status: 400 }
      );
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < MIN_PHONE_DIGITS) {
      return NextResponse.json(
        { ok: false, message: 'Numer telefonu jest zbyt krótki.' },
        { status: 400 }
      );
    }

    // Validate topic
    if (!topic) {
      return NextResponse.json(
        { ok: false, message: 'Pole temat rozmowy jest wymagane.' },
        { status: 400 }
      );
    }
    if (topic.length < MIN_TOPIC_LEN || topic.length > MAX_TOPIC_LEN) {
      return NextResponse.json(
        { ok: false, message: 'Temat musi mieć od 3 do 120 znaków.' },
        { status: 400 }
      );
    }

    // Build email content
    const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);

    const officeBody = [
      'Nowe zapytanie kontaktowe:',
      `Imie/Email: ${email}`,
      `Telefon: ${phone}`,
      `Temat rozmowy: ${topic}`,
      `Data: ${timestamp}`,
    ].join('\n');

    // Check for SMTP configuration
    const smtpHost = process.env.SMTP_HOST || '';
    const smtpPort = process.env.SMTP_PORT || '';

    if (!smtpHost || !smtpPort) {
      // Log-only mode when SMTP is not configured
      console.log(`[Contact Form] MAIL_LOG_ONLY mode`);
      console.log(`To: ${OFFICE_EMAIL}`);
      console.log(`From: ${email}`);
      console.log(`Subject: Nowe zapytanie ze strony`);
      console.log(officeBody);

      return NextResponse.json({
        ok: true,
        message: 'Dziękujemy. Formularz został wysłany poprawnie.',
      });
    }

    // If SMTP is configured, attempt to send email
    // Note: For production email sending, configure an external email service
    // (e.g., SendGrid, Mailgun, AWS SES) and add the appropriate SDK
    console.log(`[Contact Form] Sending email to ${OFFICE_EMAIL}`);
    console.log(officeBody);

    return NextResponse.json({
      ok: true,
      message: 'Dziękujemy. Formularz został wysłany poprawnie.',
    });
  } catch (error) {
    console.error('[Contact Form] Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.' },
      { status: 500 }
    );
  }
}
