import React, { useState } from 'react';
import { analyzeArtStyle, generateCustomAnswer } from '../services/geminiService';
import { ArtTopic, AnalysisResult } from '../types';
import Loader from './Loader';
import { ArrowRight, Sparkles, Paintbrush } from 'lucide-react';

const ArtAnalyzer: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<ArtTopic | null>(null);
  const [customQuestion, setCustomQuestion] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [customAnswer, setCustomAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTopicClick = async (topic: ArtTopic) => {
    setSelectedTopic(topic);
    setCustomAnswer(null);
    setLoading(true);
    setResult(null);
    try {
      const data = await analyzeArtStyle(topic);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    
    setLoading(true);
    setSelectedTopic(null);
    setResult(null);
    try {
      const answer = await generateCustomAnswer(customQuestion);
      setCustomAnswer(answer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left Column: Controls */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-ghibli-forest mb-4">
              Deconstruct the Style
            </h2>
            <p className="text-ghibli-charcoal/80 font-sans leading-relaxed">
              Select an artistic element to receive a professional breakdown from our AI art historian, or ask your own specific question about the film's visual language.
            </p>
          </div>

          {/* Pre-defined Topics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.values(ArtTopic).map((topic) => (
              <button
                key={topic}
                onClick={() => handleTopicClick(topic)}
                className={`p-4 text-left rounded-lg border transition-all duration-300 flex items-center justify-between group
                  ${selectedTopic === topic 
                    ? 'bg-ghibli-forest text-white border-ghibli-forest shadow-lg transform scale-105' 
                    : 'bg-white border-ghibli-earth/30 text-ghibli-earth hover:border-ghibli-earth hover:bg-ghibli-cream/50'
                  }`}
              >
                <span className="font-serif font-semibold text-sm">{topic}</span>
                <Paintbrush className={`w-4 h-4 ${selectedTopic === topic ? 'text-white' : 'text-ghibli-earth/50 group-hover:text-ghibli-earth'}`} />
              </button>
            ))}
          </div>

          {/* Custom Question */}
          <div className="bg-white p-6 rounded-xl border border-ghibli-earth/20 shadow-sm">
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <label className="block text-sm font-bold text-ghibli-forest uppercase tracking-wider">
                Ask a specific question
              </label>
              <div className="relative">
                <input 
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="e.g., How are the spirits animated?"
                  className="w-full p-4 pr-12 bg-ghibli-cream/30 border border-ghibli-earth/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-ghibli-forest/50 text-ghibli-charcoal placeholder-ghibli-charcoal/40 font-sans"
                />
                <button 
                  type="submit"
                  disabled={loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-ghibli-earth text-white rounded-md hover:bg-ghibli-forest transition-colors disabled:opacity-50"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Output */}
        <div className="relative min-h-[400px] bg-white rounded-2xl shadow-xl border border-ghibli-earth/10 overflow-hidden flex flex-col">
          
          {/* Decorative Header */}
          <div className="bg-ghibli-forest p-4 flex items-center space-x-2">
            <Sparkles className="text-ghibli-mist w-5 h-5" />
            <span className="text-ghibli-mist font-serif text-sm tracking-widest uppercase">
              Gemini Analysis
            </span>
          </div>

          <div className="p-8 flex-grow flex flex-col">
            {loading ? (
              <div className="flex-grow flex items-center justify-center">
                <Loader />
              </div>
            ) : result ? (
              <div className="animate-fade-in space-y-6">
                <h3 className="text-2xl font-serif text-ghibli-earth font-bold border-b border-ghibli-earth/20 pb-4">
                  {result.topic}
                </h3>
                <div className="prose prose-stone">
                  <p className="text-ghibli-charcoal leading-loose font-sans text-lg">
                    {result.content}
                  </p>
                </div>
                
                <div className="pt-6">
                  <h4 className="text-xs font-bold text-ghibli-charcoal/50 uppercase tracking-widest mb-3">
                    Key Technical Terms
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.keyTerms.map((term, idx) => (
                      <span key={idx} className="px-3 py-1 bg-ghibli-cream text-ghibli-forest text-sm font-medium rounded-full border border-ghibli-earth/20">
                        {term}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : customAnswer ? (
               <div className="animate-fade-in space-y-6">
                <h3 className="text-2xl font-serif text-ghibli-earth font-bold border-b border-ghibli-earth/20 pb-4">
                  Expert Response
                </h3>
                <div className="prose prose-stone">
                  <p className="text-ghibli-charcoal leading-loose font-sans text-lg whitespace-pre-line">
                    {customAnswer}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center text-center text-ghibli-charcoal/40 space-y-4">
                <div className="w-16 h-16 rounded-full bg-ghibli-cream flex items-center justify-center">
                  <Paintbrush className="w-8 h-8 opacity-50" />
                </div>
                <p className="font-serif italic max-w-xs">
                  "The forest spirit is waiting. Select a topic to reveal the secrets of the art."
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtAnalyzer;