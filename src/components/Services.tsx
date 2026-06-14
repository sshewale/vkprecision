import type { ComponentType, SVGProps } from 'react';
import {
  IconHome,
  IconBuilding,
  IconFactory,
  IconLand,
  IconBriefcase,
  IconClipboard,
  IconShield,
} from './Icons';

type Service = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  items: string[];
};

const services: Service[] = [
  {
    icon: IconHome,
    title: 'Residential Valuation',
    items: ['Flats, Apartments, Villas, Houses', 'Independent Houses & Bungalows', 'Society redevelopment cases'],
  },
  {
    icon: IconBuilding,
    title: 'Commercial Valuation',
    items: ['Offices & IT Parks', 'Retail Shops & Showrooms', 'Shopping Malls & Complexes'],
  },
  {
    icon: IconFactory,
    title: 'Industrial Valuation',
    items: ['Factories & Manufacturing Units', 'Warehouses & Logistics Parks', 'Industrial Land & Sheds'],
  },
  {
    icon: IconLand,
    title: 'Land Valuation',
    items: ['Open / NA / Agricultural Plots', 'Layout & Development Land', 'Institutional & Special Purpose Land'],
  },
  {
    icon: IconBriefcase,
    title: 'Purpose-Based Valuation',
    items: [
      'Bank loans & Project finance',
      'Visa & investment analysis',
      'Buying / selling decisions',
      'Insurance & capital gains',
    ],
  },
  {
    icon: IconClipboard,
    title: 'Technical Services',
    items: ['Site inspection & measurement', 'Document verification', 'Market research & comparables', 'Highest & best-use analysis'],
  },
  {
    icon: IconShield,
    title: 'Compliance Standards',
    items: ['RBI aligned reporting', 'Income Tax compliant valuations', 'International Valuation Standards (IVS)'],
  },
];

export default function Services() {
  return (
    <section id="services" className="section section--alt">
      <div className="container">
        <header className="section__header" data-reveal>
          <span className="section__eyebrow">Our Services</span>
          <h2 className="section__title">Comprehensive valuation solutions, end to end.</h2>
          <p className="section__subtitle">
            From property-class specialisations to compliance-ready reporting — we
            cover every requirement banks, NBFCs, corporates, and individuals
            need.
          </p>
        </header>

        <div className="services__grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="service-card"
                data-reveal
                data-reveal-delay={(i % 4) + 1}
              >
                <div className="service-card__icon">
                  <Icon width={26} height={26} />
                </div>
                <h3 className="service-card__title">{service.title}</h3>
                <ul className="service-card__list">
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
