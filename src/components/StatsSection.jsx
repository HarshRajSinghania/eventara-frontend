import { motion } from 'framer-motion';
import { Users, Calendar, Shield, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const stats = [
    {
      value: "50K+",
      label: "Active Users",
      icon: Users,
      color: "from-cyan-400 to-blue-400",
      description: "Trusted by thousands worldwide"
    },
    {
      value: "1M+",
      label: "Events Hosted",
      icon: Calendar,
      color: "from-purple-400 to-pink-400",
      description: "Successfully delivered events"
    },
    {
      value: "99.9%",
      label: "Uptime",
      icon: Shield,
      color: "from-emerald-400 to-cyan-400",
      description: "Reliable platform availability"
    },
    {
      value: "150+",
      label: "Countries",
      icon: Globe,
      color: "from-orange-400 to-pink-400",
      description: "Global reach and impact"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="stats" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="gradient-text">Trusted by Millions</span>
            <br />
            <span className="text-white">Worldwide</span>
          </h2>
          <p className="text-xl text-cyan-300/80 max-w-3xl mx-auto">
            Join thousands of event organizers who rely on our platform to create memorable experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="glass-panel-strong p-8 rounded-2xl text-center border border-cyan-500/20 hover:border-cyan-400/30 transition-all duration-300">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <motion.div
                  className="text-5xl font-black mb-3"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <span className={`bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </span>
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-2">{stat.label}</h3>
                <p className="text-cyan-300/80 text-sm">{stat.description}</p>
                
                {/* Hover effect */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br ${stat.color} blur-xl`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-xl text-cyan-300/80 mb-8">
            Ready to join thousands of successful event organizers?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-lg px-8 py-4"
          >
            Start Your Journey Today
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};