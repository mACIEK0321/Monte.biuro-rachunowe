'use client';

import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setFormMessage('Dziękujemy! Wiadomość została wysłana. Odezwiemy się wkrótce.');
        form.reset();
      } else {
        setFormMessage('Wystąpił błąd. Spróbuj ponownie lub napisz na nasz e-mail.');
      }
    } catch {
      setFormMessage('Wystąpił błąd połączenia. Spróbuj ponownie później.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="kontakt">
      <div className="container">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Kontakt – biuro rachunkowe Monte</h2>
            <p>
              Masz pytania? Chcesz poznać ofertę? Skorzystaj z bezpłatnej
              konsultacji i dowiedz się, jak możemy pomóc Twojemu biznesowi.
            </p>
            <ul className="contact-details">
              <li>
                <div className="contact-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </div>
                <div>
                  <strong>Telefon</strong>
                  <br />
                  +48 123 456 789
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </div>
                <div>
                  <strong>Email</strong>
                  <br />
                  kontakt@monte.biuro.pl
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <strong>Adres</strong>
                  <br />
                  ul. Przykładowa 15, 00-001 Warszawa
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <div>
                  <strong>Godziny pracy</strong>
                  <br />
                  Pon–Pt: 8:00–18:00
                </div>
              </li>
            </ul>
          </div>

          <div className="contact-form-wrap">
            <h3>Bezpłatna konsultacja – umów się na rozmowę</h3>
            <p style={{ marginBottom: '1.5rem', color: 'var(--gray)' }}>
              Skontaktujemy się do 24h (pn–pt, 8–16)
            </p>
            <form
              id="contactForm"
              className="contact-form"
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label>E-mail *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="jan@firma.pl"
                />
              </div>
              <div className="form-group">
                <label>Telefon *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+48 123 456 789"
                />
              </div>
              <div className="form-group">
                <label>Temat rozmowy *</label>
                <input
                  type="text"
                  name="topic"
                  required
                  minLength={3}
                  maxLength={120}
                  placeholder="np. wycena dla JDG"
                />
              </div>
              <div className="form-checkbox">
                <input
                  type="checkbox"
                  name="regulamin"
                  id="contactRegulamin"
                  required
                />
                <label htmlFor="contactRegulamin">
                  Akceptuję warunki regulaminu i polityki prywatności.
                </label>
              </div>
              <button
                type="submit"
                className="form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wysyłanie...' : 'Wyślij!'}
              </button>
              {formMessage && (
                <p
                  id="contactFormMessage"
                  className="contact-form-message"
                  aria-live="polite"
                >
                  {formMessage}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
