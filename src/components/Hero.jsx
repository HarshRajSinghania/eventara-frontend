import { SignUpButton, SignInButton } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

export const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Generate floating particles
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-purple-900/40"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 211, 238, 0.3) 0%, transparent 50%)`,
          }}
        />
        
        {/* Floating particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 animate-float"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              opacity: particle.opacity,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
        
        {/* Background orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 rounded-full blur-2xl animate-float"></div>
      </div>
      
      <div className="text-center px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-full text-sm text-cyan-300 font-medium mb-6">
            ✨ Now with AI-powered event insights
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          <span className="gradient-text text-glow">Transform Your</span>
          <br />
          <span className="text-white">Virtual Events</span>
        </h1>
        
        <p className="text-cyan-100/80 mb-10 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
          Create immersive experiences that captivate global audiences with our AI-powered webinar & conference platform
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <SignUpButton mode="modal">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold rounded-2xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Get Started Free</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </SignUpButton>
          
          <SignInButton mode="modal">
            <button className="group relative px-8 py-4 bg-transparent border-2 border-cyan-400/50 hover:border-cyan-400 text-cyan-300 hover:text-cyan-100 font-bold rounded-2xl hover:shadow-lg hover:shadow-cyan-500/20 transform hover:scale-105 transition-all duration-300">
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-cyan-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </SignInButton>
        </div>
        
        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
            <div className="text-cyan-300/80">Events Created</div>
          </div>
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">1M+</div>
            <div className="text-cyan-300/80">Attendees</div>
          </div>
          <div className="glass-panel p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-cyan-300/80">Uptime</div>
          </div>
        </div>
        
        {/* Client logos */}
        <div className="mt-16">
          <p className="text-cyan-100/60 mb-8 text-sm uppercase tracking-wider">Trusted by industry leaders</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
            <div className="text-cyan-300 font-bold text-xl hover:text-cyan-200 transition-colors">TechCorp</div>
            <div className="text-cyan-300 font-bold text-xl hover:text-cyan-200 transition-colors">InnovateLab</div>
            <div className="text-cyan-300 font-bold text-xl hover:text-cyan-200 transition-colors">FutureWorks</div>
            <div className="text-cyan-300 font-bold text-xl hover:text-cyan-200 transition-colors">CloudSync</div>
          </div>
        </div>
        
        {/* Live indicator */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-300">
              <span className="font-mono font-bold">2,847</span> events live now
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};