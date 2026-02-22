import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const OFFICE_EMAIL = process.env.OFFICE_EMAIL || 'kontakt@montebiuro.pl';
const FROM_EMAIL = process.env.FROM_EMAIL || 'kontakt@montebiuro.pl';
const FROM_NAME = process.env.FROM_NAME || 'Monte Biuro Rachunkowe';
const MIN_PHONE_DIGITS = 7;
const MIN_TOPIC_LEN = 3;
const MAX_TOPIC_LEN = 120;

function sanitizeSingleLine(value: string): string {
  let result = value;
  let prev = '';
  while (result !== prev) {
    prev = result;
    result = result.replace(/<[^>]*>/g, '');
  }
  return result
    .replace(/[\r\n]/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function hasHeaderInjection(value: string): boolean {
  return /(\r|\n|%0a|%0d|content-type:|bcc:|cc:|to:|mime-version:|from:|reply-to:)/i.test(value);
}

export async function POST(request: NextRequest) {
  console.log('=== EMAIL API CALLED ===')
  console.log('Timestamp:', new Date().toISOString())
  
  try {
    let email = '';
    let phone = '';
    let topic = '';

    const contentType = request.headers.get('content-type') || '';
    console.log('Content-Type:', contentType)

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

    console.log('Sanitized data:', { email, phone: phone.substring(0, 5) + '***', topic: topic.substring(0, 20) + '...' })

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
    const timestamp = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

    // Check SMTP credentials
    const smtpHost = process.env.SMTP_HOST || 'serwer2657383.home.pl';
    const smtpPort = process.env.SMTP_PORT || '465';
    const smtpUser = process.env.EMAIL_USER || '';
    const smtpPass = process.env.EMAIL_PASS || '';

    console.log('SMTP Configuration:')
    console.log('  SMTP_HOST:', smtpHost || '❌ NOT SET')
    console.log('  SMTP_PORT:', smtpPort || '❌ NOT SET')
    console.log('  EMAIL_USER:', smtpUser || '❌ NOT SET')
    console.log('  EMAIL_PASS:', smtpPass ? '✅ SET (length: ' + smtpPass.length + ')' : '❌ NOT SET')

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass) {
      console.error('❌ [Contact Form] MAIL_LOG_ONLY mode - SMTP not fully configured')
      console.error('  SMTP_HOST:', smtpHost || 'MISSING')
      console.error('  SMTP_PORT:', smtpPort || 'MISSING')
      console.error('  EMAIL_USER:', smtpUser || 'MISSING')
      console.error('  EMAIL_PASS:', smtpPass ? 'SET' : 'MISSING')
      console.log(`To: ${OFFICE_EMAIL}`);
      console.log(`From: ${email}`);
      console.log(`Phone: ${phone}`);
      console.log(`Topic: ${topic}`);
      console.log(`Date: ${timestamp}`);

      return NextResponse.json(
        {
          ok: false,
          message: 'Serwer email nie jest w pełni skonfigurowany. Skontaktuj się bezpośrednio: kontakt@montebiuro.pl lub 661 444 882.',
        },
        { status: 503 }
      );
    }

    // Configure nodemailer transporter
    console.log('Creating nodemailer transporter...')
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: parseInt(smtpPort, 10),
      secure: smtpPort === '465', // true for 465, false for other ports
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      },
      debug: true, // Enable debug output
      logger: true // Log to console
    });

    // Verify connection
    console.log('Verifying SMTP connection...')
    try {
      await transporter.verify()
      console.log('✅ SMTP connection verified successfully')
    } catch (verifyError: any) {
      console.error('❌ SMTP verification failed:', verifyError.message)
      console.error('Error details:', verifyError)
      return NextResponse.json(
        { ok: false, message: 'Błąd konfiguracji serwera email. Skontaktuj się przez telefon.' },
        { status: 500 }
      )
    }

    try {
      console.log('Sending email to office...')
      // Send email to office
      const infoMail = await transporter.sendMail({
        from: `"${FROM_NAME}" <${smtpUser}>`,
        to: OFFICE_EMAIL,
        subject: `Nowe zapytanie z formularza: ${topic}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00a86b;">Nowe zapytanie kontaktowe</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 8px; font-weight: bold;">Email:</td>
                <td style="padding: 12px 8px;">${email}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 8px; font-weight: bold;">Telefon:</td>
                <td style="padding: 12px 8px;">${phone}</td>
              </tr>
              <tr style="border-bottom: 1px solid #ddd;">
                <td style="padding: 12px 8px; font-weight: bold;">Temat rozmowy:</td>
                <td style="padding: 12px 8px;">${topic}</td>
              </tr>
              <tr>
                <td style="padding: 12px 8px; font-weight: bold;">Data:</td>
                <td style="padding: 12px 8px;">${timestamp}</td>
              </tr>
            </table>
          </div>
        `,
      });

      console.log('✅ Email to office sent successfully. Message ID:', infoMail.messageId)

      // Send autoresponder to client
      console.log('Sending autoresponder to client...')
      const clientMail = await transporter.sendMail({
        from: `"${FROM_NAME}" <${smtpUser}>`,
        to: email,
        subject: 'Dziękujemy za kontakt - Monte Biuro Rachunkowe',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #00a86b;">Dziękujemy za kontakt!</h2>
            <p>Otrzymaliśmy Twoje zapytanie dotyczące: <strong>${topic}</strong></p>
            <p>Odpowiemy najszybciej jak to możliwe, zazwyczaj w ciągu 24 godzin roboczych.</p>
            <p style="margin-top: 30px;">Pozdrawiamy,<br>
            <strong>Zespół Monte Biuro Rachunkowe</strong></p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #666;">
              Monte Biuro Rachunkowe<br>
              Email: kontakt@montebiuro.pl<br>
              Telefon: +48 661 444 882
            </p>
          </div>
        `,
      });

      console.log('✅ Autoresponder sent successfully. Message ID:', clientMail.messageId)
      console.log(`📧 Emails sent successfully to ${OFFICE_EMAIL} and ${email}`);

      return NextResponse.json({
        ok: true,
        message: 'Dziękujemy. Formularz został wysłany poprawnie.',
      });
    } catch (emailError: any) {
      console.error('❌ [Contact Form] Email sending error:', emailError.message);
      console.error('Error details:', {
        message: emailError.message,
        code: emailError.code,
        command: emailError.command,
        response: emailError.response,
        responseCode: emailError.responseCode
      })
      return NextResponse.json(
        { ok: false, message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('❌ [Contact Form] General Error:', error.message);
    console.error('Stack trace:', error.stack)
    return NextResponse.json(
      { ok: false, message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.' },
      { status: 500 }
    );
  }
}
