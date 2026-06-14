import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Expertise from './components/Expertise';
import WhyChooseUs from './components/WhyChooseUs';
import Clients from './components/Clients';
import Presence from './components/Presence';
import OwnerProfile from './components/OwnerProfile';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useScrollReveal from './hooks/useScrollReveal';

export default function App() {
  useScrollReveal();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Expertise />
        <WhyChooseUs />
        <Clients />
        <Presence />
        <OwnerProfile />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
