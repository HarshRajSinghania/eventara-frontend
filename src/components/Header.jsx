export const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-cyan-500/20">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Eventara
            </span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Features
            </a>
            <a href="#stats" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Stats
            </a>
            <a href="#contact" className="text-cyan-300 hover:text-cyan-100 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};