import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Client-side validation
    if (!event.title?.trim()) {
      setError('Title is required');
      return;
    }
    
    if (!event.startDate) {
      setError('Start date is required');
      return;
    }
    
    if (!event.endDate) {
      setError('End date is required');
      return;
    }
    
    if (new Date(event.startDate) >= new Date(event.endDate)) {
      setError('End date must be after start date');
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
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddSession = () => {
    setEvent(prev => ({
      ...prev,
      sessions: [...prev.sessions, { title: '', description: '', startTime: '', endTime: '' }]
    }));
  };

  const handleSessionChange = (index, field, value) => {
    const newSessions = [...event.sessions];
    newSessions[index][field] = value;
    setEvent(prev => ({ ...prev, sessions: newSessions }));
  };

  const handleRemoveSession = (index) => {
    const newSessions = event.sessions.filter((_, i) => i !== index);
    setEvent(prev => ({ ...prev, sessions: newSessions }));
  };

  const handleDelete = async () => {
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
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center text-cyan-300">Loading event...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-cyan-100">Edit Event</h1>
        <button
          onClick={() => navigate(`/events/${id}`)}
          className="text-cyan-300 hover:text-cyan-200"
        >
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-navy-900/40 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-cyan-300 mb-2">Title</label>
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
              <label className="block text-cyan-300 mb-2">Start Date</label>
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
              <label className="block text-cyan-300 mb-2">End Date</label>
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
              <label className="block text-cyan-300 mb-2">Price</label>
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
            <label className="block text-cyan-300 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={event.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
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
                    value={session.startTime ? formatDateTimeForInput(session.startTime) : ''}
                    onChange={(e) => handleSessionChange(index, 'startTime', e.target.value)}
                    className="bg-navy-700/50 border border-cyan-500/30 rounded px-3 py-2 text-cyan-100"
                  />
                  <input
                    type="datetime-local"
                    placeholder="End Time"
                    value={session.endTime ? formatDateTimeForInput(session.endTime) : ''}
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
        </div>

        {error && (
          <div className="bg-red-900/40 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg text-white font-medium"
          >
            Update Event
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg text-white font-medium"
          >
            Delete Event
          </button>
        </div>
      </form>
    </div>
  );
};