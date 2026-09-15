import { useEffect, useRef, useState } from 'react';

const testimonials = [
  {
    name: 'Rajesh Kumar',
    role: 'Car Owner',
    rating: 5,
    text: 'Absolutely fantastic service! My car looks brand new after every wash. The team is professional, punctual, and they pay attention to every detail. Highly recommend ShineRide!',
    avatar: 'RK',
  },
  {
    name: 'Priya Sharma',
    role: 'Bike Enthusiast',
    rating: 5,
    text: 'I\'ve been using their bike wash service for 6 months now. The quality is consistently excellent and the prices are very reasonable. The doorstep service is a game changer!',
    avatar: 'PS',
  },
  {
    name: 'Mohammed Irfan',
    role: 'Auto Driver',
    rating: 4,
    text: 'Very reliable and affordable service. They take care of my auto like it\'s their own vehicle. Quick turnaround time and always a smile on their faces. Great team!',
    avatar: 'MI',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`fas fa-star text-sm ${star <= rating ? 'star-filled' : 'text-gray-600'}`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
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
    <section id="testimonials" className="py-20 sm:py-28 relative" ref={sectionRef}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Outfit] text-white mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Don't just take our word for it — hear from our happy customers.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className={`glass-light rounded-2xl p-6 sm:p-8 group hover:bg-white/10 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Quote icon */}
              <div className="mb-4">
                <i className="fas fa-quote-left text-2xl text-blue-500/30"></i>
              </div>

              {/* Rating */}
              <StarRating rating={testimonial.rating} />

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed mt-4 mb-6">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{testimonial.avatar}</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{testimonial.name}</div>
                  <div className="text-xs text-gray-400">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
