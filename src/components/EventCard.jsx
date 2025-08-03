export const EventCard = ({ event }) => {
  const statusColors = {
    Live: 'from-green-400/40 to-emerald-600/30',
    Scheduled: 'from-blue-400/40 to-cyan-600/30',
    Ended: 'from-purple-400/40 to-indigo-600/30'
  };

  return (
    <div className="group relative bg-navy-800/40 backdrop-blur-sm rounded-xl p-6
      border border-cyan-500/20 hover:border-cyan-400/30 transition-all
      hover:shadow-lg hover:shadow-cyan-500/10">
      <div className={`absolute inset-0 bg-gradient-to-br ${statusColors[event.status]} 
        rounded-xl opacity-50 -z-10`} />
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-cyan-100 mb-2">{event.title}</h3>
          <p className="text-sm text-cyan-400/80">{new Date(event.date).toDateString()}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium
          ${event.status === 'Live' ? 'bg-green-500/20 text-green-400' : 
            event.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' :
            'bg-purple-500/20 text-purple-400'}`}>
          {event.status}
        </span>
      </div>
      
      <div className="mt-4 flex items-center justify-between text-cyan-300/80 text-sm">
        <span>{event.participants} participants</span>
        <button className="flex items-center hover:text-cyan-200 transition-colors">
          <span className="mr-2">Manage Event</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};