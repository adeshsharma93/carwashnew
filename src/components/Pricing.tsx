import { useEffect, useRef, useState } from 'react';

interface PricingTier {
  type: string;
  price: number;
  icon: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    type: 'Small Car',
    price: 500,
    icon: 'fas fa-car-side',
    description: 'Perfect for hatchbacks and compact cars',
    features: [
      'Exterior wash & dry',
      'Interior vacuuming',
      'Dashboard cleaning',
      'Tyre & rim cleaning',
      'Window cleaning',
      'Air freshener',
    ],
  },
  {
    type: 'Medium Car',
    price: 700,
    icon: 'fas fa-car',
    description: 'Ideal for sedans and mid-size cars',
    features: [
      'Exterior wash & dry',
      'Full interior vacuuming',
      'Dashboard & console cleaning',
      'Tyre & rim deep cleaning',
      'Window cleaning inside & out',
      'Seat cleaning',
      'Air freshener',
      'Door panel wipe',
    ],
    popular: true,
  },
  {
    type: 'Big Car',
    price: 900,
    icon: 'fas fa-truck-pickup',
    description: 'For SUVs, luxury cars & large vehicles',
    features: [
      'Premium exterior wash & wax',
      'Full interior deep cleaning',
      'Dashboard & console detailing',
      'Tyre & rim deep polishing',
      'Window cleaning inside & out',
      'Leather/fabric seat treatment',
      'Premium air freshener',
      'Door panel & trunk cleaning',
      'Engine bay wipe-down',
    ],
  },
];

function PricingCard({ tier, index, isVisible }: { tier: PricingTier; index: number; isVisible: boolean }) {
  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Popular badge */}
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
          <span className="px-4 py-1.5 text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full shadow-lg shadow-blue-500/25">
            Most Popular
          </span>
        </div>
      )}

      <div
        className={`h-full rounded-2xl p-6 sm:p-8 transition-all duration-500 ${
          tier.popular
            ? 'glass border-blue-500/30 shadow-lg shadow-blue-500/10 scale-[1.02]'
            : 'glass-light hover:bg-white/10'
        } group-hover:-translate-y-2`}
      >
        {/* Icon */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${
            tier.popular
              ? 'bg-gradient-to-br from-blue-500 to-cyan-400'
              : 'bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-blue-500/20'
          }`}
        >
          <i className={`${tier.icon} text-2xl ${tier.popular ? 'text-white' : 'text-blue-400'}`}></i>
        </div>

        {/* Type */}
        <h3 className="text-xl font-bold font-[Outfit] text-white mb-1">{tier.type}</h3>
        <p className="text-gray-400 text-sm mb-5">{tier.description}</p>

        {/* Price */}
        <div className="flex items-end gap-1 mb-6">
          <span className="text-sm text-gray-400 font-medium">₹</span>
          <span className={`text-4xl sm:text-5xl font-bold font-[Outfit] ${tier.popular ? 'gradient-text' : 'text-white'}`}>
            {tier.price}
          </span>
          <span className="text-sm text-gray-400 font-medium mb-1">/ wash</span>
        </div>

        {/* Divider */}
        <div className={`h-px mb-6 ${tier.popular ? 'bg-gradient-to-r from-transparent via-blue-500/30 to-transparent' : 'bg-white/10'}`} />

        {/* Features */}
        <ul className="space-y-3 mb-8">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm">
              <i className={`fas fa-check-circle mt-0.5 text-sm ${tier.popular ? 'text-cyan-400' : 'text-blue-400/70'}`}></i>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Button */}
        <button
          onClick={scrollToBooking}
          className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
            tier.popular
              ? 'btn-primary text-white'
              : 'bg-white/5 border border-white/10 text-white hover:bg-blue-500/20 hover:border-blue-500/30'
          }`}
        >
          Book {tier.type} Wash <i className="fas fa-arrow-right ml-2"></i>
        </button>
      </div>
    </div>
  );
}

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
            Our <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Simple, affordable pricing based on your car size. No hidden charges.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.type} tier={tier} index={index} isVisible={isVisible} />
          ))}
        </div>

        {/* Additional note */}
        <div
          className={`text-center mt-12 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-gray-400 text-sm">
            <i className="fas fa-info-circle text-blue-400 mr-2"></i>
            Bike wash starts at <span className="text-white font-semibold">₹200</span> & Auto wash at <span className="text-white font-semibold">₹300</span>. Doorstep service available at additional charge.
          </p>
        </div>
      </div>
    </section>
  );
}
