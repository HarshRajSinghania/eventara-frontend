import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, DollarSign, Users, Zap, Heart, Award } from 'lucide-react';

export const Careers = () => {
  const jobs = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build beautiful, scalable user interfaces with React, TypeScript, and modern web technologies. Lead frontend architecture decisions.",
      salary: "$80k - $120k"
    },
    {
      title: "Backend Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Design and implement scalable backend services, APIs, and databases. Work with Node.js, PostgreSQL, and cloud technologies.",
      salary: "$85k - $125k"
    },
    {
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      description: "Create intuitive and beautiful user experiences. Conduct user research, design systems, and collaborate with engineering teams.",
      salary: "$75k - $110k"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Manage cloud infrastructure, CI/CD pipelines, and ensure high availability of our platform. Experience with AWS, Docker, Kubernetes.",
      salary: "$90k - $130k"
    }
  ];

  const benefits = [
    { icon: DollarSign, title: "Competitive Salary", description: "Above market compensation with equity" },
    { icon: Users, title: "Remote-First", description: "Work from anywhere in the world" },
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance and wellness stipend" },
    { icon: Zap, title: "Learning Budget", description: "$2,000 annual learning and development budget" },
    { icon: Award, title: "Stock Options", description: "Equity participation in the company's success" },
    { icon: Clock, title: "Flexible Hours", description: "Work when you're most productive" }
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
            <span className="gradient-text">Join Our Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300/80 max-w-4xl mx-auto">
            Help us build the future of events. We're looking for passionate people who want to make a difference.
          </p>
        </motion.div>

        {/* Why Eventara Section */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="glass-panel-strong p-8 md:p-12 rounded-2xl">
            <h2 className="text-3xl font-bold text-white mb-6">Why Eventara?</h2>
            <p className="text-lg text-cyan-100/80 leading-relaxed mb-8">
              We're building the future of event management. Join a team that's passionate about creating technology 
              that brings people together and creates meaningful experiences.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  className="glass-panel p-6 rounded-xl text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-cyan-300/80 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Open Positions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-12 text-center">Open Positions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="glass-panel-strong p-6 rounded-2xl hover:scale-105 transition-transform duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-cyan-400 font-medium">{job.department}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-cyan-300 mb-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-sm text-cyan-300">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                  </div>
                </div>
                
                <p className="text-cyan-100/80 mb-4">{job.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-cyan-300">{job.salary}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Apply Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Culture Section */}
        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-white mb-6">Our Culture</h2>
          <p className="text-xl text-cyan-100/80 max-w-3xl mx-auto">
            We believe in transparency, autonomy, and continuous learning. Join us in creating technology 
            that makes a real difference in how people connect and share experiences.
          </p>
        </motion.div>
      </div>
    </div>
  );
};