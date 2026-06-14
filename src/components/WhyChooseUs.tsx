import type { ComponentType, SVGProps } from 'react';
import { IconCheck, IconClock, IconUsers, IconEye, IconTarget } from './Icons';

type Item = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

const items: Item[] = [
  { icon: IconCheck, title: 'Accurate Reports', desc: 'Defensible valuations backed by rigorous analysis.' },
  { icon: IconClock, title: 'Fast Turnaround', desc: 'Reliable TAT without compromising on quality.' },
  { icon: IconUsers, title: 'Qualified Team', desc: 'Chartered engineers and finance experts.' },
  { icon: IconEye, title: 'Transparent Process', desc: 'Clear methodology and complete documentation.' },
  { icon: IconTarget, title: 'Tailored Solutions', desc: 'Customised to each client and asset class.' },
];

export default function WhyChooseUs() {
  return (
    <section id="why" className="section section--alt">
      <div className="container">
        <header className="section__header" data-reveal>
          <span className="section__eyebrow">Why Choose Us</span>
          <h2 className="section__title">Built around what clients value most.</h2>
          <p className="section__subtitle">
            Five reasons banks, NBFCs, and corporates return to VKPrecision for
            their valuation needs.
          </p>
        </header>

        <div className="why__grid">
          {items.map((it, i) => {
            const Icon = it.icon;
            return (
              <div
                key={it.title}
                className="why-card"
                data-reveal
                data-reveal-delay={(i % 4) + 1}
              >
                <div className="why-card__icon">
                  <Icon width={30} height={30} />
                </div>
                <h4>{it.title}</h4>
                <p>{it.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
