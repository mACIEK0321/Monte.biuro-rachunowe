'use client';

import { useState } from 'react';
import { useLang } from './LanguageProvider';

export default function FAQ() {
  const { dict } = useLang();
  const f = dict.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    const isExpanding = openIndex !== index;
    setOpenIndex(isExpanding ? index : null);

    if (isExpanding) {
      setTimeout(() => {
        document.getElementById(`faq-item-${index}`)?.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }, 80);
    }
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{f.tag}</div>
          <h2 className="section-title">{f.title}</h2>
          <p className="section-subtitle">{f.subtitle}</p>
        </div>
        <div className="faq-list">
          {f.items.map((item, index) => (
            <div
              key={index}
              id={`faq-item-${index}`}
              className={`faq-item fade-in-scroll ${openIndex === index ? 'is-open' : ''}`}
              data-faq=""
            >
              <button
                type="button"
                aria-expanded={openIndex === index}
                onClick={() => toggle(index)}
              >
                {item.question}
              </button>

              {/* Grid-template-rows: 0fr→1fr — animacja bez layout shift */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateRows: openIndex === index ? '1fr' : '0fr',
                  transition: 'grid-template-rows 0.35s ease',
                  willChange: openIndex === index ? 'grid-template-rows' : 'auto',
                }}
              >
                <div style={{ minHeight: 0, overflow: 'hidden' }}>
                  <div className="faq-answer">
                    <div className="faq-answer-inner">{item.answer}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
