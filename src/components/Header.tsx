import { Link, useLocation } from 'react-router-dom';

export function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path ? 'text-blue-600' : 'hover:text-blue-600';

  return (
    <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between shadow-sm z-50 sticky top-0">
      <div className="flex items-center gap-3">
        <Link to="/" className="w-12 h-12 flex-shrink-0">
          <img 
            src="/logo.jpg" 
            alt="San Isidro Hospital Logo" 
            className="w-full h-full object-contain mix-blend-multiply"
            onError={(e) => {
              // Fallback if image isn't uploaded yet
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML = '<div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl drop-shadow-sm">SI</div>';
            }}
          />
        </Link>
        <div>
          <Link to="/" className="text-lg font-bold leading-none tracking-tight text-slate-900 block hover:text-blue-600 transition">SAN ISIDRO HOSPITAL</Link>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Angono, Rizal • 24/7 Care</p>
        </div>
      </div>
      <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-500 uppercase tracking-wider">
        <Link to="/" className={`${isActive('/')} transition-colors`}>Home</Link>
        <Link to="/doctors" className={`${isActive('/doctors')} transition-colors`}>Our Doctors</Link>
        <Link to="/services" className={`${isActive('/services')} transition-colors`}>Services</Link>
        <Link to="/about" className={`${isActive('/about')} transition-colors`}>About Us</Link>
        <Link to="/contact" className={`${isActive('/contact')} transition-colors`}>Contact Us</Link>
      </nav>
    </header>
  );
}
