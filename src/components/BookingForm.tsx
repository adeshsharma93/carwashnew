import { useState, useEffect, useRef } from 'react';

interface FormData {
  name: string;
  phone: string;
  vehicleType: string;
  service: string;
  serviceType: string;
  date: string;
  time: string;
  address: string;
  serviceLocation: string;
  paymentMethod: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface Booking {
  id: string;
  name: string;
  phone: string;
  vehicleType: string;
  service: string;
  serviceType: string;
  date: string;
  time: string;
  address: string;
  serviceLocation: string;
  paymentMethod: string;
  message: string;
  price: number;
  status: string;
  createdAt: string;
}

export default function BookingForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    vehicleType: '',
    service: '',
    serviceType: '',
    date: '',
    time: '',
    address: '',
    serviceLocation: 'onsite',
    paymentMethod: 'cash',
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

  // Load bookings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('shineRideBookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading bookings:', e);
    }
  }, []);

  // Load selected service from session storage
  useEffect(() => {
    try {
      const selectedService = sessionStorage.getItem('selectedService');
      if (selectedService) {
        const parts = selectedService.split(' - ');
        if (parts.length >= 2) {
          const vehicleType = parts[0];
          const serviceType = parts.slice(1).join(' - ');
          setFormData((prev) => ({
            ...prev,
            vehicleType: vehicleType === 'Car' ? 'Small Car' : vehicleType,
            serviceType: serviceType,
          }));
        }
        sessionStorage.removeItem('selectedService');
      }
    } catch (e) {
      console.error('Error loading selected service:', e);
    }
  }, []);

  const showAddress = formData.serviceLocation === 'doorstep';

  // Service options based on vehicle type
  const getServiceOptions = () => {
    if (formData.vehicleType === 'Bike') {
      return [
        { value: 'Pressure Wash', label: 'Pressure Wash - ₹149', price: 149 },
        { value: 'Bucket Wash', label: 'Bucket Wash - ₹99', price: 99 },
        { value: 'Body Wash Only', label: 'Body Wash Only - ₹129', price: 129 },
        { value: 'Full Bike Wash', label: 'Full Bike Wash - ₹249', price: 249 },
        { value: 'Full Wash + Teflon Coating', label: 'Full Wash + Teflon Coating - ₹599', price: 599 },
      ];
    } else if (formData.vehicleType === 'Auto') {
      return [
        { value: 'Basic Wash', label: 'Basic Wash - ₹300', price: 300 },
        { value: 'Full Wash', label: 'Full Wash - ₹500', price: 500 },
      ];
    } else {
      // Car services
      return [
        { value: 'Pressure Wash', label: 'Pressure Wash - ₹299', price: 299 },
        { value: 'Bucket Wash', label: 'Bucket Wash - ₹199', price: 199 },
        { value: 'Body Wash Only', label: 'Body Wash Only - ₹249', price: 249 },
        { value: 'Interior Wash', label: 'Interior Wash - ₹399', price: 399 },
        { value: 'Full Wash', label: 'Full Wash - ₹599', price: 599 },
        { value: 'Full Wash + Teflon Coating', label: 'Full Wash + Teflon Coating - ₹1,499', price: 1499 },
      ];
    }
  };

  // Get vehicle options
  const getVehicleOptions = () => {
    return [
      { value: 'Small Car', label: 'Small Car' },
      { value: 'Medium Car', label: 'Medium Car' },
      { value: 'Big Car', label: 'Big Car' },
      { value: 'Bike', label: 'Bike' },
      { value: 'Auto', label: 'Auto' },
    ];
  };

  // Get price based on service
  const getPrice = () => {
    const services = getServiceOptions();
    const service = services.find((s) => s.value === formData.serviceType);
    return service ? service.price : 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Reset service type when vehicle type changes
    if (name === 'vehicleType') {
      setFormData((prev) => ({ ...prev, vehicleType: value, serviceType: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
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
    if (!formData.serviceType) newErrors.serviceType = 'Please select a service';
    if (!formData.date) newErrors.date = 'Please select a date';
    if (!formData.time) newErrors.time = 'Please select a time';
    if (showAddress && !formData.address.trim()) newErrors.address = 'Address is required for doorstep service';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const newBooking: Booking = {
        id: Date.now().toString(),
        ...formData,
        price: getPrice(),
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
      };
      
      const updatedBookings = [newBooking, ...bookings];
      setBookings(updatedBookings);
      try {
        localStorage.setItem('shineRideBookings', JSON.stringify(updatedBookings));
      } catch (e) {
        console.error('Error saving booking:', e);
      }
      
      setIsSubmitted(true);
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const deleteBooking = (id: string) => {
    const updatedBookings = bookings.filter((b) => b.id !== id);
    setBookings(updatedBookings);
    try {
      localStorage.setItem('shineRideBookings', JSON.stringify(updatedBookings));
    } catch (e) {
      console.error('Error deleting booking:', e);
    }
  };

  if (showHistory) {
    return (
      <section id="booking" className="py-20 sm:py-28 relative" ref={sectionRef}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-[Outfit] text-white">
              Booking <span className="gradient-text">History</span>
            </h2>
            <button
              onClick={() => setShowHistory(false)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm hover:bg-blue-500/20 transition-all"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              Back to Booking
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="glass rounded-2xl p-12 text-center">
              <i className="fas fa-calendar-xmark text-5xl text-gray-600 mb-4"></i>
              <p className="text-gray-400">No bookings yet. Make your first booking!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="glass rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{booking.serviceType}</h3>
                      <p className="text-sm text-gray-400">{booking.vehicleType}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text font-[Outfit]">₹{booking.price}</div>
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-400">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-gray-500">Date:</span>
                      <span className="text-white ml-2">{booking.date}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <span className="text-white ml-2">{booking.time}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Location:</span>
                      <span className="text-white ml-2 capitalize">{booking.serviceLocation}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Payment:</span>
                      <span className="text-white ml-2 capitalize">{booking.paymentMethod}</span>
                    </div>
                  </div>

                  {booking.address && (
                    <div className="mb-4 text-sm">
                      <span className="text-gray-500">Address:</span>
                      <span className="text-white ml-2">{booking.address}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs text-gray-500">
                      Booked on {new Date(booking.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => deleteBooking(booking.id)}
                      className="text-red-400 hover:text-red-300 text-sm transition-colors"
                    >
                      <i className="fas fa-trash mr-1"></i>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

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
              Thank you, <span className="text-white font-semibold">{formData.name}</span>! Your wash has been booked successfully.
            </p>
            
            <div className="glass-light rounded-2xl p-6 mb-6 text-left">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Service:</span>
                  <span className="text-white font-semibold">{formData.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle:</span>
                  <span className="text-white font-semibold">{formData.vehicleType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white font-semibold">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Time:</span>
                  <span className="text-white font-semibold">{formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Location:</span>
                  <span className="text-white font-semibold capitalize">{formData.serviceLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment:</span>
                  <span className="text-white font-semibold capitalize">{formData.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-white/10">
                  <span className="text-gray-400">Total:</span>
                  <span className="text-2xl font-bold gradient-text font-[Outfit]">₹{getPrice()}</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-6">
              We'll contact you at <span className="text-blue-400">{formData.phone}</span> to confirm the details.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: '',
                    phone: '',
                    vehicleType: '',
                    service: '',
                    serviceType: '',
                    date: '',
                    time: '',
                    address: '',
                    serviceLocation: 'onsite',
                    paymentMethod: 'cash',
                    message: '',
                  });
                }}
                className="btn-primary px-6 py-3 rounded-full text-white font-semibold flex-1"
              >
                Book Another Wash
              </button>
              <button
                onClick={() => setShowHistory(true)}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all flex-1"
              >
                View History
              </button>
            </div>
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
          {bookings.length > 0 && (
            <button
              onClick={() => setShowHistory(true)}
              className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <i className="fas fa-history mr-1"></i>
              View Booking History ({bookings.length})
            </button>
          )}
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

            {/* Vehicle Type and Service Type */}
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
                  style={{ backgroundImage: `url("image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                >
                  <option value="" style={{ backgroundColor: '#0f1629' }}>Select Vehicle Type</option>
                  {getVehicleOptions().map((option) => (
                    <option key={option.value} value={option.value} style={{ backgroundColor: '#0f1629' }}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.vehicleType && <p className="text-red-400 text-xs mt-1">{errors.vehicleType}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Service Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  disabled={!formData.vehicleType}
                  className={`form-input w-full px-4 py-3 rounded-xl text-white appearance-none cursor-pointer ${!formData.vehicleType ? 'opacity-50 cursor-not-allowed' : ''}`}
                  style={{ backgroundImage: `url("image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%236b7280' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}
                >
                  <option value="" style={{ backgroundColor: '#0f1629' }}>
                    {formData.vehicleType ? 'Select Service' : 'Select Vehicle First'}
                  </option>
                  {getServiceOptions().map((option) => (
                    <option key={option.value} value={option.value} style={{ backgroundColor: '#0f1629' }}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.serviceType && <p className="text-red-400 text-xs mt-1">{errors.serviceType}</p>}
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

            {/* Service Location */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Service Location <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.serviceLocation === 'onsite' 
                    ? 'bg-blue-500/20 border-blue-500/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                  <input
                    type="radio"
                    name="serviceLocation"
                    value="onsite"
                    checked={formData.serviceLocation === 'onsite'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <i className="fas fa-store text-blue-400"></i>
                  <div>
                    <div className="text-sm font-semibold text-white">Visit Our Center</div>
                    <div className="text-xs text-gray-400">Bring your vehicle to us</div>
                  </div>
                </label>
                <label className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  formData.serviceLocation === 'doorstep' 
                    ? 'bg-blue-500/20 border-blue-500/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                  <input
                    type="radio"
                    name="serviceLocation"
                    value="doorstep"
                    checked={formData.serviceLocation === 'doorstep'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <i className="fas fa-house text-cyan-400"></i>
                  <div>
                    <div className="text-sm font-semibold text-white">Doorstep Service</div>
                    <div className="text-xs text-gray-400">We come to you</div>
                  </div>
                </label>
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

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'cash' 
                    ? 'bg-blue-500/20 border-blue-500/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <i className="fas fa-money-bill-wave text-green-400"></i>
                  <span className="text-sm text-white">Cash</span>
                </label>
                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'upi' 
                    ? 'bg-blue-500/20 border-blue-500/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <i className="fas fa-mobile-screen text-purple-400"></i>
                  <span className="text-sm text-white">UPI</span>
                </label>
                <label className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' 
                    ? 'bg-blue-500/20 border-blue-500/50' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <i className="fas fa-credit-card text-blue-400"></i>
                  <span className="text-sm text-white">Card</span>
                </label>
              </div>
            </div>

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

            {/* Price Display */}
            {formData.serviceType && (
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-400/10 border border-blue-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium">Total Amount</span>
                  <span className="text-3xl font-bold gradient-text font-[Outfit]">₹{getPrice()}</span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary w-full py-4 rounded-xl text-white font-bold text-lg"
            >
              <i className="fas fa-check-circle mr-2"></i>
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
