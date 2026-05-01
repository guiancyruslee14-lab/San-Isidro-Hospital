import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <div className="bg-slate-50 font-sans">
      <main className="max-w-7xl mx-auto p-4 md:p-6 mt-4">
        <section className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
          <div className="relative z-10 flex-1">
            <span className="bg-blue-50 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              Open 24/7 in Angono
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6">
              Trusted <span className="text-blue-600">Healthcare</span><br/>
              Right in Angono.
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-md leading-relaxed font-sans">
              Experience world-class medical expertise with a compassionate Filipino touch. Open 24/7 for all your family's needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/doctors"
                className="bg-slate-900 border text-white hover:border-blue-300 hover:bg-black px-8 py-3.5 rounded-xl text-sm font-bold shadow-lg transition-colors flex items-center justify-center gap-2"
              >
                Find a Doctor
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full relative h-[300px] md:h-[400px]">
            <img
              className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10 border border-slate-100 shadow-sm"
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Hospital Hallway"
            />
            <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none z-0">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#2563EB" d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.1,89.2,-14.5,87.7,0.9C86.1,16.2,78.9,31.4,69.5,44.7C60.1,58,48.5,69.3,34.8,75.4C21.1,81.5,5.3,82.4,-10.8,79.5C-26.9,76.5,-43.3,69.7,-56.3,58.8C-69.3,47.9,-78.9,33,-82.7,16.8C-86.4,0.6,-84.3,-16.9,-77.3,-32.5C-70.3,-48.1,-58.4,-61.8,-44,-68.5C-29.6,-75.2,-14.8,-74.8,0.7,-76.1C16.3,-77.4,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
