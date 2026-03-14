import React, { useState } from 'react';
import { Building2, User, Shield, Bell, Lock, Upload, Check } from 'lucide-react';

type SettingsSection = 'empresa' | 'conta' | 'fiscal' | 'notificacoes' | 'seguranca';

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('empresa');
  const [nfceEnabled, setNfceEnabled] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const sections: { id: SettingsSection; label: string; icon: React.ReactNode }[] = [
    { id: 'empresa', label: 'Dados da Empresa', icon: <Building2 size={16} /> },
    { id: 'conta', label: 'Minha Conta', icon: <User size={16} /> },
    { id: 'fiscal', label: 'Fiscal & Certificados', icon: <Shield size={16} /> },
    { id: 'notificacoes', label: 'Notificações', icon: <Bell size={16} /> },
    { id: 'seguranca', label: 'Segurança', icon: <Lock size={16} /> },
  ];

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-secondary mb-6">Ajustes</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-1">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-md text-[13px] font-medium transition-all ${
                activeSection === s.id
                  ? 'bg-primary/10 text-primary'
                  : 'text-text-muted hover:bg-gray-50 hover:text-secondary'
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeSection === 'empresa' && (
            <div className="bg-white rounded-lg shadow-card border border-gray-100 p-6 animate-fade-in">
              <h2 className="text-[16px] font-semibold text-secondary mb-1">Perfil da Empresa</h2>
              <p className="text-[13px] text-text-muted mb-6">Gerencie a identidade visual e informações básicas da sua empresa.</p>

              {/* Logo Upload */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-24 h-24 rounded-lg bg-bg-light border-2 border-dashed border-gray-200 flex items-center justify-center text-text-muted">
                  <Upload size={24} />
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-secondary mb-1">Logotipo da Empresa</h3>
                  <p className="text-[12px] text-text-muted mb-3">Formatos aceitos: PNG, JPG. Tamanho máximo: 2MB. Recomendado 512×512px.</p>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 bg-primary text-white text-[12px] font-medium rounded-md btn-press">Subir Logo</button>
                    <button className="px-3 py-1.5 text-text-muted text-[12px] font-medium hover:text-secondary transition-colors">Remover</button>
                  </div>
                </div>
              </div>

              {/* Company Data */}
              <h3 className="text-[14px] font-semibold text-secondary mb-4">Dados Jurídicos</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Razão Social</label>
                  <input type="text" defaultValue="Fouet Gestta Ltda" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">CNPJ</label>
                  <input type="text" defaultValue="00.000.000/0001-00" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Inscrição Estadual</label>
                  <input type="text" defaultValue="Isento" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Regime Tributário</label>
                  <select defaultValue="simples" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="mei">MEI</option>
                    <option value="simples">Simples Nacional</option>
                    <option value="lucro_presumido">Lucro Presumido</option>
                  </select>
                </div>
              </div>

              {/* Address */}
              <h3 className="text-[14px] font-semibold text-secondary mb-4">Endereço</h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">CEP</label>
                  <input type="text" defaultValue="29000-000" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Logradouro</label>
                  <input type="text" defaultValue="Av. Nossa Senhora da Penha" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Número</label>
                  <input type="text" defaultValue="1000" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Bairro</label>
                  <input type="text" defaultValue="Praia do Canto" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Cidade</label>
                  <input type="text" defaultValue="Vitória - ES" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button className="px-4 py-2 text-[13px] text-text-muted hover:text-secondary transition-colors">Descartar</button>
                <button onClick={handleSave} className="px-5 py-2 bg-primary text-white text-[13px] font-medium rounded-md btn-press flex items-center gap-1.5">
                  {saved ? <><Check size={14} /> Salvo!</> : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'fiscal' && (
            <div className="bg-white rounded-lg shadow-card border border-gray-100 p-6 animate-fade-in">
              <h2 className="text-[16px] font-semibold text-secondary mb-4">Configurações Fiscais & Emissão</h2>

              {/* Certificate */}
              <div className="bg-bg-light rounded-md p-4 flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Shield size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-secondary">Certificado Digital A1</p>
                    <p className="text-[12px] text-text-muted">Nenhum certificado carregado atualmente.</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-secondary text-white text-[13px] font-medium rounded-md btn-press">
                  Importar .pfx
                </button>
              </div>

              {/* NFC-e Config */}
              <div className="bg-bg-light rounded-md p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[14px] font-medium text-secondary">NFC-e (Nota de Consumidor)</span>
                  <button
                    onClick={() => setNfceEnabled(!nfceEnabled)}
                    className={`relative w-10 h-5 rounded-full transition-colors ${nfceEnabled ? 'bg-primary' : 'bg-gray-300'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${nfceEnabled ? 'translate-x-5' : ''}`} />
                  </button>
                </div>
                {nfceEnabled && (
                  <div className="grid grid-cols-2 gap-4 mt-3 animate-slide-down">
                    <div>
                      <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">SÉRIE</label>
                      <input type="number" defaultValue={1} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">NÚMERO INICIAL</label>
                      <input type="number" defaultValue={100} className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                    </div>
                  </div>
                )}
              </div>

              {/* Environment */}
              <div className="bg-bg-light rounded-md p-4 flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-medium text-secondary">Ambiente de Emissão</p>
                  <p className="text-[12px] text-text-muted mt-0.5">Você está em modo de teste. As notas emitidas não possuem valor fiscal.</p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 bg-warning-light text-warning text-[11px] font-semibold rounded-md mb-1">HOMOLOGAÇÃO</span>
                  <button className="block text-[12px] text-primary font-medium hover:text-primary-dark transition-colors">
                    Alternar para Produção →
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6">
                <button className="px-4 py-2 text-[13px] text-text-muted hover:text-secondary transition-colors">Descartar</button>
                <button onClick={handleSave} className="px-5 py-2 bg-primary text-white text-[13px] font-medium rounded-md btn-press flex items-center gap-1.5">
                  {saved ? <><Check size={14} /> Salvo!</> : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'conta' && (
            <div className="bg-white rounded-lg shadow-card border border-gray-100 p-6 animate-fade-in">
              <h2 className="text-[16px] font-semibold text-secondary mb-4">Minha Conta</h2>
              <div className="flex items-start gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-2xl font-bold">G</div>
                <div>
                  <h3 className="text-[14px] font-medium text-secondary mb-1">Foto de Perfil</h3>
                  <p className="text-[12px] text-text-muted mb-3">Formatos aceitos: PNG, JPG.</p>
                  <button className="px-3 py-1.5 bg-primary text-white text-[12px] font-medium rounded-md btn-press">Alterar Foto</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Nome Completo</label>
                  <input type="text" defaultValue="Gestor" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">E-mail</label>
                  <input type="email" defaultValue="helderkock2008@gmail.com" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button className="px-4 py-2 text-[13px] text-text-muted">Descartar</button>
                <button onClick={handleSave} className="px-5 py-2 bg-primary text-white text-[13px] font-medium rounded-md btn-press">
                  {saved ? 'Salvo!' : 'Salvar Alterações'}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'notificacoes' && (
            <div className="bg-white rounded-lg shadow-card border border-gray-100 p-6 animate-fade-in">
              <h2 className="text-[16px] font-semibold text-secondary mb-4">Preferências de Notificação</h2>
              <div className="space-y-4">
                {[
                  { label: 'Novos pedidos', desc: 'Receba notificação ao receber novos pedidos' },
                  { label: 'Estoque baixo', desc: 'Alerta quando insumos atingirem o estoque mínimo' },
                  { label: 'Contas a vencer', desc: 'Lembrete 3 dias antes do vencimento' },
                  { label: 'Relatórios semanais', desc: 'Resumo semanal por e-mail' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-[13px] font-medium text-secondary">{item.label}</p>
                      <p className="text-[12px] text-text-muted">{item.desc}</p>
                    </div>
                    <button className="relative w-10 h-5 rounded-full bg-primary transition-colors">
                      <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-white" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'seguranca' && (
            <div className="bg-white rounded-lg shadow-card border border-gray-100 p-6 animate-fade-in">
              <h2 className="text-[16px] font-semibold text-secondary mb-4">Segurança</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Senha Atual</label>
                  <input type="password" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Nova Senha</label>
                  <input type="password" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Confirmar Nova Senha</label>
                  <input type="password" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-6">
                <button onClick={handleSave} className="px-5 py-2 bg-primary text-white text-[13px] font-medium rounded-md btn-press">Alterar Senha</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center justify-between text-[11px] text-text-muted">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 border border-gray-200 rounded-md">🌐 Português (Brasil)</span>
        </div>
        <p>© 2024 Fouet Gestta Sistemas S.A.</p>
      </div>
    </div>
  );
}
