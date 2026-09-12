import { useEffect, useRef, useState } from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  badge?: string;
  isDoorstep?: boolean;
  isCarWash?: boolean;
  delay?: number;
}

function ServiceCard({ icon, title, description, badge, isDoorstep, isCarWash, delay = 0 }: ServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.2 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [delay]);

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
  };

  const carPricing = [
    { size: 'Small Car', original: 500, icon: 'fas fa-car-side' },
    { size: 'Medium Car', original: 700, icon: 'fas fa-car' },
    { size: 'Big Car', original: 900, icon: 'fas fa-truck-pickup' },
  ];

  return (
    <div
      ref={cardRef}
      className={`service-card glass rounded-2xl p-6 sm:p-8 relative overflow-hidden group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white">
            {badge}
          </span>
        </div>
      )}

      {/* Icon */}
      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${
        isDoorstep
          ? 'bg-gradient-to-br from-cyan-500 to-blue-600'
          : 'bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-blue-500/20'
      } group-hover:scale-110 transition-transform duration-300`}>
        <i className={`${icon} text-2xl ${isDoorstep ? 'text-white' : 'text-blue-400'}`}></i>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold font-[Outfit] text-white mb-3">{title}</h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-6">{description}</p>

      {/* Pricing Table for Car Wash */}
      {isCarWash && (
        <div className="mb-6">
          {/* Discount banner */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              <i className="fas fa-tag mr-1"></i>
              10% OFF
            </span>
            <span className="text-xs text-gray-400">Limited time offer on all car washes!</span>
          </div>

          {/* Pricing rows */}
          <div className="space-y-2.5">
            {carPricing.map((car) => {
              const discounted = Math.round(car.original * 0.9);
              return (
                <div
                  key={car.size}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <i className={`${car.icon} text-xs text-blue-400`}></i>
                    </div>
                    <span className="text-sm font-medium text-white">{car.size}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 line-through">₹{car.original}</span>
                    <span className="text-lg font-bold gradient-text font-[Outfit]">₹{discounted}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={scrollToBooking}
        className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
          isDoorstep
            ? 'btn-primary text-white'
            : 'bg-white/5 border border-white/10 text-white hover:bg-blue-500/20 hover:border-blue-500/30'
        }`}
      >
        {isDoorstep ? 'Book Doorstep Wash' : 'Book Now'} <i className="fas fa-arrow-right ml-2"></i>
      </button>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/5 to-cyan-400/5 rounded-2xl blur-xl" />
      </div>
    </div>
  );
}

export default function Services() {
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

  const services = [
    {
      icon: 'fas fa-car',
      title: 'Car Wash',
      description: 'Premium exterior and interior cleaning to keep your car looking fresh and spotless.',
      isCarWash: true,
      delay: 0,
    },
    {
      icon: 'fas fa-motorcycle',
      title: 'Bike Wash',
      description: 'Deep cleaning and shining service designed specifically for bikes and motorcycles.',
      delay: 150,
    },
    {
      icon: 'fas fa-shuttle-van',
      title: 'Auto Wash',
      description: 'Reliable and affordable washing service for auto-rickshaws.',
      delay: 300,
    },
    {
      icon: 'fas fa-house-chimney',
      title: 'Doorstep Wash',
      description: "Don't have time to visit us? Our team comes to your doorstep and washes your vehicle at your convenience.",
      badge: 'ADDITIONAL SERVICE',
      isDoorstep: true,
      delay: 450,
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 relative" ref={sectionRef}>
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            What We Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Outfit] text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Complete cleaning solutions for every ride.
          </p>
        </div>

        {/* Service Cards - Car Wash full width on top, others below */}
        <div className="space-y-6">
          {/* Car Wash - Full width with pricing */}
          <ServiceCard {...services[0]} />
          
          {/* Other services in a row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.slice(1).map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
