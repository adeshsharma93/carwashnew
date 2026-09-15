import { useState, useEffect, useRef } from 'react';

interface Service {
  name: string;
  price: number;
  features: string[];
  icon: string;
}

interface ServiceCategory {
  title: string;
  icon: string;
  services: Service[];
}

const carWashServices: Service[] = [
  {
    name: 'Pressure Wash',
    price: 299,
    icon: 'fas fa-spray-can',
    features: [
      'High-pressure exterior cleaning',
      'Wheels & tyres cleaning',
      'Quick drying',
    ],
  },
  {
    name: 'Bucket Wash',
    price: 199,
    icon: 'fas fa-bucket',
    features: [
      'Hand wash',
      'Shampoo cleaning',
      'Basic exterior cleaning',
    ],
  },
  {
    name: 'Body Wash Only',
    price: 249,
    icon: 'fas fa-car-side',
    features: [
      'Complete exterior body cleaning',
      'Shampoo wash',
      'Tyre cleaning',
    ],
  },
  {
    name: 'Interior Wash',
    price: 399,
    icon: 'fas fa-couch',
    features: [
      'Dashboard cleaning',
      'Seats & mats cleaning',
      'Vacuum cleaning',
      'Interior sanitization',
    ],
  },
  {
    name: 'Full Wash',
    price: 599,
    icon: 'fas fa-car',
    features: [
      'Exterior pressure wash',
      'Interior vacuum & cleaning',
      'Tyre & wheel cleaning',
      'Dashboard cleaning',
      'Complete drying',
    ],
  },
  {
    name: 'Full Wash + Teflon Coating',
    price: 1499,
    icon: 'fas fa-shield-alt',
    features: [
      'Full exterior & interior wash',
      'Deep body cleaning',
      'Teflon coating',
      'Paint protection and shine',
    ],
  },
];

const bikeWashServices: Service[] = [
  {
    name: 'Pressure Wash',
    price: 149,
    icon: 'fas fa-spray-can',
    features: ['High-pressure cleaning', 'Quick drying'],
  },
  {
    name: 'Bucket Wash',
    price: 99,
    icon: 'fas fa-bucket',
    features: ['Hand wash', 'Basic cleaning'],
  },
  {
    name: 'Body Wash Only',
    price: 129,
    icon: 'fas fa-motorcycle',
    features: ['Complete body cleaning', 'Shampoo wash'],
  },
  {
    name: 'Full Bike Wash',
    price: 249,
    icon: 'fas fa-motorcycle',
    features: ['Complete wash', 'Interior cleaning', 'Chain & engine cleaning'],
  },
  {
    name: 'Full Wash + Teflon Coating',
    price: 599,
    icon: 'fas fa-shield-alt',
    features: ['Full wash', 'Teflon coating', 'Paint protection'],
  },
];

function ServiceCard({ service, vehicleType, onBook }: { service: Service; vehicleType: string; onBook: (service: string) => void }) {
  return (
    <div className="glass-light rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-400/20 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <i className={`${service.icon} text-xl text-blue-400`}></i>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold gradient-text font-[Outfit]">₹{service.price}</div>
        </div>
      </div>
      
      <h3 className="text-lg font-bold text-white mb-3">{service.name}</h3>
      
      <ul className="space-y-2 mb-5">
        {service.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-400">
            <i className="fas fa-check-circle mt-0.5 text-xs text-cyan-400"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={() => onBook(`${vehicleType} - ${service.name}`)}
        className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-sm hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
      >
        Book Now <i className="fas fa-arrow-right ml-2"></i>
      </button>
    </div>
  );
}

export default function ServicesPage() {
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

  const handleBookService = (serviceName: string) => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
      // Store selected service in session storage for the booking form
      sessionStorage.setItem('selectedService', serviceName);
    }
  };

  return (
    <section id="services-detail" className="py-20 sm:py-28 relative" ref={sectionRef}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            Detailed Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Outfit] text-white mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Choose from our comprehensive range of professional cleaning services.
          </p>
        </div>

        {/* Car Wash Services */}
        <div className={`mb-16 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <i className="fas fa-car text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-[Outfit] text-white">Car Wash Services</h3>
              <p className="text-sm text-gray-400">Professional cleaning for all car types</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {carWashServices.map((service) => (
              <ServiceCard
                key={service.name}
                service={service}
                vehicleType="Car"
                onBook={handleBookService}
              />
            ))}
          </div>
        </div>

        {/* Bike Wash Services */}
        <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <i className="fas fa-motorcycle text-white text-xl"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold font-[Outfit] text-white">Bike Wash Services</h3>
              <p className="text-sm text-gray-400">Specialized cleaning for motorcycles</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikeWashServices.map((service) => (
              <ServiceCard
                key={service.name}
                service={service}
                vehicleType="Bike"
                onBook={handleBookService}
              />
            ))}
          </div>
        </div>

        {/* Note */}
        <div className={`mt-12 text-center transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-gray-400 text-sm">
            <i className="fas fa-info-circle text-blue-400 mr-2"></i>
            All prices are inclusive of taxes. Doorstep service available at additional charges.
          </p>
        </div>
      </div>
    </section>
  );
}
