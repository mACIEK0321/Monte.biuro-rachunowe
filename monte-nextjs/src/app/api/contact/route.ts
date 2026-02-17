import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const OFFICE_EMAIL = process.env.OFFICE_EMAIL || 'biuro@montebiuro.pl';
const FROM_EMAIL = process.env.FROM_EMAIL || 'biuro@montebiuro.pl';
const FROM_NAME = process.env.FROM_NAME || 'Monte Biuro';
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
      `Imię/Email: ${email}`,
      `Telefon: ${phone}`,
      `Temat rozmowy: ${topic}`,
      `Data: ${timestamp}`,
    ].join('\n');

    // Check if Resend is configured
    if (!resend) {
      // Log-only mode when Resend API key is not configured
      console.log(`[Contact Form] MAIL_LOG_ONLY mode - RESEND_API_KEY not set`);
      console.log(`To: ${OFFICE_EMAIL}`);
      console.log(`From: ${email}`);
      console.log(`Subject: Nowe zapytanie ze strony`);
      console.log(officeBody);

      return NextResponse.json({
        ok: true,
        message: 'Dziękujemy. Formularz został wysłany poprawnie.',
      });
    }

    // Send email using Resend
    try {
      await resend.emails.send({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: OFFICE_EMAIL,
        replyTo: email,
        subject: `Nowe zapytanie ze strony - ${topic}`,
        text: officeBody,
        html: `
          <h2>Nowe zapytanie kontaktowe</h2>
          <p><strong>Imię/Email:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Temat rozmowy:</strong> ${topic}</p>
          <p><strong>Data:</strong> ${timestamp}</p>
        `,
      });

      console.log(`[Contact Form] Email sent successfully to ${OFFICE_EMAIL}`);

      return NextResponse.json({
        ok: true,
        message: 'Dziękujemy. Formularz został wysłany poprawnie.',
      });
    } catch (emailError) {
      console.error('[Contact Form] Failed to send email:', emailError);
      
      // Return success to user but log the error for investigation
      // This prevents exposing email configuration issues to the user
      return NextResponse.json({
        ok: true,
        message: 'Dziękujemy. Formularz został wysłany poprawnie.',
      });
    }
  } catch (error) {
    console.error('[Contact Form] Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Nie udało się wysłać wiadomości. Spróbuj ponownie za chwilę.' },
      { status: 500 }
    );
  }
}
