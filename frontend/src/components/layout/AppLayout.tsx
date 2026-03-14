import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-bg-light">
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 py-6 animate-fade-in">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200/50 mt-8">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-[11px] text-text-muted">
            © 2024 FOUET GESTTA. TODOS OS DIREITOS RESERVADOS.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-[11px] text-text-muted hover:text-secondary transition-colors">Suporte</a>
            <a href="#" className="text-[11px] text-text-muted hover:text-secondary transition-colors">Privacidade</a>
            <a href="#" className="text-[11px] text-text-muted hover:text-secondary transition-colors">Configurações</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
