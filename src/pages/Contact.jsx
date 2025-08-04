import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, Clock, Twitter, Linkedin, Facebook, Instagram } from 'lucide-react';

// Moved InputField and TextAreaField outside the component to prevent re-creation
const InputField = ({ icon: Icon, label, name, type = 'text', placeholder, value, onChange, required = false }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-cyan-300">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full pl-10 pr-4 py-3 bg-navy-800/50 border border-cyan-500/30 rounded-xl text-cyan-100 placeholder-cyan-500/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
      />
    </div>
  </div>
);

const TextAreaField = ({ icon: Icon, label, name, placeholder, value, onChange, rows = 5 }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-cyan-300">{label}</label>
    <div className="relative">
      <Icon className="absolute left-3 top-3 w-5 h-5 text-cyan-400" />
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="w-full pl-10 pr-4 py-3 bg-navy-800/50 border border-cyan-500/30 rounded-xl text-cyan-100 placeholder-cyan-500/50 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all duration-200"
      />
    </div>
  </div>
);

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = useCallback((e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setSubmitted(true);
    setLoading(false);
    setTimeout(() => setSubmitted(false), 5000);
  }, []);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-black mb-6">
            <span className="gradient-text">Contact Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-cyan-300/80 max-w-3xl mx-auto">
            Get in touch with our team - we're here to help you create amazing events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="glass-panel-strong p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <InputField
                  icon={Mail}
                  label="Full Name"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputField
                  icon={Mail}
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <InputField
                  icon={Mail}
                  label="Subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <TextAreaField
                  icon={Send}
                  label="Message"
                  name="message"
                  placeholder="Tell us more about your inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                />
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {loading ? 'Sending...' : 'Send Message'}
                </motion.button>
                
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass-panel border-green-500/30 p-4 rounded-xl"
                  >
                    <p className="text-green-400 text-center">Thank you! We'll get back to you within 24 hours.</p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="glass-panel-strong p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Get in touch</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-cyan-400 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">Email</h3>
                      <p className="text-cyan-100/80">raj.harshraut@gmail.com</p>
                      <p className="text-cyan-100/80">support@eventara.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-cyan-400 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-300 mb-2">Phone</h3>
                      <p className="text-cyan-100/80">+91 94724 00429</p>
                      <p className="text-cyan-100/80">+91 94724 00429</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-cyan-400 mr-3 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-300 mb-2">Address</h3>
                      <p className="text-cyan-100/80">
                        Eventara Technologies<br />
                        Patna, Bihar, India - 800012<br />
                        India
                      </p>
                    </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-cyan-400 mr-3 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">Business Hours</h3>
                    <p className="text-cyan-100/80">
                      Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                      Saturday: 10:00 AM - 4:00 PM IST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-cyan-500/20">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4">Follow us</h3>
                <div className="flex space-x-4">
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="p-2 glass-panel rounded-xl text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="p-2 glass-panel rounded-xl text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="p-2 glass-panel rounded-xl text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Facebook className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    href="#"
                    className="p-2 glass-panel rounded-xl text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};