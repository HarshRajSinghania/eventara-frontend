import { Link } from 'react-router-dom';

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
              <li><Link to="/features" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Event Creation</Link></li>
              <li><Link to="/features" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Session Management</Link></li>
              <li><Link to="/features" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Registration System</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-cyan-300 text-sm font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-cyan-100/60 hover:text-cyan-100 text-sm">About</Link></li>
              <li><Link to="/careers" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Careers</Link></li>
              <li><Link to="/contact" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-cyan-300 text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-cyan-100/60 hover:text-cyan-100 text-sm">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-cyan-500/20 mt-8 pt-8 text-center text-cyan-100/60 text-sm">
          © 2025 Eventara. All rights reserved.
        </div>
      </div>
    </footer>
  );
};