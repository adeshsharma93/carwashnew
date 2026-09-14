import { useEffect, useRef, useState } from 'react';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services-detail')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with gradient fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1920&q=80')`,
          backgroundColor: '#0a0e1a',
        }}
      />
      <div className="absolute inset-0 hero-overlay" />
      {/* Additional gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e1a]/30 via-transparent to-[#0a0e1a]" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-sm font-medium text-gray-300">
            Professional • Affordable • Reliable
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-[Outfit] leading-tight mb-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Give Your Ride the{' '}
          <span className="gradient-text">Shine</span>{' '}
          It Deserves
        </h1>

        {/* Subtitle */}
        <p
          className={`text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Professional car, bike, and auto washing services at affordable prices.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={scrollToBooking}
            className="btn-primary px-8 py-4 rounded-full text-lg font-semibold text-white animate-pulse-glow"
          >
            <i className="fas fa-calendar-check mr-2" />
            Book a Wash
          </button>
          <button
            onClick={scrollToServices}
            className="px-8 py-4 rounded-full text-lg font-semibold text-white border border-white/20 hover:border-blue-400/50 hover:bg-white/5 transition-all duration-300"
          >
            <i className="fas fa-sparkles mr-2" />
            View Services
          </button>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-3 gap-4 max-w-lg mx-auto transition-all duration-700 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold gradient-text font-[Outfit]">5K+</div>
            <div className="text-xs sm:text-sm text-gray-400">Happy Customers</div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="text-2xl sm:text-3xl font-bold gradient-text font-[Outfit]">4.9</div>
            <div className="text-xs sm:text-sm text-gray-400">Star Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold gradient-text font-[Outfit]">3+</div>
            <div className="text-xs sm:text-sm text-gray-400">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 rounded-full bg-blue-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
