import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 border-4 border-ghibli-forest border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 bg-white rounded-full opacity-50 animate-pulse"></div>
      </div>
      <span className="text-ghibli-forest font-serif italic">Consulting the spirits...</span>
    </div>
  );
};

export default Loader;