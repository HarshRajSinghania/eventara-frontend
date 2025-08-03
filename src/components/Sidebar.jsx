import { cn } from '../lib/utils';
import { LayoutDashboard, Calendar, BarChart, Users, Settings } from 'lucide-react';

export const Sidebar = ({ isOpen }) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' },
    { icon: Calendar, label: 'Events' },
    { icon: Users, label: 'My Booth' },
    { icon: BarChart, label: 'Analytics' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <aside className={cn(
      'fixed md:relative h-screen w-64 transition-transform',
      'bg-gradient-to-b from-navy-800/60 to-violet-900/40',
      'backdrop-blur-lg border-r border-cyan-500/20',
      !isOpen && '-translate-x-full md:translate-x-0'
    )}>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className="w-full flex items-center p-3 space-x-3 rounded-lg
              text-cyan-100 hover:bg-cyan-800/30 transition-all
              hover:border hover:border-cyan-500/30 group"
          >
            <item.icon className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" />
            <span className="text-sm font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};