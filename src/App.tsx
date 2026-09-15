import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import ServicesPage from './components/ServicesPage';
import WhyChooseUs from './components/WhyChooseUs';
import HowItWorks from './components/HowItWorks';
import CTA from './components/CTA';
import BookingForm from './components/BookingForm';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Services />
      <ServicesPage />
      <WhyChooseUs />
      <HowItWorks />
      <CTA />
      <BookingForm />
      <Testimonials />
      <Footer onAdminClick={() => setShowAdmin(true)} />
      
      {/* Admin Panel */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
      
      {/* Floating Admin Button */}
      <button
        onClick={() => setShowAdmin(true)}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform z-40"
        title="Admin Panel"
      >
        <i className="fas fa-user-shield"></i>
      </button>
    </div>
  );
}
