import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Lazy-load heavy 3D canvas
const HeroCanvas = lazy(() => import('./components/3d/HeroCanvas'));

export default function App() {
  return (
    <Router>
      {/* 3D background canvas (fixed, z-0) */}
      <Suspense fallback={null}>
        <HeroCanvas />
      </Suspense>

      <Routes>
        {/* Main Website Route */}
        <Route path="/" element={
          <>
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
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={
          localStorage.getItem('isAdmin') ? <AdminDashboard /> : <Navigate to="/admin" />
        } />
      </Routes>
    </Router>
  );
}