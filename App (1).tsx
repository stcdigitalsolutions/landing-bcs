import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Home from './components/Home';
import Demo from './components/Demo';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'demo'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigateToDemo = () => {
    setCurrentPage('demo');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setCurrentPage('home');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center cursor-pointer" onClick={navigateToHome}>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                BCS Consultoria
              </h1>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={navigateToHome} className="text-gray-700 hover:text-blue-600 transition-colors">
                Início
              </button>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">
                Sobre
              </a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">
                Serviços
              </a>
              <button
                onClick={navigateToDemo}
                className="px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Agendar demonstração
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden backdrop-blur-md bg-white/40 border-t border-white/20">
            <div className="px-4 pt-2 pb-4 space-y-2">
              <button onClick={navigateToHome} className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors">
                Início
              </button>
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
                Sobre
              </a>
              <a href="#services" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
                Serviços
              </a>
              <button
                onClick={navigateToDemo}
                className="w-full mt-2 px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg"
              >
                Agendar demonstração
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Page Content */}
      {currentPage === 'home' ? <Home onNavigateToDemo={navigateToDemo} /> : <Demo />}
    </div>
  );
}
