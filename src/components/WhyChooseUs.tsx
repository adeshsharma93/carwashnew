import { useEffect, useRef, useState } from 'react';

const features = [
  {
    icon: 'fas fa-award',
    title: 'Professional Cleaning',
    description: 'Trained experts using premium products for a spotless finish every time.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: 'fas fa-tags',
    title: 'Affordable Pricing',
    description: 'Quality service that fits your budget. No hidden charges, ever.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: 'fas fa-bolt',
    title: 'Quick Service',
    description: 'Get your vehicle cleaned and ready in minimum time without compromising quality.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: 'fas fa-location-dot',
    title: 'Convenient Doorstep Service',
    description: 'We come to you! Book a wash at your home or office at your convenience.',
    color: 'from-green-500 to-green-600',
  },
];

export default function WhyChooseUs() {
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
    <section id="why-us" className="py-20 sm:py-28 relative" ref={sectionRef}>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            Why ShineRide
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Outfit] text-white mb-4">
            Why <span className="gradient-text">Choose Us</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We deliver excellence in every wash. Here's what sets us apart.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`glass-light rounded-2xl p-6 text-center group hover:bg-white/10 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${feature.icon} text-white text-xl`}></i>
              </div>
              <h3 className="text-lg font-bold font-[Outfit] text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
