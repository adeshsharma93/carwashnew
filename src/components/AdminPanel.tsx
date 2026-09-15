import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

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

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'stats'>('bookings');

  useEffect(() => {
    const stored = localStorage.getItem('shineRideBookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    }
  }, []);

  const updateBookingStatus = (id: string, status: string) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status } : b
    );
    setBookings(updated);
    localStorage.setItem('shineRideBookings', JSON.stringify(updated));
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem('shineRideBookings', JSON.stringify(updated));
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + b.price, 0);
  const completedBookings = bookings.filter((b) => b.status === 'Completed').length;
  const pendingBookings = bookings.filter((b) => b.status === 'Confirmed' || b.status === 'In Progress').length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
              <i className="fas fa-user-shield text-white"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-[Outfit]">Admin Panel</h2>
              <p className="text-xs text-gray-400">Manage your business</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-4 border-b border-white/10">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'bookings'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-calendar-check mr-2"></i>
            Bookings
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'services'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-list mr-2"></i>
            Services
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'stats'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
            }`}
          >
            <i className="fas fa-chart-line mr-2"></i>
            Statistics
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'bookings' && (
            <div>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fas fa-inbox text-5xl text-gray-600 mb-4"></i>
                  <p className="text-gray-400">No bookings yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="glass-light rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{booking.name}</h3>
                          <p className="text-sm text-gray-400">{booking.phone}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold gradient-text font-[Outfit]">₹{booking.price}</div>
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className="mt-1 px-2 py-1 text-xs rounded-lg bg-white/5 border border-white/10 text-white appearance-none cursor-pointer"
                          >
                            <option value="Confirmed" style={{ backgroundColor: '#0f1629' }}>Confirmed</option>
                            <option value="In Progress" style={{ backgroundColor: '#0f1629' }}>In Progress</option>
                            <option value="Completed" style={{ backgroundColor: '#0f1629' }}>Completed</option>
                            <option value="Cancelled" style={{ backgroundColor: '#0f1629' }}>Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Service:</span>
                          <span className="text-white ml-2">{booking.serviceType}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Vehicle:</span>
                          <span className="text-white ml-2">{booking.vehicleType}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <span className="text-white ml-2">{booking.date} at {booking.time}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Location:</span>
                          <span className="text-white ml-2 capitalize">{booking.serviceLocation}</span>
                        </div>
                      </div>

                      {booking.address && (
                        <div className="text-sm mb-3">
                          <span className="text-gray-500">Address:</span>
                          <span className="text-white ml-2">{booking.address}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <span className="text-xs text-gray-500">
                          Booked: {new Date(booking.createdAt).toLocaleString()}
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
          )}

          {activeTab === 'services' && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Service Management</h3>
              <div className="glass-light rounded-xl p-6">
                <p className="text-gray-400 text-sm mb-4">
                  Current service pricing and configuration
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-blue-400 mb-2">Car Wash Services</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Pressure Wash</span>
                        <span className="text-white font-semibold">₹299</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Bucket Wash</span>
                        <span className="text-white font-semibold">₹199</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Body Wash Only</span>
                        <span className="text-white font-semibold">₹249</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Interior Wash</span>
                        <span className="text-white font-semibold">₹399</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Full Wash</span>
                        <span className="text-white font-semibold">₹599</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Full Wash + Teflon Coating</span>
                        <span className="text-white font-semibold">₹1,499</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <h4 className="text-sm font-semibold text-cyan-400 mb-2">Bike Wash Services</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Pressure Wash</span>
                        <span className="text-white font-semibold">₹149</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Bucket Wash</span>
                        <span className="text-white font-semibold">₹99</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Body Wash Only</span>
                        <span className="text-white font-semibold">₹129</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Full Bike Wash</span>
                        <span className="text-white font-semibold">₹249</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-300">Full Wash + Teflon Coating</span>
                        <span className="text-white font-semibold">₹599</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div>
              <h3 className="text-lg font-bold text-white mb-4">Business Statistics</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="glass-light rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <i className="fas fa-calendar-check text-blue-400"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white font-[Outfit]">{bookings.length}</div>
                      <div className="text-xs text-gray-400">Total Bookings</div>
                    </div>
                  </div>
                </div>

                <div className="glass-light rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                      <i className="fas fa-check-circle text-green-400"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white font-[Outfit]">{completedBookings}</div>
                      <div className="text-xs text-gray-400">Completed</div>
                    </div>
                  </div>
                </div>

                <div className="glass-light rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                      <i className="fas fa-clock text-yellow-400"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white font-[Outfit]">{pendingBookings}</div>
                      <div className="text-xs text-gray-400">Pending</div>
                    </div>
                  </div>
                </div>

                <div className="glass-light rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center">
                      <i className="fas fa-indian-rupee-sign text-white"></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold gradient-text font-[Outfit]">₹{totalRevenue.toLocaleString()}</div>
                      <div className="text-xs text-gray-400">Total Revenue</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-light rounded-xl p-6">
                <h4 className="text-sm font-semibold text-white mb-4">Recent Activity</h4>
                {bookings.length === 0 ? (
                  <p className="text-gray-400 text-sm">No activity yet</p>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 5).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-white font-medium">{booking.name}</span>
                          <span className="text-gray-400 ml-2">- {booking.serviceType}</span>
                        </div>
                        <span className="gradient-text font-semibold">₹{booking.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
