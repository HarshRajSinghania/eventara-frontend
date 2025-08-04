import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

export const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userId, getToken } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      console.log('EventDetails: Starting fetch for event ID:', id);
      
      try {
        const token = await getToken();
        console.log('EventDetails: Token obtained:', token ? 'Yes' : 'No');
        
        const response = await fetch(`http://localhost:3001/api/events/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        console.log('EventDetails: Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('EventDetails: Data received:', data);
          setEvent(data);
        } else {
          const errorText = await response.text();
          console.error('EventDetails: Error response:', response.status, errorText);
          setError(`Server error: ${response.status} - ${errorText}`);
        }
      } catch (err) {
        console.error('EventDetails: Fetch error:', err);
        setError(`Network error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchEvent();
    } else {
      console.log('EventDetails: No user ID, skipping fetch');
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center text-cyan-300">Loading event details...</div>
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

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center text-cyan-300">No event data available</div>
      </div>
    );
  }

  const status = getStatus(event.startDate, event.endDate);
  const statusColors = {
    Live: 'from-green-400/40 to-emerald-600/30',
    Scheduled: 'from-blue-400/40 to-cyan-600/30',
    Ended: 'from-purple-400/40 to-indigo-600/30',
    Unknown: 'from-gray-400/40 to-gray-600/30'
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <button
        onClick={() => navigate('/dashboard')}
        className="mb-6 text-cyan-300 hover:text-cyan-200 flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      <div className="bg-navy-900/40 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
        <div className={`absolute inset-0 bg-gradient-to-br ${statusColors[status]} rounded-xl opacity-20 -z-10`} />
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-cyan-100 mb-2">{event.title}</h1>
            <p className="text-cyan-300/80">{event.description}</p>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium
            ${status === 'Live' ? 'bg-green-500/20 text-green-400' :
              status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' :
              status === 'Ended' ? 'bg-purple-500/20 text-purple-400' :
              'bg-gray-500/20 text-gray-400'}`}>
            {status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Event Details</h3>
            <div className="space-y-3">
              <div>
                <span className="text-cyan-100/60">Location:</span>
                <span className="text-cyan-300 ml-2">{event.location || 'N/A'}</span>
              </div>
              <div>
                <span className="text-cyan-100/60">Start Date:</span>
                <span className="text-cyan-300 ml-2">{formatDate(event.startDate)}</span>
              </div>
              <div>
                <span className="text-cyan-100/60">End Date:</span>
                <span className="text-cyan-300 ml-2">{formatDate(event.endDate)}</span>
              </div>
              <div>
                <span className="text-cyan-100/60">Capacity:</span>
                <span className="text-cyan-300 ml-2">{event.capacity || 0}</span>
              </div>
              <div>
                <span className="text-cyan-100/60">Price:</span>
                <span className="text-cyan-300 ml-2">${event.price || 0}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Sessions</h3>
            {event.sessions && event.sessions.length > 0 ? (
              <div className="space-y-3">
                {event.sessions.map((session, index) => (
                  <div key={index} className="bg-navy-800/40 p-4 rounded-lg border border-cyan-500/20">
                    <h4 className="text-cyan-200 font-medium">{session.title || 'Untitled Session'}</h4>
                    <p className="text-sm text-cyan-300/80">{session.description || 'No description'}</p>
                    <p className="text-xs text-cyan-100/60 mt-2">
                      {formatDateTime(session.startTime)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-cyan-100/60">No sessions scheduled</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};