import { ClerkProvider, useUser } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Hero } from './components/Hero';
import { Header } from './components/Header';
import { FeaturesGrid } from './components/FeaturesGrid';
import { StatsSection } from './components/StatsSection';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Dashboard } from './components/Dashboard';
import { CreateEvent } from './components/CreateEvent';
import { EventDetails } from './components/EventDetails';
import { EditEvent } from './components/EditEvent';

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturesGrid />
      <StatsSection />
      <CTA />
    </>
  );
}

function AppContent() {
  const { isSignedIn } = useUser();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-navy-900 to-violet-900/60">
        <Header />
        <main className="space-y-20">
          <Routes>
            <Route
              path="/"
              element={isSignedIn ? <Navigate to="/dashboard" replace /> : <HomePage />}
            />
            <Route
              path="/dashboard"
              element={isSignedIn ? <Dashboard /> : <Navigate to="/" replace />}
            />
            <Route
              path="/create-event"
              element={isSignedIn ? <CreateEvent /> : <Navigate to="/" replace />}
            />
            <Route
              path="/events/:id"
              element={isSignedIn ? <EventDetails /> : <Navigate to="/" replace />}
            />
            <Route
              path="/events/:id/edit"
              element={isSignedIn ? <EditEvent /> : <Navigate to="/" replace />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <AppContent />
    </ClerkProvider>
  );
}