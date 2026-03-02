'use client';
import Image from 'next/image';
import { useLang } from './LanguageProvider';

export default function AboutUs() {
  const { dict } = useLang();
  const a = dict.about;

  return (
    <section className="why-section" id="o-nas" aria-label="O nas – certyfikowane biuro rachunkowe">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">{a.tag}</div>
          <h2 className="section-title">{a.title}</h2>
          <p className="section-subtitle">{a.subtitle}</p>
        </div>

        <div className="about-content-wrapper">
          <div className="about-intro">
            <p className="about-lead"><strong>{a.companyLead}</strong></p>
            <p>{a.certText}</p>
            <p>{a.experienceText}</p>
          </div>
          <div className="about-details">
            <p>{a.specialisationText}</p>
            <p>{a.advisorText}</p>
            <p>{a.continuedText}</p>
            <p className="about-highlight">{a.highlightText}</p>
          </div>
        </div>

        <div className="about-team-section">
          <div className="section-header">
            <div className="section-tag">{a.teamTag}</div>
            <h3 className="section-title">{a.teamTitle}</h3>
            <p className="section-subtitle">{a.teamSubtitle}</p>
          </div>
          <div className="team-grid">
            <article className="team-card fade-in-scroll">
              <div className="team-card-inner">
                <div className="team-photo-wrapper">
                  <Image src="/images/team/Monika.jpg" alt={`${a.monika.name} - ${a.monika.role} MonTe`} className="team-photo-img" width={600} height={800} style={{ height: 'auto', display: 'block' }} />
                </div>
                <div className="team-content">
                  <h3 className="team-name">{a.monika.name}</h3>
                  <p className="team-role">{a.monika.role}</p>
                  <p className="team-bio">{a.monika.bio1}</p>
                  <p className="team-bio" style={{ marginTop: '1rem' }}>{a.monika.bio2}</p>
                  <p className="team-bio" style={{ marginTop: '1rem' }}>{a.monika.bio3}</p>
                  <p className="team-bio" style={{ marginTop: '1rem' }}>{a.monika.bio4}</p>
                </div>
              </div>
            </article>
            <article className="team-card fade-in-scroll">
              <div className="team-card-inner">
                <div className="team-photo-wrapper">
                  <Image src="/images/team/Teresa.jpg" alt={`${a.teresa.name} - ${a.teresa.role} MonTe`} className="team-photo-img" width={600} height={800} style={{ height: 'auto', display: 'block' }} />
                </div>
                <div className="team-content">
                  <h3 className="team-name">{a.teresa.name}</h3>
                  <p className="team-role">{a.teresa.role}</p>
                  <p className="team-bio">{a.teresa.bio1}</p>
                  <p className="team-bio" style={{ marginTop: '1rem' }}>{a.teresa.bio2}</p>
                  <p className="team-bio" style={{ marginTop: '1rem' }}>{a.teresa.bio3}</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="trust-badges-section fade-in-scroll">
          <h3 className="trust-badges-title">{a.trustTitle}</h3>
          <div className="trust-badges-grid">
            {[a.trustBadge1, a.trustBadge2, a.trustBadge3, a.trustBadge4].map((badge, i) => (
              <div className="trust-badge" key={i}>
                <div className="trust-badge-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                  </svg>
                </div>
                <p className="trust-badge-text">{badge}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-header" style={{ marginTop: '5rem', marginBottom: '3rem' }}>
          <h3 className="section-title">{a.whyTitle}</h3>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {a.whyFeatures.map((feature, index) => (
            <div key={index} className="feature-item fade-in-scroll">
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="md:hidden flex gap-6 overflow-x-auto scroll-smooth pb-6 snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {a.whyFeatures.map((feature, index) => (
            <div key={index} className="feature-item fade-in-scroll snap-start" style={{ flexShrink: 0, width: '280px' }}>
              <div className="feature-icon">✓</div>
              <div className="feature-text">
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
