import { useParams, Link } from 'react-router-dom';
import { Activity, Stethoscope, Baby, Scissors, TestTube2, Siren, ArrowLeft } from 'lucide-react';

const SERVICES_DATA: Record<string, any> = {
  'emergency': { name: 'Emergency Unit', desc: '24/7 Trauma care and rapid response teams.', icon: Siren, cover: 'https://images.unsplash.com/photo-1587556754388-1250269ec237?auto=format&fit=crop&q=80&w=1200' },
  'diagnostics': { name: 'Diagnostics', desc: 'State-of-the-art X-Ray, Laboratory, and CT Scans.', icon: TestTube2, cover: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1200' },
  'surgery': { name: 'Surgery', desc: 'Modern OR Facilities with board-certified surgeons.', icon: Scissors, cover: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200' },
  'general-medicine': { name: 'General Medicine', desc: 'Comprehensive primary care for adults and families.', icon: Stethoscope, cover: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=1200' },
  'ob-gyn': { name: 'OB-GYN', desc: 'Dedicated maternal health and women’s wellness center.', icon: Baby, cover: 'https://images.unsplash.com/photo-1594824436951-7f12bc00a7e4?auto=format&fit=crop&q=80&w=1200' },
  'pediatrics': { name: 'Pediatrics', desc: 'Compassionate care for infants, children, and teens.', icon: Activity, cover: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=1200' },
};

export function ServiceDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const service = id ? SERVICES_DATA[id] : null;

  if (!service) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-black text-slate-900 mb-4">Service not found</h2>
        <Link to="/services" className="text-blue-600 hover:underline font-bold">Return to Services</Link>
      </div>
    );
  }

  const Icon = service.icon;

  return (
    <div className="pb-16">
      <div className="h-64 md:h-96 w-full relative bg-slate-900">
        <img src={service.cover} alt={service.name} className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full pb-8 md:pb-12 text-white">
            <Link to="/services" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-white mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Services
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tight">{service.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Overview</h2>
          <p className="text-slate-600 leading-relaxed mb-6 font-medium text-lg">
            {service.desc}
          </p>
          <p className="text-slate-500 leading-relaxed max-w-3xl">
            San Isidro Hospital is committed to giving you the best patient-first care possible. 
            Our {service.name} department operates with modern facilities, strict safety protocols, 
            and a team of highly experienced professionals ready to assist you.
          </p>
          
          <div className="mt-12">
            <Link to="/contact" className="inline-flex items-center px-6 py-3 bg-slate-900 hover:bg-black text-white font-bold text-sm rounded-xl transition-colors shadow-md">
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
