import { useState, useEffect } from 'react';
import { Menu, X, Home, BarChart3, Users, Briefcase, Mail, Sparkles, LayoutDashboard } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  UserButton,
  SignInButton,
  SignUpButton,
  useAuth
} from '@clerk/clerk-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Features', href: '/features', icon: Sparkles },
    { name: 'Stats', href: '/stats', icon: BarChart3 },
    { name: 'About', href: '/about', icon: Users },
    { name: 'Careers', href: '/careers', icon: Briefcase },
    { name: 'Contact', href: '/contact', icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-navy-900/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10'
        : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <motion.div
              className="text-2xl font-black"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <span className="gradient-text">Eventara</span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-cyan-300 bg-cyan-500/20'
                    : 'text-cyan-300/80 hover:text-cyan-100 hover:bg-cyan-500/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <item.icon size={16} />
                  {item.name}
                </span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-500/20 rounded-lg"
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
              </Link>
            ))}
            {isSignedIn && (
              <Link
                to="/dashboard"
                className={`relative px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/dashboard')
                    ? 'text-cyan-300 bg-cyan-500/20'
                    : 'text-cyan-300/80 hover:text-cyan-100 hover:bg-cyan-500/10'
                }`}
              >
                <span className="flex items-center gap-2">
                  <LayoutDashboard size={16} />
                  Dashboard
                </span>
                {isActive('/dashboard') && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-500/20 rounded-lg"
                    transition={{ type: "spring", duration: 0.3 }}
                  />
                )}
              </Link>
            )}
            <div className="ml-4">
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 ring-2 ring-cyan-400/50 hover:ring-cyan-400 transition-all duration-200"
                  }
                }}
              />
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cyan-300 hover:text-cyan-100 transition-colors p-2 hover:bg-cyan-500/10 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 bg-navy-900/95 backdrop-blur-xl border-b border-cyan-500/20 md:hidden"
              >
                <div className="flex flex-col p-4 gap-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive(item.href)
                          ? 'text-cyan-300 bg-cyan-500/20'
                          : 'text-cyan-300/80 hover:text-cyan-100 hover:bg-cyan-500/10'
                      }`}
                    >
                      <item.icon size={18} />
                      {item.name}
                    </Link>
                  ))}
                  {isSignedIn && (
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive('/dashboard')
                          ? 'text-cyan-300 bg-cyan-500/20'
                          : 'text-cyan-300/80 hover:text-cyan-100 hover:bg-cyan-500/10'
                      }`}
                    >
                      <LayoutDashboard size={18} />
                      Dashboard
                    </Link>
                  )}
                  {!isSignedIn && (
                    <>
                      <SignUpButton mode="modal">
                        <button className="w-full px-4 py-3 text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors">
                          Sign Up
                        </button>
                      </SignUpButton>
                      <SignInButton mode="modal">
                        <button className="w-full px-4 py-3 text-cyan-300 hover:bg-cyan-500/10 rounded-lg transition-colors">
                          Sign In
                        </button>
                      </SignInButton>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
};