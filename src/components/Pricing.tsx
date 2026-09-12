import { useEffect, useRef, useState } from 'react';

interface PricingCardProps {
  size: string;
  price: number;
  icon: string;
  features: string[];
  popular?: boolean;
  delay?: number;
  isVisible: boolean;
}

function PricingCard({ size, price, icon, features, popular, delay = 0, isVisible }: PricingCardProps) {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25">
            Most Popular
          </span>
        </div>
      )}

      <div
        className={`relative rounded-2xl p-6 sm:p-8 h-full flex flex-col transition-all duration-500 ${
          popular
            ? 'glass border-blue-500/30 shadow-lg shadow-blue-500/10 scale-[1.02] sm:scale-105'
            : 'glass-light hover:bg-white/10'
        }`}
      >
        {/* Glow effect for popular */}
        {popular && (
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-blue-500/20 via-transparent to-cyan-400/20 pointer-events-none" />
        )}

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon */}
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
              popular
                ? 'bg-gradient-to-br from-blue-500 to-cyan-400'
                : 'bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-blue-500/20'
            }`}
          >
            <i className={`${icon} text-xl ${popular ? 'text-white' : 'text-blue-400'}`}></i>
          </div>

          {/* Size label */}
          <h3 className="text-lg font-semibold text-gray-300 mb-1">{size}</h3>

          {/* Price */}
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-sm text-gray-400">₹</span>
            <span className={`text-4xl sm:text-5xl font-bold font-[Outfit] ${popular ? 'gradient-text' : 'text-white'}`}>
              {price}
            </span>
            <span className="text-sm text-gray-400 ml-1">/ wash</span>
          </div>

          {/* Divider */}
          <div className={`h-px w-full mb-6 ${popular ? 'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent' : 'bg-white/5'}`} />

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                <i className={`fas fa-check-circle mt-0.5 text-xs ${popular ? 'text-cyan-400' : 'text-blue-400'}`}></i>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Button */}
          <button
            onClick={scrollToBooking}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
              popular
                ? 'btn-primary text-white'
                : 'bg-white/5 border border-white/10 text-white hover:bg-blue-500/20 hover:border-blue-500/30'
            }`}
          >
            Book Now <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

const pricingPlans = [
  {
    size: 'Small Car',
    price: 500,
    icon: 'fas fa-car-side',
    features: [
      'Hatchbacks & Compact Cars',
      'Exterior wash & dry',
      'Interior vacuuming',
      'Dashboard & console cleaning',
      'Tyre & rim cleaning',
      'Air freshener',
    ],
  },
  {
    size: 'Medium Car',
    price: 700,
    icon: 'fas fa-car',
    popular: true,
    features: [
      'Sedans & Mid-size Cars',
      'Premium exterior wash',
      'Full interior deep clean',
      'Dashboard & leather care',
      'Tyre dressing & rim shine',
      'Window polishing inside & out',
      'Premium air freshener',
    ],
  },
  {
    size: 'Big Car',
    price: 900,
    icon: 'fas fa-truck-pickup',
    features: [
      'SUVs, MUVs & Luxury Cars',
      'Premium exterior detailing',
      'Complete interior deep clean',
      'Leather & fabric conditioning',
      'Engine bay cleaning',
      'Tyre dressing & rim polish',
      'Full window treatment',
      'Premium air freshener',
    ],
  },
];

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-20 sm:py-28 relative" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Outfit] text-white mb-4">
            Our <span className="gradient-text">Pricing Plans</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Simple, honest pricing based on your car size. No hidden charges.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={plan.size}
              {...plan}
              delay={index * 150}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Bottom note */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-400 text-sm">
            <i className="fas fa-info-circle text-blue-400 mr-2"></i>
            Prices may vary for heavily soiled vehicles. Bike wash starts at <span className="text-white font-semibold">₹200</span> and Auto wash at <span className="text-white font-semibold">₹300</span>.
          </p>
        </div>
      </div>
    </section>
  );
}
