import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

export const EventCard = ({ event, onDelete, onRefresh }) => {
  const navigate = useNavigate();
  const { getToken } = useAuth();
  
  const getStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return 'Scheduled';
    if (now >= start && now <= end) return 'Live';
    return 'Ended';
  };

  const handleViewDetails = () => {
    navigate(`/events/${event._id}`);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/events/${event._id}/edit`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete "${event.title}"? This action cannot be undone.`)) {
      try {
        const token = await getToken();
        const response = await fetch(`http://localhost:3001/api/events/${event._id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (response.ok) {
          onDelete(event._id);
        } else {
          throw new Error('Failed to delete event');
        }
      } catch (err) {
        console.error('Error deleting event:', err);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const status = getStatus(event.startDate, event.endDate);
  const statusColors = {
    Live: 'from-green-400/40 to-emerald-600/30',
    Scheduled: 'from-blue-400/40 to-cyan-600/30',
    Ended: 'from-purple-400/40 to-indigo-600/30'
  };

  return (
    <div className="group relative bg-navy-800/40 backdrop-blur-sm rounded-xl p-6
      border border-cyan-500/20 hover:border-cyan-400/30 transition-all
      hover:shadow-lg hover:shadow-cyan-500/10">
      <div className={`absolute inset-0 bg-gradient-to-br ${statusColors[status]}
        rounded-xl opacity-50 -z-10`} />
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-cyan-100 mb-1">{event.title}</h3>
          <p className="text-sm text-cyan-400/80">
            {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
          </p>
          <p className="text-xs text-cyan-100/60">{event.location}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${status === 'Live' ? 'bg-green-500/20 text-green-400' :
              status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' :
              'bg-purple-500/20 text-purple-400'}`}>
            {status}
          </span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleEdit}
              className="p-1 text-cyan-300 hover:text-cyan-200"
              title="Edit Event"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-red-400 hover:text-red-300"
              title="Delete Event"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <div className="flex items-center justify-between text-cyan-300/80 text-sm">
          <span>Capacity: {event.capacity || 0}</span>
          <span>${event.price || 0}</span>
        </div>
        {event.sessions && event.sessions.length > 0 && (
          <p className="text-xs text-cyan-100/60">
            {event.sessions.length} session{event.sessions.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handleViewDetails}
          className="flex items-center hover:text-cyan-200 transition-colors text-sm text-cyan-300/80 cursor-pointer"
        >
          <span className="mr-2">View Details</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};