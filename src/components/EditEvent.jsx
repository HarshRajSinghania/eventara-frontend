import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { motion } from 'framer-motion';
import { Plus, X, Calendar, MapPin, Users, DollarSign, Clock, Image, Eye, EyeOff, Trash2, Save } from 'lucide-react';

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
    <div className="glass-panel p-6 rounded-2xl mb-4">
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
    </div>
  );
};

export const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, getToken } = useAuth();
  
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

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
          setEvent({
            title: data.title || '',
            description: data.description || '',
            startDate: data.startDate ? formatDateForInput(data.startDate) : '',
            endDate: data.endDate ? formatDateForInput(data.endDate) : '',
            location: data.location || '',
            capacity: data.capacity || '',
            price: data.price || '',
            image: data.image || '',
            sessions: data.sessions || [],
            isPublic: data.isPublic || false
          });
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

    fetchEvent();
  }, [id, userId, getToken]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().split('T')[0];
  };

  const formatDateTimeForInput = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().slice(0, 16);
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Client-side validation
    if (!event.title?.trim()) {
      setError('Title is required');
      setSaving(false);
      return;
    }
    
    if (!event.startDate) {
      setError('Start date is required');
      setSaving(false);
      return;
    }
    
    if (!event.endDate) {
      setError('End date is required');
      setSaving(false);
      return;
    }
    
    if (new Date(event.startDate) >= new Date(event.endDate)) {
      setError('End date must be after start date');
      setSaving(false);
      return;
    }
    
    try {
      const token = await getToken();
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          ...event,
          capacity: parseInt(event.capacity) || 0,
          price: parseFloat(event.price) || 0,
          image: event.image || '',
          isPublic: event.isPublic || false
        })
      });

      if (response.ok) {
        navigate(`/events/${id}`);
      } else {
        throw new Error('Failed to update event');
      }
    } catch (err) {
      console.error('Error updating event:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }, [event, id, getToken, navigate]);

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleAddSession = useCallback(() => {
    setEvent(prev => ({
      ...prev,
      sessions: [...prev.sessions, { title: '', description: '', startTime: '', endTime: '' }]
    }));
  }, []);

  const handleSessionChange = useCallback((index, field, value) => {
    setEvent(prev => {
      const newSessions = [...prev.sessions];
      newSessions[index][field] = value;
      return { ...prev, sessions: newSessions };
    });
  }, []);

  const handleRemoveSession = useCallback((index) => {
    setEvent(prev => ({
      ...prev,
      sessions: prev.sessions.filter((_, i) => i !== index)
    }));
  }, []);

  const handleDelete = useCallback(async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const token = await getToken();
        const response = await fetch(`http://localhost:3001/api/events/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          navigate('/dashboard');
        } else {
          throw new Error('Failed to delete event');
        }
      } catch (err) {
        console.error('Error deleting event:', err);
        setError(err.message);
      }
    }
  }, [id, getToken, navigate]);

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
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Edit Event</h1>
            <p className="text-cyan-300/80">Update your event details</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/events/${id}`)}
            className="btn-outline"
          >
            Cancel
          </motion.button>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="glass-panel-strong p-8 rounded-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Event Details</h2>
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

            <InputField
              icon={Image}
              label="Image URL"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={event.image}
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
          </div>

         <div className="glass-panel-strong p-8 rounded-2xl">
           <h2 className="text-2xl font-bold text-white mb-6">Event Sessions</h2>
           <p className="text-cyan-300/80 mb-6">Add individual sessions or presentations for your event</p>
           
           <div>
             {event.sessions.map((session, index) => (
               <SessionItem
                 key={`${session.id || 'session'}-${index}`}
                 session={session}
                 index={index}
                 onSessionChange={handleSessionChange}
                 onRemove={handleRemoveSession}
               />
             ))}
           </div>

           <button
             type="button"
             onClick={handleAddSession}
             className="w-full glass-panel border-2 border-dashed border-cyan-500/30 hover:border-cyan-400/50 rounded-2xl p-6 text-cyan-300 hover:text-cyan-200 transition-all duration-200"
           >
             <Plus className="w-8 h-8 mx-auto mb-2" />
             Add Session
           </button>
         </div>

         {error && (
           <div className="glass-panel border-red-500/30 p-4 rounded-2xl">
             <p className="text-red-400">{error}</p>
           </div>
         )}

         <div className="flex gap-4">
           <button
             type="submit"
             disabled={saving}
             className="btn-primary flex items-center gap-2"
           >
             <Save size={16} />
             {saving ? 'Saving...' : 'Save Changes'}
           </button>
           <button
             type="button"
             onClick={handleDelete}
             className="btn-secondary flex items-center gap-2"
           >
             <Trash2 size={16} />
             Delete Event
           </button>
         </div>
       </form>
      </div>
    </div>
  );
};