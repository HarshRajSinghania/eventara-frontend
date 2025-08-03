import { EventCard } from './EventCard';

export const Dashboard = () => {
  const events = [
    { 
      title: 'Product Launch 2023',
      date: '2023-11-15',
      status: 'Live',
      participants: 142
    },
    {
      title: 'Q4 Strategy Meeting',
      date: '2023-12-01',
      status: 'Scheduled',
      participants: 45
    }
  ];

  return (
    <div className="flex-1 p-8 space-y-8">
      {/* Today's Schedule Section */}
      <div className="glass-panel p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-cyan-300 mb-4">Today's Schedule</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-navy-700/30 rounded-lg">
            <span className="text-cyan-100">9:00 AM - Keynote Speech</span>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm">
              Join Now →
            </button>
          </div>
        </div>
      </div>

      {/* My Events Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event) => (
          <EventCard key={event.title} event={event} />
        ))}
      </div>

      {/* Analytics Snapshot */}
      <div className="glass-panel p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-cyan-300 mb-6">Analytics Snapshot</h2>
        <div className="h-64 bg-navy-700/20 rounded-xl border border-cyan-500/20">
          {/* Chart placeholder */}
          <div className="flex items-center justify-center h-full text-cyan-500/50">
            Analytics Chart Component
          </div>
        </div>
      </div>
    </div>
  );
};