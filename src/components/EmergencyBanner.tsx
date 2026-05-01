import { PhoneCall } from 'lucide-react';

export function EmergencyBanner() {
  return (
    <div className="bg-slate-900 text-white py-2.5 px-4 transform transition-all border-b border-black">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
          </span>
          <p className="font-bold uppercase tracking-widest text-[10px] text-slate-300">
            Emergency Hotline • 24/7 Priority Care
          </p>
        </div>
        <a
          href="tel:123456789"
          className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm hover:text-red-400 transition-colors w-full sm:w-auto justify-center"
        >
          <PhoneCall size={14} />
          <span>(02) 8123 4567</span>
        </a>
      </div>
    </div>
  );
}
