import { useState } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { IconMapPin, IconPhone, IconMail, IconGlobe, IconArrowRight } from './Icons';

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Static site — wire to a backend / email service as needed.
    setSubmitted(true);
    setForm(initialState);
    window.setTimeout(() => setSubmitted(false), 4500);
  };

  return (
    <section id="contact" className="section">
      <div className="container contact__grid">
        <div data-reveal>
          <span className="section__eyebrow">Contact Us</span>
          <h2 className="section__title">Let's start a conversation.</h2>
          <p>
            Reach out for valuation enquiries, empanelment, or any advisory
            requirement. Our team will respond within one business day.
          </p>

          <div className="contact__info">
            <a
              href="https://maps.google.com/?q=Akurti+Sankul+Tilak+Road+Sadashiv+Peth+Pune"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__item"
            >
              <span className="contact__item-icon"><IconMapPin width={22} height={22} /></span>
              <div>
                <strong>Regional Office</strong>
                <span>
                  Office No. 104–105, LG Floor, Akurti Sankul,<br />
                  Opp. Janata Sahakari Bank, Tilak Road,<br />
                  Sadashiv Peth, Pune — 411030
                </span>
              </div>
            </a>

            <a href="tel:+919922334736" className="contact__item">
              <span className="contact__item-icon"><IconPhone width={22} height={22} /></span>
              <div>
                <strong>Phone</strong>
                <span>+91 99223 34736</span>
              </div>
            </a>

            <a href="mailto:vikas@vkptech.in" className="contact__item">
              <span className="contact__item-icon"><IconMail width={22} height={22} /></span>
              <div>
                <strong>Email</strong>
                <span>vikas@vkptech.in</span>
              </div>
            </a>

            <a
              href="https://www.vkptech.in"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__item"
            >
              <span className="contact__item-icon"><IconGlobe width={22} height={22} /></span>
              <div>
                <strong>Website</strong>
                <span>www.vkptech.in</span>
              </div>
            </a>
          </div>
        </div>

        <form className="contact__form" data-reveal data-reveal-delay="2" onSubmit={handleSubmit}>
          <h3>Send us an enquiry</h3>
          <p>Tell us briefly about your valuation requirement.</p>

          {submitted && (
            <div className="contact__success" role="status">
              Thank you — your enquiry has been received. We'll be in touch shortly.
            </div>
          )}

          <div className="contact__row">
            <div className="contact__field">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
              />
            </div>
            <div className="contact__field">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 ..."
              />
            </div>
          </div>

          <div className="contact__field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />
          </div>

          <div className="contact__field">
            <label htmlFor="service">Service Required</label>
            <select id="service" name="service" value={form.service} onChange={handleChange}>
              <option value="">Select a service…</option>
              <option>Residential Valuation</option>
              <option>Commercial Valuation</option>
              <option>Industrial Valuation</option>
              <option>Land Valuation</option>
              <option>Purpose-Based Valuation</option>
              <option>Technical / Advisory</option>
            </select>
          </div>

          <div className="contact__field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              required
              value={form.message}
              onChange={handleChange}
              placeholder="Brief details about the property / purpose"
            />
          </div>

          <button type="submit" className="btn btn--primary">
            Submit Enquiry <IconArrowRight width={18} height={18} />
          </button>
        </form>
      </div>
    </section>
  );
}
