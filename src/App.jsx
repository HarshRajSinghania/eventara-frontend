import { Hero } from './components/Hero';
import { Header } from './components/Header';
import { FeaturesGrid } from './components/FeaturesGrid';
import { StatsSection } from './components/StatsSection';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 to-violet-900/60">
      <Header />
      <main className="space-y-20">
        <Hero />
        <FeaturesGrid />
        <StatsSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}