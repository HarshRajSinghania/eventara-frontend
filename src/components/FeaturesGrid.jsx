import { motion } from 'framer-motion';
import { useState } from 'react';

export const FeaturesGrid = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const features = [
    {
      title: "Immersive Events",
      description: "Create fully branded virtual environments with custom booths and stages",
      icon: "🎤",
      color: "from-cyan-400 to-blue-400",
      glow: "shadow-cyan-500/30"
    },
    {
      title: "Real-time Interaction",
      description: "Live Q&A, polls, and networking lounges with WebRTC integration",
      icon: "💬",
      color: "from-purple-400 to-pink-400",
      glow: "shadow-purple-500/30"
    },
    {
      title: "Analytics Dashboard",
      description: "Track attendance, engagement, and event performance in real-time",
      icon: "📊",
      color: "from-emerald-400 to-cyan-400",
      glow: "shadow-emerald-500/30"
    },
    {
      title: "Custom Branding",
      description: "Full control over colors, logos, and styling with our design system",
      icon: "🎨",
      color: "from-orange-400 to-pink-400",
      glow: "shadow-orange-500/30"
    },
    {
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations and predictive analytics for your events",
      icon: "🤖",
      color: "from-violet-400 to-purple-400",
      glow: "shadow-violet-500/30"
    },
    {
      title: "Global Scale",
      description: "Host events for thousands of attendees across multiple time zones",
      icon: "🌍",
      color: "from-indigo-400 to-purple-400",
      glow: "shadow-indigo-500/30"
    },
    {
      title: "Security First",
      description: "Enterprise-grade security with end-to-end encryption and compliance",
      icon: "🔒",
      color: "from-red-400 to-pink-400",
      glow: "shadow-red-500/30"
    },
    {
      title: "24/7 Support",
      description: "Round-the-clock support with dedicated event success managers",
      icon: "🎧",
      color: "from-teal-400 to-cyan-400",
      glow: "shadow-teal-500/30"
    }
  ];

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="gradient-text">Powerful Features</span>
            <br />
            <span className="text-white">for Modern Events</span>
          </h2>
          <p className="text-xl text-cyan-300/80 max-w-3xl mx-auto">
            Everything you need to create, manage, and scale your virtual events with confidence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative glass-panel-strong p-8 rounded-2xl border transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <motion.div
                  className="text-5xl mb-6"
                  animate={{
                    scale: hoveredIndex === index ? 1.1 : 1,
                    rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-cyan-300/80 leading-relaxed">{feature.description}</p>
                
                <motion.div
                  className="mt-4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${feature.glow} blur-xl`} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-xl text-cyan-300/80 mb-8">
            Ready to transform your events?
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Start Your Free Trial
          </button>
        </motion.div>
      </div>
    </section>
  );
};