import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Clock, Tag, ExternalLink } from 'lucide-react';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, getToken } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = await getToken();
        const response = await fetch(`http://localhost:3001/api/events/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setEvent(data);
        } else {
          throw new Error('Failed to fetch event');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEvent();
    } else {
      setLoading(false);
    }
  }, [id, userId, getToken]);

  const getStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return 'Unknown';
    }
    
    if (now < start) return 'Scheduled';
    if (now >= start && now <= end) return 'Live';
    return 'Ended';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString();
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  const formatDateTimeShort = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-panel p-8 rounded-2xl text-center">
          <p className="text-cyan-300/80">No event data available</p>
        </div>
      </div>
    );
  }

  const status = getStatus(event.startDate, event.endDate);
  const statusConfig = {
    Live: {
      bg: 'from-emerald-500/20 to-green-600/20',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/20'
    },
    Scheduled: {
      bg: 'from-cyan-500/20 to-blue-600/20',
      text: 'text-cyan-400',
      border: 'border-cyan-500/30',
      glow: 'shadow-cyan-500/20'
    },
    Ended: {
      bg: 'from-purple-500/20 to-indigo-600/20',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      glow: 'shadow-purple-500/20'
    },
    Unknown: {
      bg: 'from-gray-500/20 to-gray-600/20',
      text: 'text-gray-400',
      border: 'border-gray-500/30',
      glow: 'shadow-gray-500/20'
    }
  };

  const config = statusConfig[status];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/dashboard')}
          className="mb-8 text-cyan-300 hover:text-cyan-200 flex items-center glass-panel px-4 py-2 rounded-xl"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </motion.button>

        <motion.div
          className="glass-panel-strong p-8 rounded-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <motion.div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold mb-4 ${config.text} bg-black/20 backdrop-blur-sm border ${config.border}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className={`w-2 h-2 rounded-full mr-2 ${status === 'Live' ? 'bg-emerald-400 animate-pulse' : ''}`}></div>
                {status}
              </motion.div>
              
              <h1 className="text-4xl font-black text-white mb-4">{event.title}</h1>
              <p className="text-cyan-300/80 text-lg leading-relaxed">{event.description}</p>
            </div>
            
            <motion.div
              className="text-right"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-3xl font-bold gradient-text mb-2">${event.price || 0}</div>
              <p className="text-cyan-300/80">per ticket</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Event Info */}
            <motion.div
              className="glass-panel p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Event Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-cyan-400 mr-3" />
                    <div>
                      <p className="text-sm text-cyan-300/80">Start Date</p>
                      <p className="text-white font-semibold">{formatDate(event.startDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-cyan-400 mr-3" />
                    <div>
                      <p className="text-sm text-cyan-300/80">End Date</p>
                      <p className="text-white font-semibold">{formatDate(event.endDate)}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-cyan-400 mr-3" />
                    <div>
                      <p className="text-sm text-cyan-300/80">Location</p>
                      <p className="text-white font-semibold">{event.location || 'Virtual'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-cyan-400 mr-3" />
                    <div>
                      <p className="text-sm text-cyan-300/80">Capacity</p>
                      <p className="text-white font-semibold">{event.capacity || 0} attendees</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sessions */}
            {event.sessions && event.sessions.length > 0 && (
              <motion.div
                className="glass-panel p-6 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-white mb-6">Event Sessions</h2>
                <div className="space-y-4">
                  {event.sessions.map((session, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glass-panel p-4 rounded-xl"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{session.title || 'Untitled Session'}</h3>
                          <p className="text-cyan-300/80 mb-3">{session.description || 'No description provided'}</p>
                          <div className="flex items-center text-sm text-cyan-300/60">
                            <Clock className="w-4 h-4 mr-2" />
                            {formatDateTimeShort(session.startTime)}
                          </div>
                        </div>
                        <Tag className="w-5 h-5 text-cyan-400" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              className="glass-panel p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/events/${id}/edit`)}
                  className="w-full btn-primary"
                >
                  Edit Event
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/dashboard')}
                  className="w-full btn-outline"
                >
                  Back to Dashboard
                </motion.button>
              </div>
            </motion.div>

            {/* Event Stats */}
            <motion.div
              className="glass-panel p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Event Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-cyan-300/80">Status</span>
                  <span className={`font-semibold ${config.text}`}>{status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/80">Price</span>
                  <span className="text-white font-semibold">${event.price || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/80">Capacity</span>
                  <span className="text-white font-semibold">{event.capacity || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-cyan-300/80">Public</span>
                  <span className="text-white font-semibold">{event.isPublic ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </motion.div>

            {/* Share Event */}
            <motion.div
              className="glass-panel p-6 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h3 className="text-xl font-bold text-white mb-4">Share Event</h3>
              <button className="w-full btn-outline flex items-center justify-center gap-2">
                <ExternalLink size={16} />
                Share Link
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};