import { IconMapPin } from './Icons';

const locations: string[] = [
  'Pune',
  'Satara',
  'Chh. Sambhaji Nagar',
  'Kolhapur',
  'Nashik',
  'Solapur',
  'Latur',
  'Dharashiv',
  'Parbhani',
  'Ahilyanagar',
];

export default function Presence() {
  return (
    <section id="presence" className="section presence">
      <div className="container presence__inner">
        <header className="section__header" data-reveal>
          <span className="section__eyebrow">Our Presence</span>
          <h2 className="section__title">Strong regional footprint across Maharashtra.</h2>
          <p className="section__subtitle">
            Local market expertise and efficient on-ground service delivery
            across ten key cities.
          </p>
        </header>

        <div className="presence__grid">
          {locations.map((loc, i) => (
            <div
              key={loc}
              className="presence-card"
              data-reveal
              data-reveal-delay={(i % 4) + 1}
            >
              <IconMapPin width={18} height={18} />
              <span>{loc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
