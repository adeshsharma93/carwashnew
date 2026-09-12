import { useState, useEffect, useRef } from 'react';

interface FormData {
  name: string;
  phone: string;
  vehicleType: string;
  service: string;
  date: string;
  time: string;
  address: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function BookingForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    vehicleType: '',
    service: '',
    date: '',
    time: '',
    address: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
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

  const showAddress = formData.service === 'Doorstep Wash';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid phone number';
    }
    if (!formData.vehicleType) newErrors.vehicleType = 'Please select vehicle type';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    if (showAddress && !formData.address.trim()) newErrors.address = 'Address is required for doorstep service';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitted(true);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="py-20 sm:py-28 relative" ref={sectionRef}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass rounded-3xl p-10 sm:p-16 animate-fade-in-up">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-white text-3xl"></i>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-[Outfit] text-white mb-4">
              Booking Confirmed!
            </h3>
            <p className="text-gray-400 mb-6">
              Thank you, <span className="text-white font-semibold">{formData.name}</span>! Your wash has been booked successfully. We'll contact you at <span className="text-blue-400">{formData.phone}</span> to confirm the details.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', phone: '', vehicleType: '', service: '', date: '', time: '', address: '', message: '' });
              }}
              className="btn-primary px-6 py-3 rounded-full text-white font-semibold"
            >
              Book Another Wash
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" className="py-20 sm:py-28 relative" ref={sectionRef}>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
            Reservation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-[Outfit] text-white mb-4">
            Book Your <span className="gradient-text">Wash</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Fill in the details below and we'll get your vehicle sparkling clean.
          </p>
        </div>

        {/* Form */}
        <div className={`glass rounded-3xl p-6 sm:p-10 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Customer Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="form-input w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 234 567 8900"
                  className="form-input w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Vehicle Type and Service */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vehicle Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-xl text-white appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                >
                  <option value="" style={{ backgroundColor: '#0f1629' }}>Select Vehicle Type</option>
                  <option value="Car" style={{ backgroundColor: '#0f1629' }}>Car</option>
                  <option value="Bike" style={{ backgroundColor: '#0f1629' }}>Bike</option>
                  <option value="Auto" style={{ backgroundColor: '#0f1629' }}>Auto</option>
                </select>
                {errors.vehicleType && <p className="text-red-400 text-xs mt-1">{errors.vehicleType}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service <span className="text-red-400">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-xl text-white appearance-none cursor-pointer"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                >
                  <option value="" style={{ backgroundColor: '#0f1629' }}>Select Service</option>
                  <option value="Car Wash" style={{ backgroundColor: '#0f1629' }}>Car Wash</option>
                  <option value="Bike Wash" style={{ backgroundColor: '#0f1629' }}>Bike Wash</option>
                  <option value="Auto Wash" style={{ backgroundColor: '#0f1629' }}>Auto Wash</option>
                  <option value="Doorstep Wash" style={{ backgroundColor: '#0f1629' }}>Doorstep Wash</option>
                </select>
                {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service}</p>}
              </div>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Date <span className="text-red-400">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={getMinDate()}
                  className="form-input w-full px-4 py-3 rounded-xl text-white cursor-pointer"
                />
                {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Preferred Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="form-input w-full px-4 py-3 rounded-xl text-white cursor-pointer"
                />
                {errors.time && <p className="text-red-400 text-xs mt-1">{errors.time}</p>}
              </div>
            </div>

            {/* Address (conditional) */}
            {showAddress && (
              <div className="animate-fade-in-up">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your full address for doorstep service"
                  className="form-input w-full px-4 py-3 rounded-xl text-white placeholder-gray-500"
                />
                {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message / Additional Requirements
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Any special instructions or requirements..."
                className="form-input w-full px-4 py-3 rounded-xl text-white placeholder-gray-500 resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full py-4 rounded-xl text-white font-bold text-lg"
            >
              <i className="fas fa-check-circle mr-2" />
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
