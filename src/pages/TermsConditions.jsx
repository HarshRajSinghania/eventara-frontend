import { motion } from 'framer-motion';
import { FileText, Shield, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export const TermsConditions = () => {
  const sections = [
    {
      icon: Shield,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using Eventara, you agree to be bound by these Terms and Conditions.",
        "If you disagree with any part of these terms, you may not use our services.",
        "We may modify these terms at any time, and continued use constitutes acceptance of changes.",
        "Users must be at least 18 years old to use our services."
      ]
    },
    {
      icon: FileText,
      title: "Use of Service",
      content: [
        "You are responsible for maintaining the confidentiality of your account.",
        "You agree to provide accurate and complete information when creating events.",
        "You may not use our services for any illegal or unauthorized purpose.",
        "You are responsible for all activities that occur under your account.",
        "We reserve the right to suspend or terminate accounts for violations."
      ]
    },
    {
      icon: Clock,
      title: "Event Management",
      content: [
        "Event organizers are responsible for the accuracy of event information.",
        "We reserve the right to remove events that violate our policies.",
        "Event organizers are responsible for managing attendee registrations.",
        "All ticket sales and payments are processed through secure third-party providers.",
        "Eventara is not responsible for disputes between organizers and attendees."
      ]
    },
    {
      icon: AlertCircle,
      title: "Intellectual Property",
      content: [
        "All content you create remains your intellectual property.",
        "By posting content, you grant us a license to display and distribute it.",
        "You may not use our trademarks without written permission.",
        "We respect intellectual property rights and respond to infringement claims.",
        "Unauthorized use may result in account termination."
      ]
    },
    {
      icon: CheckCircle,
      title: "Limitation of Liability",
      content: [
        "Eventara is provided 'as is' without warranties of any kind.",
        "We are not liable for any damages arising from use of our services.",
        "We are not responsible for event cancellations or disputes.",
        "Our total liability is limited to the amount paid for our services.",
        "Users agree to indemnify Eventara against claims."
      ]
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      content: [
        "We implement industry-standard security measures.",
        "Your data is encrypted in transit and at rest.",
        "We comply with GDPR, CCPA, and other privacy regulations.",
        "Regular security audits and updates are performed.",
        "Users can request data deletion at any time."
      ]
    },
    {
      icon: Clock,
      title: "Payment & Fees",
      content: [
        "Eventara may charge fees for certain premium features.",
        "All fees are clearly displayed before purchase.",
        "Refunds are processed according to our refund policy.",
        "We may change pricing with reasonable notice.",
        "Users are responsible for any applicable taxes."
      ]
    },
    {
      icon: FileText,
      title: "Governing Law",
      content: [
        "These terms are governed by the laws of India.",
        "Any disputes will be resolved in the courts of Bangalore.",
        "If any provision is invalid, the remaining provisions remain in effect.",
        "Users agree to exclusive jurisdiction in Bangalore.",
        "International users agree to these terms."
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
            <span className="gradient-text">Terms & Conditions</span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300/80 max-w-4xl mx-auto">
            Please read these terms carefully before using Eventara
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
          <h2 className="text-2xl font-bold text-white mb-4">Important Notice</h2>
          <p className="text-cyan-100/80 leading-relaxed mb-4">
            Please read these Terms and Conditions carefully before using Eventara. By accessing or using our services, 
            you agree to be bound by these terms. If you do not agree with any part of these terms, you must not use our services.
          </p>
          <p className="text-cyan-100/80">
            These terms constitute a legally binding agreement between you and Eventara Technologies.
          </p>
        </motion.div>

        {/* Terms Sections */}
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
            If you have questions about these Terms and Conditions, please contact us:
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