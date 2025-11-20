import React from 'react';

const techniques = [
  {
    title: "Oga Kazuo's Backgrounds",
    desc: "Painted with poster colors (Nicker Color), utilizing wet-on-wet techniques to create lush, atmospheric forests that feel alive.",
    img: "https://picsum.photos/seed/forest1/600/400"
  },
  {
    title: "Digital Composition",
    desc: "One of the first Ghibli films to use digital ink and paint and 3D CGI (for the demon worms), seamlessly blended with hand-drawn cells.",
    img: "https://picsum.photos/seed/tech/600/400"
  },
  {
    title: "Color Grading",
    desc: "A darker palette than previous films. Deep emerald greens, bloody crimsons, and cold greys reflect the violent conflict of the narrative.",
    img: "https://picsum.photos/seed/red/600/400"
  }
];

const VisualTechniques: React.FC = () => {
  return (
    <section className="bg-white py-20 border-t border-ghibli-earth/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-ghibli-forest mb-4">
            Defining Techniques
          </h2>
          <div className="w-24 h-1 bg-ghibli-red mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techniques.map((tech, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="relative h-64 overflow-hidden rounded-xl shadow-md mb-6">
                <div className="absolute inset-0 bg-ghibli-forest/20 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                <img 
                  src={tech.img} 
                  alt={tech.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter sepia-[0.2] contrast-110"
                />
              </div>
              <h3 className="text-xl font-serif font-bold text-ghibli-earth mb-3 group-hover:text-ghibli-red transition-colors">
                {tech.title}
              </h3>
              <p className="text-ghibli-charcoal/80 font-sans leading-relaxed text-sm">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualTechniques;