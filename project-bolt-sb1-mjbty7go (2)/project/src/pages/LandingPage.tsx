import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { HowToSection } from '../components/landing/HowToSection';
import { PricingSection } from '../components/landing/PricingSection';
import { AuthModal } from '../components/auth/AuthModal';

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleDashboardClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <span className="text-xl font-bold text-gray-900">
              DevSolver
            </span>
            
            <button
              onClick={handleDashboardClick}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                       transition-colors text-sm sm:text-base"
            >
              {user ? 'Open Dashboard' : 'Get Started'}
            </button>
          </div>
        </div>
      </header>

      <main>
        <Hero onGetStarted={handleDashboardClick} />
        <HowToSection />
        <Features />
        <PricingSection />
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </div>
  );
}