import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Upload, Send, Sparkles, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.jpeg';

export default function OrderPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    description: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages([...images, ...files]);
    const newPreviews = files.map((f) => URL.createObjectURL(f));
    setPreviews([...previews, ...newPreviews]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-bg-light flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <FloatingElements />
        <div className="animate-scale-in text-center">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Sparkles size={36} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-secondary mb-3">Pedido Enviado!</h1>
          <p className="text-text-muted max-w-md">
            Obrigado, <strong>{formData.name}</strong>! Nossa equipe entrará em contato em até 24h úteis.
          </p>
          <button
            onClick={() => { setIsSubmitted(false); setFormData({ name: '', phone: '', email: '', description: '' }); setImages([]); setPreviews([]); }}
            className="mt-8 px-6 py-2.5 bg-primary text-white font-medium rounded-md btn-press text-[14px]"
          >
            Fazer Novo Pedido
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light relative overflow-hidden">
      <FloatingElements />

      {/* Header */}
      <header className="relative z-10 border-b border-gray-200/50 glass">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="Fouet Gestta" className="w-7 h-7 rounded-md object-cover" />
            <span className="font-semibold text-secondary text-[15px]">Fouet Gestta</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#form" className="text-[13px] text-text-muted hover:text-secondary transition-colors">Início</a>
            <a href="#galeria" className="text-[13px] text-text-muted hover:text-secondary transition-colors">Galeria</a>
            <a href="#sobre" className="text-[13px] text-text-muted hover:text-secondary transition-colors">Sobre</a>
            <a href="#contato" className="text-[13px] text-text-muted hover:text-secondary transition-colors">Contato</a>
          </nav>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-[11px] font-bold">
            FG
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-6">
        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-[11px] font-semibold uppercase tracking-wider rounded-md mb-4">
          Personalização Premium
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-secondary leading-tight">
          Crie seu Bolo <span className="text-primary">Inesquecível</span>
        </h1>
        <p className="text-text-muted text-[15px] mt-3 max-w-xl">
          Nossos chefs confeiteiros transformam sua visão em uma obra de arte comestível. Preencha os detalhes abaixo para iniciarmos seu projeto.
        </p>
      </section>

      {/* Form */}
      <section id="form" className="relative z-10 max-w-5xl mx-auto px-6 pb-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-card border border-gray-100 p-8">
          {/* Personal Data */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-[12px] font-medium text-text-muted uppercase tracking-wider mb-1.5 block">
                Nome Completo <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Ex: Maria Oliveira"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-bg-light border border-gray-200 rounded-md text-[14px] text-secondary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <label className="text-[12px] font-medium text-text-muted uppercase tracking-wider mb-1.5 block">
                Telefone <span className="text-danger">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2.5 bg-bg-light border border-gray-200 rounded-md text-[14px] text-secondary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="mb-8">
            <label className="text-[12px] font-medium text-text-muted uppercase tracking-wider mb-1.5 block">
              E-mail <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-bg-light border border-gray-200 rounded-md text-[14px] text-secondary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          <hr className="border-gray-100 mb-8" />

          {/* Cake Details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-secondary flex items-center gap-2 mb-1">
              <Sparkles size={18} className="text-primary" />
              Sobre o Bolo
            </h3>
            <p className="text-[13px] text-text-muted mb-4">Conte-nos sobre o seu bolo dos sonhos</p>
            <textarea
              name="description"
              rows={4}
              placeholder="Descreva o sabor, cores, tema e número de convidados..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-bg-light border border-gray-200 rounded-md text-[14px] text-secondary outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-8">
            <label className="text-[12px] font-medium text-text-muted uppercase tracking-wider mb-2 block">
              Fotos de Inspiração (Opcional)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-primary/30 rounded-md p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors"
            >
              <Upload size={24} className="text-primary mx-auto mb-2" />
              <p className="text-[13px] text-text-muted">
                <span className="text-primary font-medium">Clique para anexar</span> ou arraste imagens aqui
              </p>
              <p className="text-[11px] text-text-muted mt-1">PNG, JPG ou PDF até 10MB</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            {previews.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {previews.map((url, i) => (
                  <img key={i} src={url} alt={`Preview ${i + 1}`} className="w-16 h-16 rounded-md object-cover border border-gray-200" />
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-md btn-press text-[15px] flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Solicitar Orçamento <Send size={16} />
              </>
            )}
          </button>
          <p className="text-[12px] text-text-muted text-center mt-3">
            Nossa equipe entrará em contato em até 24h úteis.
          </p>
        </form>
      </section>

      {/* Gallery */}
      <section id="galeria" className="relative z-10 max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-bold text-secondary text-center mb-8">
          Inspire-se com nossas últimas criações
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['🎂', '🧁', '🍰', '🍩'].map((emoji, i) => (
            <div key={i} className="aspect-square rounded-lg bg-gradient-to-br from-primary/5 to-primary/15 flex items-center justify-center text-5xl card-hover cursor-pointer">
              {emoji}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200/50 bg-white/50">
        <div className="max-w-5xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Fouet Gestta" className="w-5 h-5 rounded-sm object-cover" />
            <span className="text-[13px] font-medium text-secondary">Fouet Gestta</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12px] text-text-muted hover:text-secondary transition-colors">Instagram</a>
            <a href="#" className="text-[12px] text-text-muted hover:text-secondary transition-colors">WhatsApp</a>
            <a href="#" className="text-[12px] text-text-muted hover:text-secondary transition-colors">Email</a>
          </div>
          <p className="text-[11px] text-text-muted">© 2024 Fouet Gestta. Todos os direitos reservados.</p>
        </div>
        {/* Portal do Colaborador - discreto */}
        <div className="text-center pb-4">
          <Link
            to="/login"
            className="inline-flex items-center gap-1 text-[11px] text-text-muted/50 hover:text-primary transition-colors"
          >
            Portal do Colaborador <ChevronRight size={10} />
          </Link>
        </div>
      </footer>
    </div>
  );
}

// Floating decorative elements
function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute top-40 right-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-1/3 w-64 h-64 bg-primary/4 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute top-1/2 right-10 w-20 h-20 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '4s' }} />
      <div className="absolute bottom-20 right-1/4 w-14 h-14 bg-primary/15 rounded-full animate-float" style={{ animationDelay: '1s' }} />
    </div>
  );
}
