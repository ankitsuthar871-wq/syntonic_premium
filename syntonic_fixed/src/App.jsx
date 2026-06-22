import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/ui/CustomCursor';

// Lazy-load heavy 3D canvas to keep initial bundle fast
const HeroCanvas = lazy(() => import('./components/3d/HeroCanvas'));

export default function App() {
  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* 3D background canvas (fixed, z-0) */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      {/* All page content (z-10+) */}
      <Navbar />

      <main>
        <Hero />
        <Services />
        <About />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
