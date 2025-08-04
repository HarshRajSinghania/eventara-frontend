import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export const PrivacyPolicy = () => {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Personal information (name, email, phone)",
        "Event details and preferences",
        "Payment and billing information",
        "Usage data and analytics",
        "Device and browser information"
      ]
    },
    {
      icon: Lock,
      title: "How We Use Your Information",
      content: [
        "Create and manage your events",
        "Process payments and transactions",
        "Send important notifications",
        "Improve our services",
        "Prevent fraud and abuse"
      ]
    },
    {
      icon: Eye,
      title: "Data Protection",
      content: [
        "End-to-end encryption for sensitive data",
        "Regular security audits and updates",
        "Access controls and authentication",
        "Secure data storage and backup",
        "Compliance with GDPR and CCPA"
      ]
    },
    {
      icon: FileText,
      title: "Your Rights",
      content: [
        "Access your personal information",
        "Correct inaccurate data",
        "Delete your account and data",
        "Opt-out of marketing communications",
        "Export your data"
      ]
    }
  ];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Privacy Policy</span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300/80 max-w-4xl mx-auto">
            Your privacy matters to us. Learn how we protect your data and respect your rights.
          </p>
        </motion.div>

        {/* Last Updated */}
        <motion.div 
          className="glass-panel p-6 rounded-2xl mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-cyan-300/80">Last updated: August 4, 2025</p>
        </motion.div>

        {/* Introduction */}
        <motion.div 
          className="glass-panel-strong p-8 rounded-2xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Our Commitment to Privacy</h2>
          <p className="text-cyan-100/80 leading-relaxed mb-4">
            At Eventara, we take your privacy seriously. This Privacy Policy explains how we collect, use, 
            disclose, and safeguard your information when you use our event management platform.
          </p>
          <p className="text-cyan-100/80">
            By using our services, you agree to the collection and use of information in accordance with this policy.
          </p>
        </motion.div>

        {/* Privacy Sections */}
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
            className="mb-8"
          >
            <div className="glass-panel-strong p-8 rounded-2xl">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-400 flex items-center justify-center mr-4">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 + idx * 0.1 }}
                    className="text-cyan-100/80 flex items-start"
                  >
                    <span className="text-cyan-400 mr-3 mt-1">•</span>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}

        {/* Contact Section */}
        <motion.div 
          className="glass-panel-strong p-8 rounded-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
          <p className="text-cyan-100/80 mb-4">
            If you have questions about this Privacy Policy or your data, please contact us:
          </p>
          <div className="space-y-2 text-cyan-100/80">
            <p>Email: raj.harshraut@gmail.com</p>
            <p>Address: Eventara Technologies, Patna, Bihar, India - 800012</p>
            <p>Phone: +91 94724 00429</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};