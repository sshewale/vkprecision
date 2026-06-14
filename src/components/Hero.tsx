import { IconArrowRight, IconCheck, IconAward } from './Icons';

const cardItems: string[] = [
  'RBI & IVS compliant reports',
  'Bank-empaneled valuation experts',
  'Detailed site inspection & analysis',
  'Fast turnaround with quality control',
];

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero__grid">
        <div data-reveal>
          <span className="hero__chip">Accuracy. Integrity. Excellence.</span>
          <h1 className="hero__title">
            Accurate, Transparent &amp; <em>Reliable Valuation</em> Services
          </h1>
          <p className="hero__subtitle">
            Delivering professional valuation solutions backed by technical
            expertise, market insights, and regulatory compliance — for banks,
            financial institutions, corporates, and individuals.
          </p>

          <div className="hero__actions">
            <a href="#contact" className="btn btn--primary">
              Get in Touch <IconArrowRight width={18} height={18} />
            </a>
            <a href="#services" className="btn btn--ghost">
              Explore Services
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>8+</strong>
              <span>Years of expertise</span>
            </div>
            <div className="hero__stat">
              <strong>10+</strong>
              <span>Cities covered</span>
            </div>
            <div className="hero__stat">
              <strong>100%</strong>
              <span>Quality assurance</span>
            </div>
          </div>
        </div>

        <div className="hero__card-wrap" data-reveal data-reveal-delay="2">
          <div className="hero__card">
            <div className="hero__card-header">
              <h4>Why VKPrecision</h4>
              <span className="hero__card-badge">Trusted Firm</span>
            </div>
            <ul className="hero__card-list">
              {cardItems.map((item) => (
                <li key={item}>
                  <IconCheck width={20} height={20} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero__floating">
            <IconAward width={28} height={28} />
            <div>
              <strong>Chartered</strong>
              <span>Engineer &amp; IOV Approved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
