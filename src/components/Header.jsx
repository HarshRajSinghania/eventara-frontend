import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import {
  UserButton,
  SignInButton,
  SignUpButton,
  useAuth
} from '@clerk/clerk-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();
  return (
    <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-cyan-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Eventara
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Features
            </a>
            <a href="#stats" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Stats
            </a>
            <a href="#contact" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Contact
            </a>
            <div className="ml-4">
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cyan-300 hover:text-cyan-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <UserButton afterSignOutUrl="/" />
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-navy-900/95 backdrop-blur-lg border-b border-cyan-500/20 md:hidden">
              <div className="flex flex-col items-center py-4 gap-4">
                <a href="#features" className="text-cyan-300 hover:text-cyan-100 px-4 py-2">
                  Features
                </a>
                <a href="#stats" className="text-cyan-300 hover:text-cyan-100 px-4 py-2">
                  Stats
                </a>
                <a href="#contact" className="text-cyan-300 hover:text-cyan-100 px-4 py-2">
                  Contact
                </a>
                {!isSignedIn && (
                  <>
                    <SignUpButton mode="modal">
                      <button className="w-full px-6 py-2 text-cyan-300 hover:bg-cyan-500/10 transition-colors">
                        Sign Up
                      </button>
                    </SignUpButton>
                    <SignInButton mode="modal">
                      <button className="w-full px-6 py-2 text-cyan-300 hover:bg-cyan-500/10 transition-colors">
                        Sign In
                      </button>
                    </SignInButton>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};