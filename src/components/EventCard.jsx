import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useState } from 'react';
import { Calendar, MapPin, Users, DollarSign, Edit3, Trash2, Eye } from 'lucide-react';

export const EventCard = ({ event, onDelete, onRefresh }) => {
  const navigate = useNavigate();
  const { getToken, userId } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  
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
    }
  };

  const config = statusConfig[status];

  return (
    <div
      className="group relative glass-panel-strong p-6 rounded-2xl border transition-all duration-300 cursor-pointer card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleViewDetails}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${config.bg} rounded-2xl opacity-60`} />
      <div className={`absolute inset-0 rounded-2xl border-2 ${config.border} opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${config.glow}`} />
      
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span className={`px-3 py-1 rounded-full text-sm font-bold ${config.text} bg-black/20 backdrop-blur-sm border ${config.border}`}>
          {status}
        </span>
      </div>
      
      <div className="relative z-10">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{event.title}</h3>
          <p className="text-sm text-cyan-300/80 flex items-center gap-2">
            <Calendar size={14} />
            {new Date(event.startDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          <p className="text-xs text-cyan-300/60 flex items-center gap-2 mt-1">
            <MapPin size={12} />
            {event.location}
          </p>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-300/80 flex items-center gap-2">
              <Users size={14} />
              Capacity
            </span>
            <span className="text-white font-semibold">{event.capacity || 0}</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span className="text-cyan-300/80 flex items-center gap-2">
              <DollarSign size={14} />
              Price
            </span>
            <span className="text-white font-semibold">${event.price || 0}</span>
          </div>
          
          {event.sessions && event.sessions.length > 0 && (
            <div className="text-xs text-cyan-300/60">
              {event.sessions.length} session{event.sessions.length !== 1 ? 's' : ''} included
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
          <button
            onClick={handleViewDetails}
            className="flex items-center gap-2 text-cyan-300 hover:text-cyan-100 transition-colors duration-200"
          >
            <Eye size={16} />
            <span className="text-sm font-medium">View Details</span>
          </button>
          
          <div className={`flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}>
            <button
              onClick={handleEdit}
              className="p-2 text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/20 rounded-lg transition-all duration-200"
              title="Edit Event"
            >
              <Edit3 size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-lg transition-all duration-200"
              title="Delete Event"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};