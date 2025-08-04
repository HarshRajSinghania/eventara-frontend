import { motion } from 'framer-motion';
import { TrendingUp, Users, Calendar, DollarSign, BarChart3, Award } from 'lucide-react';

export const Stats = () => {
  const stats = [
    { label: "Total Events", value: "1,247", icon: Calendar, color: "from-cyan-400 to-blue-400" },
    { label: "Active Users", value: "8,932", icon: Users, color: "from-purple-400 to-pink-400" },
    { label: "Total Revenue", value: "$45,230", icon: DollarSign, color: "from-emerald-400 to-cyan-400" },
    { label: "Success Rate", value: "98.7%", icon: Award, color: "from-orange-400 to-pink-400" }
  ];

  const recentEvents = [
    { title: "Tech Conference 2025", attendees: 450, revenue: "$12,500", status: "Completed" },
    { title: "Startup Meetup", attendees: 120, revenue: "$3,200", status: "Live" },
    { title: "Design Workshop", attendees: 75, revenue: "$1,800", status: "Scheduled" },
    { title: "Product Launch", attendees: 280, revenue: "$8,900", status: "Completed" }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Platform Statistics</span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300/80 max-w-4xl mx-auto">
            Real-time insights into our growing event platform
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="glass-panel-strong p-6 rounded-2xl text-center"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <motion.div 
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-cyan-300/80">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Events */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Recent Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recentEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-panel p-6 rounded-2xl"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{event.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      event.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                      event.status === 'Scheduled' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {event.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-cyan-300/80">Attendees</span>
                    <span className="text-white font-semibold">{event.attendees}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-cyan-300/80">Revenue</span>
                    <span className="text-white font-semibold">{event.revenue}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Growth Chart */}
        <motion.div 
          className="glass-panel-strong p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Monthly Growth</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-xl text-center">
              <TrendingUp className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">+23%</h3>
              <p className="text-cyan-300/80">Event Growth</p>
            </div>
            <div className="glass-panel p-6 rounded-xl text-center">
              <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">+45%</h3>
              <p className="text-cyan-300/80">User Growth</p>
            </div>
            <div className="glass-panel p-6 rounded-xl text-center">
              <BarChart3 className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">+67%</h3>
              <p className="text-cyan-300/80">Revenue Growth</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};