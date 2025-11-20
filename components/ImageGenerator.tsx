import React, { useState } from 'react';
import { generateGhibliPrompt, generateMononokeImage } from '../services/geminiService';
import Loader from './Loader';
import { Wand2, Image as ImageIcon, RefreshCw, Download, Sparkles } from 'lucide-react';

const SUGGESTIONS = [
  "A giant white wolf goddess resting in a mossy ancient forest",
  "A cursed warrior boy riding a red elk across grassy plains",
  "The glowing forest spirit deer walking on water at night",
  "An industrial iron fortress town billowing smoke in the mountains"
];

const ImageGenerator: React.FC = () => {
  const [userIdea, setUserIdea] = useState('');
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'enhancing' | 'generating' | 'complete' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userIdea.trim()) return;

    try {
      // Step 1: Enhance Prompt
      setStatus('enhancing');
      setErrorMsg('');
      setGeneratedImage(null);
      
      const stylisticPrompt = await generateGhibliPrompt(userIdea);
      setEnhancedPrompt(stylisticPrompt);

      // Step 2: Generate Image
      setStatus('generating');
      const imageBase64 = await generateMononokeImage(stylisticPrompt);
      
      if (imageBase64) {
        setGeneratedImage(imageBase64);
        setStatus('complete');
      } else {
        throw new Error("No image data received.");
      }

    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg("The spirits were silent. Please check your API key and try again.");
    }
  };

  return (
    <section id="studio" className="max-w-7xl mx-auto px-4 py-16 md:py-24 bg-ghibli-cream/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-ghibli-forest mb-4">
          The Iron Town Studio
        </h2>
        <p className="text-ghibli-charcoal/80 font-sans max-w-2xl mx-auto text-lg">
          Imagine a scene. Our AI Agent will convert your idea into a specialized prompt referencing Oga Kazuo's techniques, and the Nano Banana model will paint it for you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
        
        {/* Input Column */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-ghibli-earth/10">
          <form onSubmit={handleGenerate} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-ghibli-earth uppercase tracking-wider mb-2">
                Your Vision
              </label>
              <textarea
                value={userIdea}
                onChange={(e) => setUserIdea(e.target.value)}
                placeholder="e.g., A young boy warrior with a spear standing next to a giant white wolf in a cedar forest."
                className="w-full h-32 p-4 bg-ghibli-cream/20 border border-ghibli-earth/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghibli-forest/50 text-ghibli-charcoal placeholder-ghibli-charcoal/40 font-sans resize-none"
              />
            </div>

            {enhancedPrompt && (
              <div className="animate-fade-in">
                <label className="block text-xs font-bold text-ghibli-forest/70 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Wand2 size={12} /> AI Enhanced Prompt
                </label>
                <div className="p-3 bg-ghibli-mist/30 border border-ghibli-mist rounded-lg text-xs text-ghibli-charcoal font-mono leading-relaxed">
                  {enhancedPrompt}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'enhancing' || status === 'generating' || !userIdea}
              className={`w-full py-4 rounded-xl font-serif font-bold text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-3
                ${status === 'enhancing' || status === 'generating'
                  ? 'bg-ghibli-earth/80 text-white cursor-wait'
                  : 'bg-ghibli-forest text-white hover:bg-ghibli-red shadow-md hover:shadow-xl hover:-translate-y-1'
                }`}
            >
              {status === 'idle' || status === 'complete' || status === 'error' ? (
                <>
                  <ImageIcon size={20} /> Generate Artwork
                </>
              ) : (
                <>
                  <RefreshCw size={20} className="animate-spin" /> 
                  {status === 'enhancing' ? 'Refining Style...' : 'Painting...'}
                </>
              )}
            </button>

            {/* Starter Prompts */}
            <div className="pt-4 border-t border-ghibli-earth/10">
              <p className="text-xs font-bold text-ghibli-earth/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Sparkles size={12} /> Inspiration Starters
              </p>
              <div className="grid grid-cols-1 gap-2">
                {SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setUserIdea(suggestion)}
                    className="text-left text-xs p-3 rounded-lg border border-ghibli-earth/10 bg-ghibli-cream/20 hover:bg-ghibli-forest/5 hover:border-ghibli-forest/30 hover:text-ghibli-forest transition-all duration-200 text-ghibli-charcoal/80 font-sans"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            {status === 'error' && (
              <p className="text-red-600 text-sm text-center font-sans mt-4">{errorMsg}</p>
            )}
          </form>
        </div>

        {/* Output Column */}
        <div className="lg:col-span-3">
          <div className="relative aspect-video bg-ghibli-charcoal rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
            {generatedImage ? (
              <div className="relative group w-full h-full">
                <img 
                  src={generatedImage} 
                  alt="AI Generated Mononoke Art" 
                  className="w-full h-full object-cover animate-fade-in"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <a 
                    href={generatedImage} 
                    download="mononoke-style-art.png"
                    className="bg-white text-ghibli-forest px-6 py-3 rounded-full font-bold font-serif flex items-center gap-2 hover:bg-ghibli-cream transition-colors"
                  >
                    <Download size={18} /> Download
                  </a>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 p-8 text-center">
                {status === 'generating' ? (
                  <div className="flex flex-col items-center gap-4">
                    <Loader />
                    <p className="font-serif text-ghibli-mist text-lg animate-pulse">Applying poster colors...</p>
                  </div>
                ) : (
                  <>
                    <ImageIcon size={64} className="mb-4 opacity-50" />
                    <p className="font-serif italic">"The canvas is empty. Describe your scene to begin."</p>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="mt-4 flex justify-between text-xs text-ghibli-charcoal/60 font-sans px-2">
            <span>Model: gemini-2.5-flash-image</span>
            <span>Style: Princess Mononoke (1997)</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ImageGenerator;