import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  LayoutDashboard, ShoppingBag, BookOpen, Package, DollarSign,
  Users, Settings, Search, Bell, LogOut, ChevronDown, User
} from 'lucide-react';
import logo from '../../assets/logo.jpeg';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/vendas', label: 'Pedidos', icon: ShoppingBag },
  { path: '/catalogo', label: 'Produtos', icon: BookOpen },
  { path: '/estoque', label: 'Estoque', icon: Package },
  { path: '/financeiro', label: 'Financeiro', icon: DollarSign },
  { path: '/funcionarios', label: 'Equipe', icon: Users },
  { path: '/configuracoes', label: 'Configurações', icon: Settings },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-gray-200/50">
      <div className="max-w-[1440px] mx-auto px-6 flex items-center h-[56px]">
        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2.5 mr-8 shrink-0">
          <img src={logo} alt="Fouet Gestta" className="w-8 h-8 rounded-md object-cover" />
          <span className="font-semibold text-secondary text-[15px] tracking-tight">Fouet Gestta</span>
        </Link>

        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium rounded-md transition-all duration-150
                  ${isActive
                    ? 'text-secondary bg-gray-100/80'
                    : 'text-text-muted hover:text-secondary hover:bg-gray-50'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="ml-auto flex items-center gap-3">
          {/* Search */}
          <div className="hidden md:flex items-center bg-gray-100/70 rounded-md px-3 py-1.5 gap-2 w-[200px] focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-white transition-all">
            <Search size={14} className="text-text-muted shrink-0" />
            <input
              type="text"
              placeholder="Pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-[13px] outline-none w-full text-secondary placeholder:text-text-muted"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-md hover:bg-gray-100 transition-colors">
            <Bell size={18} className="text-text-muted" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-1 pr-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
                <User size={14} className="text-white" />
              </div>
              <ChevronDown size={12} className="text-text-muted" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-modal border border-gray-100 z-50 animate-scale-in overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-[13px] font-semibold text-secondary">{user?.name}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/configuracoes"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-text-primary hover:bg-gray-50 transition-colors"
                    >
                      <Settings size={14} className="text-text-muted" />
                      Configurações
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2.5 px-4 py-2 text-[13px] text-danger hover:bg-red-50 w-full transition-colors"
                    >
                      <LogOut size={14} />
                      Sair
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
