import { ShieldCheck, HeartPulse, Clock } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-8 md:py-12 bg-slate-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="lg:text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-[10px] text-blue-600 font-bold tracking-widest uppercase mb-2">About San Isidro Hospital</h2>
          <p className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl leading-tight">
            A tradition of healing, right here in Angono.
          </p>
          <p className="mt-4 text-lg text-slate-500">
            We are dedicated to providing accessible, high-quality healthcare. Our modern facility combines advanced medical technology with compassionate, patient-first care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: 'Experienced Care',
              description: 'Our roster includes board-certified specialists across various medical fields.',
              icon: ShieldCheck,
              color: 'text-blue-600',
              bg: 'bg-blue-50',
            },
            {
              title: 'Patient-First Approach',
              description: 'From admission to recovery, your comfort and health are our absolute priority.',
              icon: HeartPulse,
              color: 'text-rose-600',
              bg: 'bg-rose-50',
            },
            {
              title: 'Accessible 24/7',
              description: "Medical emergencies don't wait. We are open around the clock for your peace of mind.",
              icon: Clock,
              color: 'text-emerald-600',
              bg: 'bg-emerald-50',
            },
          ].map((feature) => (
            <div key={feature.title} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col items-start gap-4 hover:border-blue-300 hover:shadow-md transition-all cursor-default group">
              <div className={`p-3 rounded-xl ${feature.bg} ${feature.color} group-hover:scale-105 transition-transform`}>
                <feature.icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">{feature.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm text-center">
          <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Recognized by Leading HMOs & Health Partners</h3>
          <p className="text-slate-500 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
            We are fully accredited by major Health Maintenance Organizations (HMOs) to provide you and your dependents with cash-less transactions and wider coverage for medical care.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 max-w-4xl mx-auto">
            {['Maxicare', 'Intellicare', 'MediCard', 'ValuCare', 'PhilHealth', 'Caritas Health Shield', 'Cocolife Healthcare'].map(hmo => (
              <div key={hmo} className="bg-slate-50 border border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-bold uppercase text-xs tracking-wider shadow-sm hover:scale-105 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition-all cursor-default">
                {hmo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
