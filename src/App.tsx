import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import MissionSection from './components/MissionSection';
import USPSection from './components/USPSection';
import JourneySection from './components/JourneySection';
import ShowcaseSection from './components/ShowcaseSection';
import DownloadSection from './components/DownloadSection';
import NewsletterSection from './components/NewsletterSection';
import Footer from './components/Footer';
import BetaForm from './components/BetaForm';
import './styles/globals.css';

const MainPage = () => (
  <div className="min-h-screen">
    <HeroSection />
    <MissionSection />
    <USPSection />
    <JourneySection />
    <ShowcaseSection />
    <DownloadSection />
    <NewsletterSection />
    <Footer />
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/beta" element={<BetaForm />} />
      </Routes>
    </Router>
  );
};

export default App;
