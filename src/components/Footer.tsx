import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-12 py-8 text-center pb-28 md:pb-8 flex flex-col items-center justify-center">
      <p className="text-xs text-slate-400 font-bold tracking-widest uppercase mb-4">
        &copy; {new Date().getFullYear()} San Isidro Hospital Angono • 24/7 Care
      </p>
    </footer>
  );
}
