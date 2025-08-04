import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventCard } from './EventCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Calendar, Users, DollarSign, TrendingUp, Clock, MapPin } from 'lucide-react';

export const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [publicEvents, setPublicEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalSessions: 0,
    totalCapacity: 0,
    totalRevenue: 0,
    upcomingEvents: 0,
    liveEvents: 0
  });

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;

      try {
        const token = await getToken();
        
        // Fetch user's events
        const userEventsResponse = await fetch('http://localhost:3001/api/events', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        // Fetch public events for "Events For You"
        const publicEventsResponse = await fetch('http://localhost:3001/api/events/public', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (userEventsResponse.ok && publicEventsResponse.ok) {
          const userEventsData = await userEventsResponse.json();
          const publicEventsData = await publicEventsResponse.json();
          
          setEvents(userEventsData);
          setPublicEvents(publicEventsData);

          // Calculate stats
          const now = new Date();
          const stats = {
            totalEvents: userEventsData.length,
            totalSessions: userEventsData.reduce((total, event) => total + (event.sessions?.length || 0), 0),
            totalCapacity: userEventsData.reduce((total, event) => total + (event.capacity || 0), 0),
            totalRevenue: userEventsData.reduce((total, event) => total + (event.price || 0) * (event.capacity || 0), 0),
            upcomingEvents: userEventsData.filter(event => new Date(event.startDate) > now).length,
            liveEvents: userEventsData.filter(event => {
              const start = new Date(event.startDate);
              const end = new Date(event.endDate);
              return now >= start && now <= end;
            }).length
          };
          setStats(stats);
        } else {
          throw new Error('Failed to fetch events');
        }
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user]);

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
      className="glass-panel p-6 rounded-2xl border border-cyan-500/20"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-cyan-300/80 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full"></div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-panel p-8 rounded-2xl text-center">
          <p className="text-red-400 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-black text-white mb-2">
              Welcome back, <span className="gradient-text">{user?.firstName || 'Valued User'}</span>
            </h1>
            <p className="text-cyan-300/80 text-lg">Manage your events and track performance</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/create-event')}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={20} />
            Create New Event
          </motion.button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatCard icon={Calendar} label="Total Events" value={stats.totalEvents} color="from-cyan-400 to-blue-400" />
          <StatCard icon={Users} label="Total Capacity" value={stats.totalCapacity} color="from-purple-400 to-pink-400" />
          <StatCard icon={DollarSign} label="Total Revenue" value={`$${stats.totalRevenue.toLocaleString()}`} color="from-emerald-400 to-cyan-400" />
          <StatCard icon={TrendingUp} label="Live Events" value={stats.liveEvents} color="from-orange-400 to-pink-400" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Events Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your Events</h2>
                <span className="text-cyan-300/80">{events.length} events</span>
              </div>
              
              {events.length === 0 ? (
                <motion.div
                  className="glass-panel p-12 rounded-2xl text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Calendar className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No events yet</h3>
                  <p className="text-cyan-300/80 mb-6">Start creating your first event to see it here</p>
                  <button
                    onClick={() => navigate('/create-event')}
                    className="btn-primary"
                  >
                    Create Your First Event
                  </button>
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {events.map((event, index) => (
                    <motion.div
                      key={event._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Events For You Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Events For You</h2>
                <span className="text-cyan-300/80">{publicEvents.length} events</span>
              </div>
              
              {publicEvents.length === 0 ? (
                <div className="glass-panel p-8 rounded-2xl text-center">
                  <MapPin className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                  <p className="text-cyan-300/80">No public events available at the moment</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {publicEvents.map((event, index) => (
                    <motion.div
                      key={event._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <EventCard event={event} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              className="glass-panel p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/create-event')}
                  className="w-full btn-secondary text-sm"
                >
                  Create Event
                </button>
                <button
                  onClick={() => navigate('/stats')}
                  className="w-full btn-outline text-sm"
                >
                  View Analytics
                </button>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="glass-panel p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {events.slice(0, 3).map((event, index) => (
                  <div key={event._id} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <div>
                      <p className="text-sm text-white">{event.title}</p>
                      <p className="text-xs text-cyan-300/80">
                        {new Date(event.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};