export const StatsSection = () => {
  const stats = [
    { value: "50K+", label: "Active Users" },
    { value: "1M+", label: "Events Hosted" },
    { value: "99.9%", label: "Uptime" },
    { value: "150+", label: "Countries" }
  ];

  return (
    <section id="stats" className="py-20 bg-navy-900/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6 bg-navy-900/40 rounded-xl border border-cyan-500/20">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-medium text-cyan-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};