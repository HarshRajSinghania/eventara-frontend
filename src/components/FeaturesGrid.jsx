export const FeaturesGrid = () => {
  const features = [
    {
      title: "Immersive Events",
      description: "Create fully branded virtual environments with custom booths and stages",
      icon: "🎤"
    },
    {
      title: "Real-time Interaction",
      description: "Live Q&A, polls, and networking lounges with WebRTC integration",
      icon: "💬"
    },
    {
      title: "Analytics Dashboard",
      description: "Track attendance, engagement, and event performance in real-time",
      icon: "📊"
    },
    {
      title: "Custom Branding",
      description: "Full control over colors, logos, and styling with our design system",
      icon: "🎨"
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Powerful Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-navy-900/40 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-cyan-300 mb-2">{feature.title}</h3>
              <p className="text-cyan-100/60">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};