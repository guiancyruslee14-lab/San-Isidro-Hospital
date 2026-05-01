import { HeartPulse, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PhilHealthYakap() {
  const benefits = [
    "Consultations (Initial and Follow-up)",
    "13 Basic Laboratory & Diagnostic Tests",
    "6 Essential Cancer Screenings",
    "Up to ₱20,000/year for Essential Medicines",
    "Early intervention and prevention",
    "No-balance billing for eligible dependents"
  ];

  return (
    <section className="py-8 md:py-16 bg-blue-50/50 border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-blue-100 flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" /> Nationwide Program
            </div>
            
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              PhilHealth YAKAP
            </h2>
            
            <p className="text-slate-600 leading-relaxed font-medium">
              Launched in July 2025 replacing the old Konsulta program, the PhilHealth YAKAP (Yaman ng Kalusugan at Pag-asa) is a comprehensive primary healthcare package. It provides all members and their dependents with free, early-intervention services to prevent hospitalization.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-bold leading-snug">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95 transition-all text-sm">
                <HeartPulse className="w-4 h-4" /> Avail YAKAP Services
              </Link>
              <a href="https://www.philhealth.gov.ph" target="_blank" rel="noopener noreferrer" className="bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 px-8 py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-colors text-sm">
                <FileText className="w-4 h-4" /> Learn More
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[450px] relative hidden md:block">
            <div className="absolute inset-0 bg-blue-600/10 rounded-3xl translate-x-4 -translate-y-4"></div>
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=600" 
              alt="Medical Consultation" 
              className="relative w-full rounded-3xl object-cover aspect-[4/5] shadow-lg border-4 border-white"
            />
            
            {/* Overlay badge */}
            <div className="absolute bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-500">Accredited</p>
                <p className="font-bold text-slate-900 leading-tight">YAKAP Provider</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
