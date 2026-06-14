export default function About() {
  return (
    <section id="about" className="section">
      <div className="container about__grid">
        <div className="about__visual" data-reveal>
          <div className="about__visual-inner">
            <h3>Built on Precision</h3>
            <p>
              A modern valuation firm focused on defensible reports, technical
              rigour, and long-term client trust.
            </p>
            <div className="about__pillars">
              <div className="about__pillar">
                <strong>Accuracy</strong>
                <span>Defensible analysis</span>
              </div>
              <div className="about__pillar">
                <strong>Integrity</strong>
                <span>Unbiased opinion</span>
              </div>
              <div className="about__pillar">
                <strong>Speed</strong>
                <span>On-time delivery</span>
              </div>
              <div className="about__pillar">
                <strong>Compliance</strong>
                <span>RBI &amp; IVS aligned</span>
              </div>
            </div>
          </div>
        </div>

        <div className="about__content" data-reveal data-reveal-delay="1">
          <span className="section__eyebrow">About Us</span>
          <h2 className="section__title">
            A professionally managed valuation &amp; advisory firm.
          </h2>
          <p>
            <strong>VKPrecision Valuation &amp; Advisory</strong> delivers
            accurate, transparent, and reliable valuation services across
            diverse asset classes. Our approach blends technical expertise,
            market intelligence, and regulatory compliance to produce
            well-supported, defensible reports.
          </p>
          <p>
            We serve banks, financial institutions, corporates, and individual
            clients — handling every assignment with precision, backed by
            thorough analysis and real-time market insights.
          </p>

          <div className="about__vm">
            <div className="about__vm-card">
              <h4>Our Vision</h4>
              <p>
                To be a trusted and leading valuation firm recognized for
                accuracy, transparency, and excellence across India.
              </p>
            </div>
            <div className="about__vm-card">
              <h4>Our Mission</h4>
              <ul>
                <li>Independent &amp; unbiased valuation</li>
                <li>High-quality, timely reports</li>
                <li>Long-term, trusted relationships</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
