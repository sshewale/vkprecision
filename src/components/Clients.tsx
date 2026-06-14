import type { ComponentType, SVGProps } from 'react';
import { IconBank, IconBriefcase, IconBuilding, IconUser } from './Icons';

type Client = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

const clients: Client[] = [
  { icon: IconBank, title: 'Banks', desc: 'Empanelled mortgage valuations & technical due diligence.' },
  { icon: IconBriefcase, title: 'NBFCs', desc: 'Lending support across asset classes and geographies.' },
  { icon: IconBuilding, title: 'Corporates', desc: 'Financial reporting, M&A, and insurance valuations.' },
  { icon: IconUser, title: 'Individuals', desc: 'Buying, selling, taxation, and investment decisions.' },
];

export default function Clients() {
  return (
    <section id="clients" className="section">
      <div className="container">
        <header className="section__header" data-reveal>
          <span className="section__eyebrow">Our Clients</span>
          <h2 className="section__title">Trusted across the financial ecosystem.</h2>
          <p className="section__subtitle">
            We partner with institutions and individuals who depend on rigorous,
            defensible valuation reports.
          </p>
        </header>

        <div className="clients__row">
          {clients.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.title}
                className="client-card"
                data-reveal
                data-reveal-delay={(i % 4) + 1}
              >
                <div className="client-card__icon">
                  <Icon width={26} height={26} />
                </div>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
