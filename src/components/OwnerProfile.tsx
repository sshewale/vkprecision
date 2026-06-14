import { IconCheck } from './Icons';

const credentials: string[] = ['BE — Civil', 'MBA — Finance', 'Chartered Engineer', 'AMIE', 'IOV'];

const highlights: { title: string; desc: string }[] = [
  { title: '2500+ Valuations / month', desc: 'Experience handling 2500+ valuations every month.' },
  { title: '8+ Years Experience', desc: 'Real estate valuation domain expertise.' },
  { title: 'Multi-State Coverage', desc: 'Maharashtra & Goa operations.' },
  { title: 'Technical + Financial', desc: 'Civil Engineering with Finance background.' },
  { title: 'Banking Relationships', desc: 'Strong coordination with banks & NBFCs.' },
];

export default function OwnerProfile() {
  return (
    <section id="owner" className="section section--alt">
      <div className="container owner__grid">
        <aside className="owner__card" data-reveal>
          <div className="owner__avatar owner__avatar--photo" aria-hidden="true">
            <img src="/profile.jpeg" alt="Vikas Ratan Kale" />
          </div>
          <h3>Vikas Ratan Kale</h3>
          <p>Founder &amp; Principal Valuer</p>
          <p className="owner__role">Registered Valuer &amp; Consultant</p>
          <div className="owner__badges">
            {credentials.map((c) => (
              <span key={c} className="owner__badge">{c}</span>
            ))}
          </div>
        </aside>

        <div className="owner__details" data-reveal data-reveal-delay="1">
          <span className="section__eyebrow">Owner Profile</span>
          <h2 className="section__title">Leadership rooted in technical &amp; financial expertise.</h2>
          <p>
            Vikas Ratan Kale is a seasoned valuation and operations professional
            with <strong>8+ years</strong> of experience in real estate
            valuation. He has managed valuation assignments and business
            operations across <strong>Maharashtra &amp; Goa</strong>, delivering
            accurate, compliant, and high-quality valuation solutions —
            with experience handling <strong>2500+ valuations every month</strong>.
          </p>
          <p>
            With a strong academic background in <strong>Civil Engineering</strong>{' '}
            and <strong>Financial Management</strong>, he brings a unique blend
            of technical knowledge and financial insight — covering land &amp;
            building valuation, mortgage assessments, technical due diligence,
            and risk analysis across residential, commercial, industrial,
            affordable housing, and special-category properties.
          </p>

          <div className="owner__highlights">
            {highlights.map((h) => (
              <div key={h.title} className="owner__highlight">
                <IconCheck width={20} height={20} />
                <div>
                  <strong>{h.title}</strong>
                  <span>{h.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
