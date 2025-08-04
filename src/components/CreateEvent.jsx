import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Calendar, MapPin, Users, DollarSign, Clock, Image, Eye, EyeOff } from 'lucide-react';

// Moved InputField and TextAreaField outside the component to prevent re-creation
const InputField = ({ icon: Icon, label, name, type = 'text', placeholder, required = false, value, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-cyan-300">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full pl-10 pr-4 py-3 bg-navy-800/50 border border-cyan-500/30 rounded-xl text-cyan-100 placeholder-cyan-500/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
      />
    </div>
  </div>
);

const TextAreaField = ({ icon: Icon, label, name, placeholder, value, onChange, rows = 3 }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-cyan-300">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full pl-10 pr-4 py-3 bg-navy-800/50 border border-cyan-500/30 rounded-xl text-cyan-100 placeholder-cyan-500/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
      />
    </div>
  </div>
);

// Session component to prevent re-renders
const SessionItem = ({ session, index, onSessionChange, onRemove }) => {
  const handleTitleChange = useCallback((e) => onSessionChange(index, 'title', e.target.value), [index, onSessionChange]);
  const handleDescChange = useCallback((e) => onSessionChange(index, 'description', e.target.value), [index, onSessionChange]);
  const handleStartChange = useCallback((e) => onSessionChange(index, 'startTime', e.target.value), [index, onSessionChange]);
  const handleEndChange = useCallback((e) => onSessionChange(index, 'endTime', e.target.value), [index, onSessionChange]);
  const handleRemove = useCallback(() => onRemove(index), [index, onRemove]);

  return (
    <motion.div
      key={`session-${session.tempId || index}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-panel p-6 rounded-2xl mb-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          icon={Calendar}
          label="Session Title"
          name={`session-title-${index}`}
          placeholder="Session title"
          value={session.title}
          onChange={handleTitleChange}
        />
        <InputField
          icon={Calendar}
          label="Description"
          name={`session-desc-${index}`}
          placeholder="Brief description"
          value={session.description}
          onChange={handleDescChange}
        />
        <InputField
          icon={Clock}
          label="Start Time"
          name={`session-start-${index}`}
          type="datetime-local"
          value={session.startTime}
          onChange={handleStartChange}
        />
        <InputField
          icon={Clock}
          label="End Time"
          name={`session-end-${index}`}
          type="datetime-local"
          value={session.endTime}
          onChange={handleEndChange}
        />
      </div>
      <button
        type="button"
        onClick={handleRemove}
        className="mt-4 text-red-400 hover:text-red-300 flex items-center gap-2"
      >
        <X size={16} />
        Remove Session
      </button>
    </motion.div>
  );
};

export const CreateEvent = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  
  const [event, setEvent] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    capacity: '',
    price: '',
    image: '',
    sessions: [],
    isPublic: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSessionChange = useCallback((index, field, value) => {
    setEvent(prev => {
      const newSessions = [...prev.sessions];
      newSessions[index][field] = value;
      return { ...prev, sessions: newSessions };
    });
  }, []);

  const handleAddSession = useCallback(() => {
    setEvent(prev => ({
      ...prev,
      sessions: [...prev.sessions, {
        title: '',
        description: '',
        startTime: '',
        endTime: '',
        tempId: Date.now()
      }]
    }));
  }, []);

  const handleRemoveSession = useCallback((index) => {
    setEvent(prev => ({
      ...prev,
      sessions: prev.sessions.filter((_, i) => i !== index)
    }));
  }, []);

  const validateStep = useCallback(() => {
    switch(step) {
      case 1:
        if (!event.title?.trim()) {
          setError('Title is required');
          return false;
        }
        if (!event.startDate) {
          setError('Start date is required');
          return false;
        }
        if (!event.endDate) {
          setError('End date is required');
          return false;
        }
        if (new Date(event.startDate) >= new Date(event.endDate)) {
          setError('End date must be after start date');
          return false;
        }
        break;
      case 2:
        if (event.sessions.some(session => session.title && (!session.startTime || !session.endTime))) {
          setError('Please complete session times for titled sessions');
          return false;
        }
        break;
    }
    setError(null);
    return true;
  }, [event.title, event.startDate, event.endDate, event.sessions, step]);

  const nextStep = useCallback(() => {
    if (validateStep()) {
      setStep(prev => prev + 1);
    }
  }, [validateStep]);

  const prevStep = useCallback(() => setStep(prev => prev - 1), []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const token = await getToken();
      
      const sessions = event.sessions.length > 0 ? event.sessions.filter(s => s.title?.trim() && s.startTime && s.endTime).map(session => ({
        title: session.title.trim(),
        description: session.description?.trim() || '',
        startTime: session.startTime,
        endTime: session.endTime,
        speaker: 'TBD',
        room: 'TBD',
        tags: []
      })) : [];

      const payload = {
        title: event.title.trim(),
        description: event.description?.trim() || '',
        startDate: new Date(event.startDate + 'T00:00:00').toISOString(),
        endDate: new Date(event.endDate + 'T23:59:59.999').toISOString(),
        location: event.location?.trim() || 'TBD',
        capacity: parseInt(event.capacity) || 0,
        price: parseFloat(event.price) || 0,
        image: event.image?.trim() || '',
        sessions: sessions.map(session => ({
          ...session,
          startTime: new Date(session.startTime + 'Z').toISOString(),
          endTime: new Date(session.endTime + 'Z').toISOString()
        })),
        isPublic: event.isPublic
      };

      const response = await fetch('http://localhost:3001/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      const responseData = await response.json();
      
      if (response.ok) {
        navigate(`/events/${responseData.event._id}`);
      } else {
        setError(responseData.error || responseData.message || 'Failed to create event');
      }
    } catch (err) {
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  }, [event, getToken, navigate]);

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          icon={Calendar}
          label="Event Title *"
          name="title"
          placeholder="Enter event title"
          required
          value={event.title}
          onChange={handleChange}
        />
        <InputField
          icon={MapPin}
          label="Location"
          name="location"
          placeholder="Enter event location"
          value={event.location}
          onChange={handleChange}
        />
        <InputField
          icon={Calendar}
          label="Start Date *"
          name="startDate"
          type="date"
          required
          value={event.startDate}
          onChange={handleChange}
        />
        <InputField
          icon={Calendar}
          label="End Date *"
          name="endDate"
          type="date"
          required
          value={event.endDate}
          onChange={handleChange}
        />
        <InputField
          icon={Users}
          label="Capacity"
          name="capacity"
          type="number"
          placeholder="Maximum attendees"
          value={event.capacity}
          onChange={handleChange}
        />
        <InputField
          icon={DollarSign}
          label="Price ($)"
          name="price"
          type="number"
          placeholder="Ticket price"
          value={event.price}
          onChange={handleChange}
        />
      </div>
      
      <TextAreaField
        icon={Calendar}
        label="Description"
        name="description"
        placeholder="Describe your event..."
        value={event.description}
        onChange={handleChange}
      />

      <div className="flex items-center space-x-3">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            name="isPublic"
            checked={event.isPublic}
            onChange={handleChange}
            className="sr-only"
          />
          <div className={`relative w-14 h-8 rounded-full transition-colors duration-200 ${event.isPublic ? 'bg-cyan-500' : 'bg-navy-700'}`}>
            <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ${event.isPublic ? 'translate-x-6' : ''}`} />
          </div>
          <span className="ml-3 text-cyan-300 flex items-center">
            {event.isPublic ? <Eye className="w-4 h-4 mr-1" /> : <EyeOff className="w-4 h-4 mr-1" />}
            {event.isPublic ? 'Public Event' : 'Private Event'}
          </span>
        </label>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-bold text-white mb-4">Event Sessions</h3>
        <p className="text-cyan-300/80 mb-6">Add individual sessions or presentations for your event</p>
        
        <AnimatePresence>
          {event.sessions.map((session, index) => (
            <SessionItem
              key={session.tempId || index}
              session={session}
              index={index}
              onSessionChange={handleSessionChange}
              onRemove={handleRemoveSession}
            />
          ))}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={handleAddSession}
          className="w-full glass-panel border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/50 rounded-2xl p-6 text-cyan-300 hover:text-cyan-200 transition-all duration-200"
        >
          <Plus className="w-8 h-8 mx-auto mb-2" />
          Add Session
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Create New Event</h1>
            <p className="text-cyan-300/80">Step {step} of 2</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="btn-outline"
          >
            Cancel
          </motion.button>
        </motion.div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-cyan-500 text-white' : 'bg-navy-700 text-cyan-300'}`}>
              1
            </div>
            <div className={`w-16 h-1 ${step >= 2 ? 'bg-cyan-500' : 'bg-navy-700'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-cyan-500 text-white' : 'bg-navy-700 text-cyan-300'}`}>
              2
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            {step === 1 ? renderStep1() : renderStep2()}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-panel border-red-500/30 p-4 rounded-2xl"
            >
              <p className="text-red-400">{error}</p>
            </motion.div>
          )}

          <div className="flex justify-between">
            {step > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={prevStep}
                className="btn-outline"
              >
                Previous
              </motion.button>
            )}
            
            <div className="flex-1" />
            
            {step < 2 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={nextStep}
                className="btn-primary"
              >
                Next Step
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Creating Event...' : 'Create Event'}
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};