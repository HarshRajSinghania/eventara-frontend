import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EventCard } from './EventCard';

export const Dashboard = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [publicEvents, setPublicEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12">
        <div className="text-center text-cyan-300">Loading your events...</div>
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
    <div className="max-w-7xl mx-auto py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-cyan-300">
          Welcome back, {user?.firstName || 'Valued User'}
        </h2>
        <button
          onClick={() => navigate('/create-event')}
          className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white font-medium"
        >
          Create New Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h3 className="text-2xl font-semibold text-cyan-300 mb-4">Your Events</h3>
          {events.length === 0 ? (
            <div className="bg-navy-900/40 p-8 rounded-xl border border-cyan-500/20 text-center">
              <p className="text-cyan-100/60 mb-4">No events created yet</p>
              <button
                onClick={() => navigate('/create-event')}
                className="bg-cyan-600/30 hover:bg-cyan-600/40 px-4 py-2 rounded-lg border border-cyan-400/30 text-cyan-300"
              >
                Create Your First Event
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {events.map(event => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}

          {/* Events For You Section */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-cyan-300 mb-4">Events For You</h3>
            {publicEvents.length === 0 ? (
              <div className="bg-navy-900/40 p-6 rounded-xl border border-cyan-500/20">
                <p className="text-cyan-100/60">No public events available at the moment</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {publicEvents.map(event => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-navy-900/40 p-6 rounded-xl border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Event Analytics</h3>
            <div className="space-y-3">
              <div>
                <p className="text-cyan-100/60 text-sm">Total Events</p>
                <p className="text-2xl font-bold text-cyan-300">{events.length}</p>
              </div>
              <div>
                <p className="text-cyan-100/60 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold text-cyan-300">
                  {events.reduce((total, event) => total + (event.sessions?.length || 0), 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-navy-900/40 p-6 rounded-xl border border-cyan-500/20">
            <h3 className="text-xl font-semibold text-cyan-300 mb-4">Quick Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-cyan-100/60">Active Events</span>
                <span className="text-cyan-300">{events.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-cyan-100/60">Total Capacity</span>
                <span className="text-cyan-300">
                  {events.reduce((total, event) => total + (event.capacity || 0), 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};