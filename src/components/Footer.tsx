export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="relative pt-20 pb-8 border-t border-white/5">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                <i className="fas fa-car-side text-white text-lg"></i>
              </div>
              <span className="text-xl font-bold font-[Outfit] text-white">
                Shine<span className="gradient-text">Ride</span>
              </span>
            </a>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Professional car, bike, and auto washing services. We bring the shine to your ride with premium cleaning at affordable prices.
            </p>
            {/* Social Media */}
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
                <i className="fab fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
                <i className="fab fa-twitter text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-blue-500/20 hover:border-blue-500/30 transition-all duration-300">
                <i className="fab fa-whatsapp text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Services', href: '#services' },
                { label: 'About', href: '#why-us' },
                { label: 'Contact', href: '#footer' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <i className="fas fa-chevron-right text-[8px] text-blue-500/50"></i>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-3">
              {['Car Wash', 'Bike Wash', 'Auto Wash', 'Doorstep Wash'].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-gray-400 text-sm hover:text-blue-400 transition-colors duration-200 flex items-center gap-2"
                  >
                    <i className="fas fa-chevron-right text-[8px] text-blue-500/50"></i>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <i className="fas fa-phone text-blue-400 text-xs"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <i className="fas fa-envelope text-blue-400 text-xs"></i>
                <span>hello@shineride.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <i className="fas fa-clock text-blue-400 text-xs mt-0.5"></i>
                <div>
                  <div>Mon - Sat: 7:00 AM - 9:00 PM</div>
                  <div>Sunday: 8:00 AM - 6:00 PM</div>
                </div>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <i className="fas fa-location-dot text-blue-400 text-xs"></i>
                <span>123 Clean Street, Sparkle City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {currentYear} ShineRide Car Wash. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Privacy Policy</a>
            <span className="text-gray-700">|</span>
            <a href="#" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
