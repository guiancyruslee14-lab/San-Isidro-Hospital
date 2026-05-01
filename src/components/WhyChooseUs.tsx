import { CheckCircle2 } from 'lucide-react';

export function WhyChooseUs() {
  const reasons = [
    "Open 24/7 for all medical emergencies",
    "Highly experienced, board-certified doctors",
    "Accessible location in the heart of Angono",
    "Patient-first care and compassionate staff",
    "State-of-the-art diagnostic facilities",
    "Affordable healthcare without compromising quality"
  ];

  return (
    <section className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-lg flex flex-col lg:flex-row gap-12 items-center overflow-hidden relative">
          <div className="flex-1 relative z-10">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl mb-4">Why Choose Us?</h2>
            <p className="text-slate-300 text-sm md:text-base mb-8 leading-relaxed max-w-lg">
              We understand that choosing a healthcare provider is one of the most important decisions you make for yourself and your family.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason, idx) => (
                <div key={idx} className="flex items-start gap-3 flex-row px-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0" />
                  <span className="text-slate-200 text-xs md:text-sm font-medium leading-tight">{reason}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 w-full relative z-10 hidden sm:block">
            <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl relative h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1000" 
                alt="Medical staff" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg">
                <div className="text-xl font-black text-blue-600">10k+</div>
                <div className="text-[10px] font-bold uppercase tracking-tight text-slate-500">Patients Healed</div>
              </div>
            </div>
          </div>

          {/* Decorative */}
          <div className="absolute top-0 right-0 w-64 h-full opacity-5 pointer-events-none">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#ffffff" d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.1,89.2,-14.5,87.7,0.9C86.1,16.2,78.9,31.4,69.5,44.7C60.1,58,48.5,69.3,34.8,75.4C21.1,81.5,5.3,82.4,-10.8,79.5C-26.9,76.5,-43.3,69.7,-56.3,58.8C-69.3,47.9,-78.9,33,-82.7,16.8C-86.4,0.6,-84.3,-16.9,-77.3,-32.5C-70.3,-48.1,-58.4,-61.8,-44,-68.5C-29.6,-75.2,-14.8,-74.8,0.7,-76.1C16.3,-77.4,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
