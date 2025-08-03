export const CTA = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-br from-navy-900 to-violet-900/60 rounded-2xl p-12 border border-cyan-500/20 backdrop-blur-lg">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Ready to Transform Your Events?
          </h2>
          <p className="text-cyan-100/80 mb-8 max-w-2xl mx-auto text-lg">
            Join thousands of businesses already creating unforgettable virtual experiences
          </p>
          <button className="bg-cyan-600/30 hover:bg-cyan-600/40 px-8 py-4 rounded-xl
            border border-cyan-400/30 hover:border-cyan-300/40 transition-all
            text-cyan-300 text-lg font-medium glow-effect">
            Start Free Trial
          </button>
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-md mx-auto">
            <div className="text-cyan-100/60 text-sm">No credit card needed</div>
            <div className="text-cyan-100/60 text-sm">14-day free trial</div>
            <div className="text-cyan-100/60 text-sm">Cancel anytime</div>
          </div>
        </div>
      </div>
    </section>
  );
};