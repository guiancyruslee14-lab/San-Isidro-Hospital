import { MapPin, Phone, Clock } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-8 md:py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 lg:p-12 overflow-hidden max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="bg-blue-50 text-blue-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Get into touch</span>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl mb-4 tracking-tight">Visit or Call Us</h2>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">We're here to help. Contact us for emergencies or for any general inquiries.</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">Location</h3>
                <p className="text-sm text-slate-600 mt-1 font-medium leading-snug">123 Manila East Road,<br />Angono, 1930 Rizal</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">Hotline 24/7</h3>
                <p className="text-sm text-slate-600 mt-1 font-medium leading-snug">(02) 8123 4567<br />+63 917 123 4567</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="bg-white p-2 rounded-xl shadow-sm text-blue-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-wide">Service Hours</h3>
                <p className="text-sm text-slate-600 mt-1 font-medium leading-snug">Open 24 Hours / 7 Days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
