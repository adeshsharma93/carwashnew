import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    number: '01',
    icon: 'fas fa-list-check',
    title: 'Choose Your Service',
    description: 'Select from our range of car, bike, auto, or doorstep wash services.',
  },
  {
    number: '02',
    icon: 'fas fa-calendar-check',
    title: 'Book Your Wash',
    description: 'Pick a convenient date and time. Fill in your details and confirm.',
  },
  {
    number: '03',
    icon: 'fas fa-sparkles',
    title: 'Enjoy a Spotless Ride',
    description: 'Sit back and relax while we make your vehicle shine like new.',
  },
];

export default function HowItWorks() {
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
    <section id="how-it-works" className="py-20 sm:py-28 relative" ref={sectionRef}>
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            Simple Process
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Outfit] text-white mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Getting your vehicle cleaned has never been easier.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-24 left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-500/30 via-cyan-400/30 to-blue-500/30" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative text-center transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Step number circle */}
              <div className="relative inline-flex items-center justify-center mb-6">
                <div className="w-20 h-20 rounded-full glass flex items-center justify-center relative z-10">
                  <i className={`${step.icon} text-2xl text-blue-400`}></i>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center z-20">
                  <span className="text-xs font-bold text-white">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold font-[Outfit] text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
