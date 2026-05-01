import { Phone, Search, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export function QuickActions() {
  const actions = [
    { name: 'Call Now', icon: Phone, href: 'tel:123456789', color: 'text-blue-600', hoverBg: 'hover:bg-blue-50', isExternal: true },
    { name: 'Find Doctor', icon: Search, href: '/doctors', color: 'text-slate-700', hoverBg: 'hover:bg-slate-100', isExternal: false },
    { name: 'Directions', icon: MapPin, href: '/contact', color: 'text-blue-600', hoverBg: 'hover:bg-blue-50', isExternal: false },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-2 py-2 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
      <div className="flex justify-around items-center max-w-sm mx-auto">
        {actions.map((item) => {
          const content = (
            <>
              <div className={`p-2 rounded-full bg-slate-50 ${item.color} shadow-sm border border-slate-100`}>
                <item.icon size={18} strokeWidth={2.5} />
              </div>
              <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest leading-none mt-1">
                {item.name}
              </span>
            </>
          );

          const linkClass = `flex flex-col items-center justify-center w-full p-2 active:scale-95 transition-all rounded-xl ${item.hoverBg}`;

          return item.isExternal ? (
            <a key={item.name} href={item.href} className={linkClass}>
              {content}
            </a>
          ) : (
            <Link key={item.name} to={item.href} className={linkClass}>
              {content}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
