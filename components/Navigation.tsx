'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigateToDemo = () => {
    setMobileMenuOpen(false);
  };

  const navigateToHome = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center cursor-pointer" onClick={navigateToHome}>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BCS Consultoria
            </h1>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`transition-colors ${pathname === '/' ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`}
            >
              Início
            </Link>
            <a href="/#about" className="text-gray-700 hover:text-blue-600 transition-colors">
              Sobre
            </a>
            <a href="/#services" className="text-gray-700 hover:text-blue-600 transition-colors">
              Serviços
            </a>
            <Link
              href="/demo"
              onClick={navigateToDemo}
              className="px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
            >
              Agendar demonstração
            </Link>
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
            <Link 
              href="/" 
              onClick={navigateToHome} 
              className="block w-full text-left py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              Início
            </Link>
            <a href="/#about" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Sobre
            </a>
            <a href="/#services" className="block py-2 text-gray-700 hover:text-blue-600 transition-colors">
              Serviços
            </a>
            <Link
              href="/demo"
              onClick={navigateToDemo}
              className="w-full mt-2 px-6 py-2.5 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg"
            >
              Agendar demonstração
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
