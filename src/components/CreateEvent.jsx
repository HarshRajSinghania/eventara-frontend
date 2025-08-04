import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSessionChange = (index, field, value) => {
    const newSessions = [...event.sessions];
    newSessions[index][field] = value;
    setEvent(prev => ({ ...prev, sessions: newSessions }));
  };

  const handleAddSession = () => {
    setEvent(prev => ({
      ...prev,
      sessions: [...prev.sessions, { title: '', description: '', startTime: '', endTime: '' }]
    }));
  };

  const handleRemoveSession = (index) => {
    const newSessions = event.sessions.filter((_, i) => i !== index);
    setEvent(prev => ({ ...prev, sessions: newSessions }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Client-side validation
    if (!event.title?.trim()) {
      setError('Title is required');
      setLoading(false);
      return;
    }
    
    if (!event.startDate) {
      setError('Start date is required');
      setLoading(false);
      return;
    }
    
    if (!event.endDate) {
      setError('End date is required');
      setLoading(false);
      return;
    }
    
    if (new Date(event.startDate) >= new Date(event.endDate)) {
      setError('End date must be after start date');
      setLoading(false);
      return;
    }
    
    try {
      const token = await getToken();
      
      // Prepare sessions with proper date format
      const sessions = event.sessions.length > 0 ? event.sessions.filter(s => s.title?.trim() && s.startTime && s.endTime).map(session => ({
        title: session.title.trim(),
        description: session.description?.trim() || '',
        startTime: session.startTime,
        endTime: session.endTime,
        speaker: 'TBD',
        room: 'TBD',
        tags: []
      })) : [];

      // Convert dates to ISO strings with proper timezone handling
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
          // Convert datetime-local input to UTC explicitly
          startTime: new Date(session.startTime + 'Z').toISOString(),
          endTime: new Date(session.endTime + 'Z').toISOString()
        })),
        isPublic: event.isPublic
      };

      console.log('Sending payload:', payload);

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
        console.error('Server error:', responseData);
        setError(responseData.error || responseData.message || 'Failed to create event');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cyan-100">Create New Event</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="text-cyan-300 hover:text-cyan-200"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-navy-900/40 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-cyan-300 mb-2">Title *</label>
              <input
                type="text"
                name="title"
                value={event.title}
                onChange={handleChange}
                required
                className="w-full bg-navy-800/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100"
              />
            </div>

            <div>
              <label className="block text-cyan-300 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={event.location}
                onChange={handleChange}
                className="w-full bg-navy-800/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100"
              />
            </div>

            <div>
              <label className="block text-cyan-300 mb-2">Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={event.startDate}
                onChange={handleChange}
                required
                className="w-full bg-navy-800/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100"
              />
            </div>

            <div>
              <label className="block text-cyan-300 mb-2">End Date *</label>
              <input
                type="date"
                name="endDate"
                value={event.endDate}
                onChange={handleChange}
                required
                className="w-full bg-navy-800/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100"
              />
            </div>

            <div>
              <label className="block text-cyan-300 mb-2">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={event.capacity}
                onChange={handleChange}
                min="0"
                className="w-full bg-navy-800/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100"
              />
            </div>

            <div>
              <label className="block text-cyan-300 mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={event.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="w-full bg-navy-800/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-cyan-300 mb-2">Description</label>
            <textarea
              name="description"
              value={event.description}
              onChange={handleChange}
              rows="3"
              className="w-full bg-navy-800/50 border border-cyan-500/30 rounded-lg px-3 py-2 text-cyan-100"
            />
          </div>

          <div className="mt-4">
            <label className="flex items-center text-cyan-300">
              <input
                type="checkbox"
                name="isPublic"
                checked={event.isPublic}
                onChange={handleChange}
                className="mr-2"
              />
              Make this event public (visible to everyone)
            </label>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Sessions (Optional)</h3>
            {event.sessions.map((session, index) => (
              <div key={index} className="mb-4 p-4 bg-navy-800/30 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Session Title"
                    value={session.title}
                    onChange={(e) => handleSessionChange(index, 'title', e.target.value)}
                    className="bg-navy-700/50 border border-cyan-500/30 rounded px-3 py-2 text-cyan-100"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={session.description}
                    onChange={(e) => handleSessionChange(index, 'description', e.target.value)}
                    className="bg-navy-700/50 border border-cyan-500/30 rounded px-3 py-2 text-cyan-100"
                  />
                  <input
                    type="datetime-local"
                    placeholder="Start Time"
                    value={session.startTime}
                    onChange={(e) => handleSessionChange(index, 'startTime', e.target.value)}
                    className="bg-navy-700/50 border border-cyan-500/30 rounded px-3 py-2 text-cyan-100"
                  />
                  <input
                    type="datetime-local"
                    placeholder="End Time"
                    value={session.endTime}
                    onChange={(e) => handleSessionChange(index, 'endTime', e.target.value)}
                    className="bg-navy-700/50 border border-cyan-500/30 rounded px-3 py-2 text-cyan-100"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSession(index)}
                  className="mt-2 text-red-400 hover:text-red-300 text-sm"
                >
                  Remove Session
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddSession}
              className="mt-2 bg-cyan-600/30 hover:bg-cyan-600/40 px-3 py-1 rounded text-cyan-300"
            >
              Add Session
            </button>
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-300">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-800 px-6 py-2 rounded-lg text-white font-medium"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg text-white font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};