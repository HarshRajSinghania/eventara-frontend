import { motion } from 'framer-motion';
import { CheckCircle, Users, Calendar, BarChart3, Zap, Shield, Globe, Heart } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Smart Event Management",
      description: "Create, manage, and track events with AI-powered insights and real-time analytics.",
      color: "from-cyan-400 to-blue-400"
    },
    {
      icon: Calendar,
      title: "Seamless Scheduling",
      description: "Intelligent scheduling system that prevents conflicts and optimizes for maximum attendance.",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Deep insights into attendee behavior, engagement metrics, and event performance.",
      color: "from-emerald-400 to-cyan-400"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for speed with real-time updates and instant notifications.",
      color: "from-orange-400 to-pink-400"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption and compliance certifications.",
      color: "from-indigo-400 to-purple-400"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Support for events worldwide with multi-language and timezone capabilities.",
      color: "from-teal-400 to-cyan-400"
    }
  ];

  const advancedFeatures = [
    {
      title: "AI-Powered Insights",
      description: "Get intelligent recommendations for optimal event timing, pricing, and marketing strategies.",
      icon: Zap
    },
    {
      title: "Real-time Collaboration",
      description: "Work together with your team in real-time with live editing and instant updates.",
      icon: Users
    },
    {
      title: "Custom Branding",
      description: "Fully white-label solution with custom domains, colors, and branding options.",
      icon: Heart
    },
    {
      title: "Advanced Integrations",
      description: "Connect with 1000+ tools including Slack, Zoom, Stripe, and marketing platforms.",
      icon: Calendar
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Powerful Features</span>
            <br />
            <span className="text-white">for Modern Events</span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300/80 max-w-4xl mx-auto">
            Everything you need to create, manage, and scale successful events with confidence
          </p>
        </motion.div>

        {/* Core Features */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="group glass-panel-strong p-8 rounded-2xl hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-cyan-300/80 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Advanced Features */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Advanced Capabilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-panel p-6 rounded-2xl"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center mr-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{feature.title}</h3>
                  </div>
                </div>
                <p className="text-cyan-300/80">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="glass-panel-strong p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-cyan-300/80 mb-8">
              Join thousands of event organizers who trust Eventara for their events
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary text-lg px-8 py-4"
            >
              Start Your Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};