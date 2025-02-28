import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Location from './pages/Location';
import DigitalMenu from './pages/DigitalMenu';
import MenuAdmin from './pages/admin/MenuAdmin';
import Login from './pages/admin/Login';
import SimpleProtectedRoute from './components/auth/SimpleProtectedRoute';
import GrandOpeningCountdown from './components/common/GrandOpeningCountdown';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/digital-menu" element={<DigitalMenu />} />
            <Route path="/location" element={<Location />} />
            <Route path="/admin/login" element={<Login />} />
            <Route 
              path="/admin/menu" 
              element={
                <SimpleProtectedRoute>
                  <MenuAdmin />
                </SimpleProtectedRoute>
              } 
            />
          </Routes>
        </main>
        <Footer />
        <GrandOpeningCountdown />
      </div>
    </Router>
  );
}