import type { ComponentType, SVGProps } from 'react';
import { IconChart, IconLayers, IconShield, IconAward } from './Icons';

type Point = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

const points: Point[] = [
  {
    icon: IconChart,
    title: 'Strong Market Knowledge',
    desc: 'Real-time pulse on micro-market trends, comparables, and regulatory shifts across Maharashtra & Goa.',
  },
  {
    icon: IconLayers,
    title: 'Complex Valuations Handled',
    desc: 'Experience with high-volume mandates, special-category properties, and large-portfolio assignments.',
  },
  {
    icon: IconShield,
    title: 'Regulatory Compliance',
    desc: 'Reports aligned with RBI, Income Tax, and International Valuation Standards (IVS).',
  },
  {
    icon: IconAward,
    title: 'High-Quality Reporting',
    desc: 'Defensible, well-documented reports with rigorous internal quality control before submission.',
  },
];

export default function Expertise() {
  return (
    <section id="expertise" className="section">
      <div className="container expertise__grid">
        <div data-reveal>
          <span className="section__eyebrow">Our Expertise</span>
          <h2 className="section__title">
            Technical depth meets financial insight.
          </h2>
          <p>
            We combine field-level technical knowledge with deep financial
            understanding to deliver valuations that hold up to scrutiny — from
            bank credit teams to regulators and corporate boards.
          </p>
          <p>
            Every assignment passes through structured workflows: site
            inspection, document scrutiny, market analysis, and a 100% quality
            check before report submission.
          </p>
        </div>

        <div className="expertise__points">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="expertise__point"
                data-reveal
                data-reveal-delay={i + 1}
              >
                <div className="expertise__point-icon">
                  <Icon width={22} height={22} />
                </div>
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
