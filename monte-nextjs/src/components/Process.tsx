'use client';

import { useLang } from './LanguageProvider';

export default function Process() {
  const { dict } = useLang();
  const p = dict.process;

  return (
    <section className="process-section" id="proces">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{p.tag}</div>
          <h2 className="section-title">{p.title}</h2>
          <p className="section-subtitle">{p.subtitle}</p>
        </div>
        <div className="carousel-wrapper">
          <div className="process-steps">
            {p.steps.map((step, i) => (
              <div key={i} className="process-step fade-in-scroll">
                <div className="process-number">{i + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
