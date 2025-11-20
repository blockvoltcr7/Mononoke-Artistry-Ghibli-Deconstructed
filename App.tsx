import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ArtAnalyzer from './components/ArtAnalyzer';
import VisualTechniques from './components/VisualTechniques';
import ImageGenerator from './components/ImageGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-ghibli-cream selection:bg-ghibli-red selection:text-white">
      <Header />
      
      <main className="flex-grow">
        <Hero />
        
        {/* Introduction Text */}
        <div className="max-w-3xl mx-auto text-center px-6 py-16">
          <p className="text-xl md:text-2xl font-serif text-ghibli-forest italic leading-relaxed">
            "To see with eyes unclouded by hate."
          </p>
          <p className="mt-6 text-ghibli-charcoal leading-loose">
            Princess Mononoke (1997) represents a pivot point in animation history. 
            It combines the peak of traditional hand-drawn cel animation with experimental digital compositing.
            Use the tool below to understand the vocabulary of this masterpiece.
          </p>
        </div>

        <ArtAnalyzer />
        
        <VisualTechniques />

        <ImageGenerator />
      </main>

      <footer className="bg-ghibli-forest text-ghibli-cream py-12 border-t-4 border-ghibli-red">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="font-serif text-lg mb-2">MONONOKE ARTISTRY</p>
          <p className="text-sm opacity-60 font-sans">
            Powered by Gemini AI • Educational Tribute
          </p>
          <p className="text-xs opacity-40 mt-8 max-w-md mx-auto">
            All analysis provided by AI. Images are stylistic placeholders. 
            Princess Mononoke and Studio Ghibli are trademarks of Studio Ghibli.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;