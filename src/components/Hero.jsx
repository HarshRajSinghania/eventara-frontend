import { SignUpButton, SignInButton } from '@clerk/clerk-react';

export const Hero = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center
      bg-gradient-to-br from-navy-900 to-violet-900/60 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-cyan-400/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-violet-400/5 rounded-full blur-3xl animate-float-delayed"></div>
      </div>
      
      <div className="text-center px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400
          bg-clip-text text-transparent mb-6 leading-tight">
          Transform Your Virtual Events
        </h1>
        <p className="text-cyan-100/80 mb-8 max-w-2xl mx-auto text-xl md:text-2xl">
          Create immersive experiences that captivate global audiences with our all-in-one webinar & conference platform
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignUpButton mode="modal">
            <button className="bg-cyan-600/30 hover:bg-cyan-600/40 px-8 py-4 rounded-xl
              border border-cyan-400/30 hover:border-cyan-300/40 transition-all
              text-cyan-300 text-lg font-medium glow-effect">
              Get Started Free
            </button>
          </SignUpButton>
          <SignInButton mode="modal">
            <button className="bg-transparent hover:bg-cyan-500/10 px-8 py-4 rounded-xl
              border border-cyan-400/20 hover:border-cyan-300/30 transition-all
              text-cyan-300 text-lg font-medium">
              Sign In
            </button>
          </SignInButton>
        </div>
        
        {/* Client logos */}
        <div className="mt-16">
          <p className="text-cyan-100/60 mb-6 text-sm">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-80 hover:opacity-100 transition-opacity">
            <div className="text-cyan-300 font-bold text-xl">Acme Corp</div>
            <div className="text-cyan-300 font-bold text-xl">Stark Industries</div>
            <div className="text-cyan-300 font-bold text-xl">Wayne Enterprises</div>
          </div>
        </div>
        
        {/* Scrolling counter */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <div className="text-sm text-cyan-100/60">
            Join <span className="font-mono text-cyan-300">1,532</span> events happening now
          </div>
        </div>
      </div>
    </div>
  );
};