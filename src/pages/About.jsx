import { motion } from 'framer-motion';
import { Users, Lightbulb, Globe, Shield, Heart, Target, Zap, Award } from 'lucide-react';

export const About = () => {
  const team = [
    {
      name: "Harsh Raj Singhania",
      role: "Creator & Lead Developer",
      bio: "Full-stack developer passionate about creating technology that brings people together",
      image: "👨‍💻",
      social: "🚀"
    }
  ];

  const values = [
    {
      title: "Community First",
      description: "Building strong communities through shared experiences and meaningful connections",
      icon: Users,
      color: "from-cyan-400 to-blue-400"
    },
    {
      title: "Innovation",
      description: "Pushing boundaries with cutting-edge technology for better event experiences",
      icon: Lightbulb,
      color: "from-purple-400 to-pink-400"
    },
    {
      title: "Accessibility",
      description: "Making event creation and discovery accessible to everyone, everywhere",
      icon: Globe,
      color: "from-emerald-400 to-cyan-400"
    },
    {
      title: "Reliability",
      description: "Providing dependable tools that organizers can trust 24/7",
      icon: Shield,
      color: "from-orange-400 to-pink-400"
    }
  ];

  const stats = [
    { value: "10K+", label: "Events Created", icon: Award },
    { value: "50K+", label: "Happy Attendees", icon: Heart },
    { value: "25+", label: "Countries Served", icon: Globe },
    { value: "99.9%", label: "Uptime", icon: Zap }
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
            <span className="gradient-text">About Eventara</span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300/80 max-w-4xl mx-auto leading-relaxed">
            We're on a mission to make event creation and discovery seamless,
            bringing communities together through meaningful experiences.
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-panel-strong p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
            <div className="space-y-4 text-lg text-cyan-100/80 leading-relaxed">
              <p>
                Eventara was born from a simple observation: creating and managing events shouldn't be complicated.
                Founded in 2025, we started as a small team passionate about bringing people together.
              </p>
              <p>
                What began as a solution for local meetups has evolved into a comprehensive platform
                serving thousands of event organizers worldwide. From intimate workshops to large-scale conferences,
                we provide the tools to create memorable experiences.
              </p>
              <p>
                Today, Eventara powers events across multiple continents, helping organizers focus on what matters most:
                creating meaningful connections and unforgettable experiences.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-panel p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center`}>
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-cyan-300/80">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Creator Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Meet the Creator</h2>
          <div className="flex justify-center">
            <motion.div
              className="glass-panel-strong p-8 rounded-2xl text-center max-w-md"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="text-8xl mb-6"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                {team[0].image}
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">{team[0].name}</h3>
              <p className="text-cyan-400 mb-4 text-lg">{team[0].role}</p>
              <p className="text-cyan-100/80 mb-4">{team[0].bio}</p>
              <div className="text-2xl">{team[0].social}</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">By the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                className="glass-panel p-6 rounded-2xl text-center"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-cyan-300/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
          <p className="text-xl md:text-2xl text-cyan-100/80 max-w-4xl mx-auto leading-relaxed">
            To empower event organizers with powerful, intuitive tools that bring communities together
            and create lasting memories through shared experiences.
          </p>
        </motion.div>
      </div>
    </div>
  );
};