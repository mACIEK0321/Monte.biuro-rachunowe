'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageProvider';

export default function Contact() {
  const { lang, dict } = useLang();
  const c = dict.contact;
  const isEN = lang === 'en';
  const privacyHref = isEN ? '/en/privacy-policy' : '/polityka-prywatnosci';

  const [formMessage, setFormMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

      const data = await response.json();

      if (response.ok && data.ok) {
        setIsSuccess(true);
        setFormMessage(c.successTitle);
        form.reset();
      } else {
        setFormMessage(data.message || c.errorGeneral);
      }
    } catch {
      setFormMessage(c.errorConnection);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="kontakt">
      <div className="container">
        <div className="contact-container">
          <div className="contact-info">
            <h2>{c.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: c.subtitle }} />
            <ul className="contact-details">
              <li>
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                  </svg>
                </div>
                <div>
                  <strong>{c.phone}</strong>
                  <br />
                  <span style={{ whiteSpace: 'nowrap' }}>Monika Kołakowska: <a href="tel:+48661444882">+48 661 444 882</a></span>
                  <br />
                  <span style={{ whiteSpace: 'nowrap' }}>Teresa Kućmierczyk: <a href="tel:+48577161434">+48 577 161 434</a></span>
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <strong>{c.email}</strong>
                  <br />
                  kontakt@montebiuro.pl
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <div>
                  <strong>{c.address}</strong>
                  <br />
                  ul. Myśliwska 8, 30-718 Kraków
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>
                <div>
                  <strong>{c.hours}</strong>
                  <br />
                  {c.hoursValue}
                </div>
              </li>
              <li>
                <div className="contact-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <strong>Instagram</strong>
                  <br />
                  <a href="https://www.instagram.com/montebiuro" target="_blank" rel="noopener noreferrer">@montebiuro</a>
                </div>
              </li>
            </ul>
          </div>

          <div className="contact-form-wrap">
            <h3>{c.formTitle}</h3>
            <p style={{ marginBottom: '1.5rem', color: 'var(--gray)' }}>
              {c.formSubtitle}
            </p>

            {isSuccess ? (
              <div className="contact-success" style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                borderRadius: '12px',
                border: '1px solid #bbf7d0',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h4 style={{ color: '#166534', fontSize: '1.5rem', marginBottom: '0.75rem' }}>
                  {c.successTitle}
                </h4>
                <p style={{ color: '#15803d', fontSize: '1rem', lineHeight: 1.6 }}>
                  {c.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => { setIsSuccess(false); setFormMessage(''); }}
                  style={{
                    marginTop: '1.5rem',
                    padding: '0.75rem 2rem',
                    background: 'var(--primary, #00a86b)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.95rem',
                  }}
                >
                  {c.sendAnother}
                </button>
              </div>
            ) : (
            <form id="contactForm" className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>E-mail *</label>
                <input type="email" name="email" required placeholder="jan@firma.pl" />
              </div>
              <div className="form-group">
                <label>{c.phoneLabel}</label>
                <input type="tel" name="phone" required placeholder="+48 123 456 789" />
              </div>
              <div className="form-group">
                <label>{c.topicLabel}</label>
                <input
                  type="text"
                  name="topic"
                  required
                  minLength={3}
                  maxLength={120}
                  placeholder={c.topicPlaceholder}
                />
              </div>
              <div className="form-group">
                <label>{c.messageLabel}</label>
                <textarea
                  name="message"
                  rows={5}
                  maxLength={2000}
                  style={{ resize: 'vertical' }}
                />
              </div>
              <div className="form-checkbox">
                <input type="checkbox" name="regulamin" id="contactRegulamin" required />
                <label htmlFor="contactRegulamin">
                  {isEN ? (
                    <>
                      I accept the{' '}
                      <Link href={privacyHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                        Privacy Policy
                      </Link>.
                    </>
                  ) : (
                    <>
                      Akceptuję{' '}
                      <Link href={privacyHref} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                        politykę prywatności
                      </Link>.
                    </>
                  )}
                </label>
              </div>
              <button type="submit" className="form-submit" disabled={isSubmitting}>
                {isSubmitting ? c.sending : c.sendButton}
              </button>
              {formMessage && (
                <p id="contactFormMessage" className="contact-form-message" aria-live="polite">
                  {formMessage}
                </p>
              )}
            </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
