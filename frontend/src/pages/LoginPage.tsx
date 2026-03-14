import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.jpeg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center px-4">
      {/* Logo & Title */}
      <div className="text-center mb-8 animate-fade-in">
        <div className="w-16 h-16 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center mx-auto mb-4">
          <img src={logo} alt="Fouet Gestta" className="w-10 h-10 rounded-lg object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-secondary">Fouet Gestta</h1>
        <p className="text-[14px] text-text-muted mt-1">Gestão inteligente para o seu negócio</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-card border border-gray-100 p-8 animate-slide-up">
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 px-4 py-2.5 bg-danger-light text-danger text-[13px] rounded-md animate-scale-in">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label className="text-[12px] font-medium text-text-muted uppercase tracking-wider mb-1.5 block">
              E-mail ou Usuário
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@gestta.com.br"
              required
              className="w-full px-4 py-2.5 bg-bg-light border border-gray-200 rounded-md text-[14px] text-secondary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-[12px] font-medium text-text-muted uppercase tracking-wider">
                Senha
              </label>
              <button type="button" className="text-[12px] text-primary hover:text-primary-dark font-medium transition-colors">
                Esqueceu a senha?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 bg-bg-light border border-gray-200 rounded-md text-[14px] text-secondary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-secondary transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 mb-6 cursor-pointer">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={(e) => setKeepLoggedIn(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/30 accent-primary"
            />
            <span className="text-[13px] text-text-muted">Mantenha-me conectado</span>
          </label>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-md btn-press text-[15px] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Acessar Conta <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <hr className="border-gray-100 my-6" />

        <p className="text-center text-[13px] text-text-muted">
          Ainda não tem uma conta?{' '}
          <a href="#" className="text-primary font-medium hover:text-primary-dark transition-colors">
            Solicite acesso
          </a>
        </p>
      </div>

      {/* Footer Links */}
      <div className="flex items-center gap-6 mt-8">
        <a href="#" className="flex items-center gap-1.5 text-[12px] text-text-muted hover:text-secondary transition-colors">
          <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px]">🛡</span>
          PRIVACIDADE
        </a>
        <a href="#" className="flex items-center gap-1.5 text-[12px] text-text-muted hover:text-secondary transition-colors">
          <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px]">❓</span>
          SUPORTE
        </a>
        <span className="flex items-center gap-1.5 text-[12px] text-text-muted">
          <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center text-[8px]">🌐</span>
          PORTUGUÊS (BR)
        </span>
      </div>
    </div>
  );
}
