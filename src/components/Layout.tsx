import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { EmergencyBanner } from './EmergencyBanner';
import { Header } from './Header';
import { QuickActions } from './QuickActions';
import { Footer } from './Footer';

export function Layout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Windows + / or Cmd + /
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        navigate('/admin');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 font-medium flex flex-col relative w-full overflow-x-hidden">
      <EmergencyBanner />
      <Header />
      <main className="flex-1 w-full max-w-full">
        <Outlet />
      </main>
      <QuickActions />
      <Footer />
    </div>
  );
}
