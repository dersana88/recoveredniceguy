import React from 'react';
import { Smartphone, Bed, Heart, Waves } from 'lucide-react';

export default function SymptomsGrid() {
  const symptoms = [
    {
      icon: Smartphone,
      title: "The mad phone-checking cycle",
      description: "Every notification that isn't her"
    },
    {
      icon: Bed,
      title: "Can't sleep properly",
      description: "Mind like a hamster in a wheel"
    },
    {
      icon: Heart,
      title: "Devastated and heartbroken",
      description: "The pain feels unbearable"
    },
    {
      icon: Waves,
      title: "Waves of gloom",
      description: "Constant anxiety throughout the day"
    }
  ];

  return (
    <section className="mb-16 md:mb-24 fade-in">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">
        Right Now You're Experiencing:
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {symptoms.map((symptom, index) => (
          <div key={index} className="bg-gray-900/50 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-colors group">
            <div className="flex items-start space-x-4">
              <div className="text-orange-400 group-hover:scale-110 transition-transform">
                <symptom.icon size={32} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{symptom.title}</h3>
                <p className="text-gray-400">{symptom.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
          I know because I've been there. <span className="text-orange-400 font-semibold">73 times</span>. 
          The difference? I documented exactly what works.
        </p>
      </div>
    </section>
  );
}