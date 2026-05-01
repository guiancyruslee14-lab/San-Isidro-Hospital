import { Activity, Stethoscope, Baby, Scissors, TestTube2, Siren } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Services() {
  const services = [
    { id: 'emergency', name: 'Emergency Unit', desc: '24/7 Trauma care', icon: Siren, color: 'text-red-600', bg: 'bg-red-50', hoverBg: 'group-hover:bg-red-600' },
    { id: 'diagnostics', name: 'Diagnostics', desc: 'X-Ray, Lab, CT', icon: TestTube2, color: 'text-blue-600', bg: 'bg-blue-50', hoverBg: 'group-hover:bg-blue-600' },
    { id: 'surgery', name: 'Surgery', desc: 'Modern OR Facility', icon: Scissors, color: 'text-emerald-600', bg: 'bg-emerald-50', hoverBg: 'group-hover:bg-emerald-600' },
    { id: 'general-medicine', name: 'General Medicine', desc: 'Primary Care', icon: Stethoscope, color: 'text-purple-600', bg: 'bg-purple-50', hoverBg: 'group-hover:bg-purple-600' },
    { id: 'ob-gyn', name: 'OB-GYN', desc: 'Maternal Health', icon: Baby, color: 'text-pink-600', bg: 'bg-pink-50', hoverBg: 'group-hover:bg-pink-600' },
    { id: 'pediatrics', name: 'Pediatrics', desc: 'Child Care', icon: Activity, color: 'text-amber-600', bg: 'bg-amber-50', hoverBg: 'group-hover:bg-amber-600' },
  ];

  return (
    <section id="services" className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-8 tracking-tight">Our Medical Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {services.map((service) => (
            <Link 
              key={service.name} 
              to={`/services/${service.id}`}
              className="bg-white border border-slate-200 p-5 rounded-2xl flex items-start gap-4 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className={`${service.bg} ${service.color} p-2.5 rounded-xl ${service.hoverBg} group-hover:text-white transition-colors`}>
                <service.icon className="w-6 h-6" strokeWidth={2} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 leading-tight mb-1">{service.name}</h3>
                <p className="text-[11px] text-slate-500">{service.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
