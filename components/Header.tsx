import React from 'react';

const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-ghibli-cream/90 backdrop-blur-sm border-b border-ghibli-earth/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-ghibli-red rounded-full flex items-center justify-center text-white font-serif font-bold">
            M
          </div>
          <h1 className="text-xl font-serif font-bold text-ghibli-forest tracking-wider">
            MONONOKE ARTISTRY
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-6 text-ghibli-earth text-sm font-sans font-semibold tracking-wide">
            <li className="hover:text-ghibli-red cursor-pointer transition-colors hidden md:block">The Style</li>
            <li className="hover:text-ghibli-red cursor-pointer transition-colors hidden md:block">Techniques</li>
            <li 
              className="text-ghibli-forest hover:text-ghibli-red cursor-pointer transition-colors border-b-2 border-transparent hover:border-ghibli-red"
              onClick={() => scrollToSection('studio')}
            >
              Create Art
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;