import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { DigitalLiteracy } from './pages/DigitalLiteracy';
import { CyberSafety } from './pages/CyberSafety';
import { AwarenessResources } from './pages/AwarenessResources';
import { CommunitySurvey } from './pages/CommunitySurvey';
import { ContactUs } from './pages/ContactUs';
import { AdminDashboard } from './pages/AdminDashboard';

export function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/digital-literacy" element={<DigitalLiteracy />} />
              <Route path="/cyber-safety" element={<CyberSafety />} />
              <Route path="/resources" element={<AwarenessResources />} />
              <Route path="/survey" element={<CommunitySurvey />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <AuthModal />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
