import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image Placeholder - using picsum with specific filters to mimic the style */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/forest/1920/1080" 
          alt="Mystical Forest" 
          className="w-full h-full object-cover filter sepia-[0.3] contrast-125 brightness-75 blur-[1px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ghibli-cream via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h2 className="text-sm md:text-base text-ghibli-mist uppercase tracking-[0.3em] mb-4 drop-shadow-md">
          Studio Ghibli Deconstructed
        </h2>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 drop-shadow-xl">
          The Art of Mononoke
        </h1>
        <p className="text-lg md:text-xl text-gray-100 font-sans font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
          "How do you describe the art?" An exploration of Oga Kazuo’s backgrounds, cel animation, and the visual soul of a masterpiece.
        </p>
      </div>
    </section>
  );
};

export default Hero;