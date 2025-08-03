export const Footer = () => {
  return (
    <footer className="border-t border-cyan-500/20 bg-navy-900/80 backdrop-blur-md mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-cyan-300 text-lg font-semibold mb-4">Eventara</h3>
            <p className="text-cyan-100/60 text-sm">
              Elevating virtual experiences with cutting-edge technology and design
            </p>
          </div>
          <div>
            <h4 className="text-cyan-300 text-sm font-semibold mb-4">Features</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Interactive Booths</a></li>
              <li><a href="#features" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Real-time Streaming</a></li>
              <li><a href="#features" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Analytics Dashboard</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-cyan-300 text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#about" className="text-cyan-100/60 hover:text-cyan-100 text-sm">About</a></li>
              <li><a href="#blog" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Blog</a></li>
              <li><a href="#careers" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-cyan-300 text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#privacy" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Privacy</a></li>
              <li><a href="#terms" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Terms</a></li>
              <li><a href="#contact" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cyan-500/20 mt-8 pt-8 text-center text-cyan-100/60 text-sm">
          © 2024 Eventara. All rights reserved.
        </div>
      </div>
    </footer>
  );
};