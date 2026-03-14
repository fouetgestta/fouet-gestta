import { useState } from 'react';
import { Plus, ChevronLeft, ChevronRight, MoreVertical, BarChart3 } from 'lucide-react';
import { formatCurrency, getStatusColor, getStatusLabel } from '../lib/utils';
import { demoEmployees } from '../lib/demo-data';

const permissionModules = [
  { id: 'FIN', label: 'Módulo Financeiro', desc: 'Controle total de entradas e saídas' },
  { id: 'EST', label: 'Módulo de Estoque', desc: 'Gestão de inventário e pedidos' },
  { id: 'VEN', label: 'Módulo de Vendas', desc: 'PDV e gestão de pedidos' },
  { id: 'ADM', label: 'Administrador do Sistema', desc: 'Acesso total a todas as funcionalidades' },
];

export default function EmployeesPage() {
  const [tab, setTab] = useState<'lista' | 'permissoes' | 'despesas'>('lista');
  const employees = demoEmployees;
  const totalSalary = employees.reduce((a, e) => a + e.salary, 0);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Controle de Funcionários</h1>
          <p className="text-[14px] text-text-muted mt-1">Gerencie sua equipe, salários e níveis de acesso em um só lugar com integração direta ao fluxo financeiro.</p>
        </div>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-[13px] font-medium rounded-md btn-press">
          <Plus size={16} /> Novo Colaborador
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Total de Colaboradores</span>
          <div className="flex items-end gap-2 mt-1">
            <p className="text-3xl font-bold text-secondary">{employees.length}</p>
            <span className="text-[12px] text-success font-medium mb-1">+2% mês</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Folha de Pagamento</span>
          <div className="flex items-end gap-2 mt-1">
            <p className="text-3xl font-bold text-secondary">{formatCurrency(totalSalary)}</p>
            <span className="text-[12px] text-success font-medium mb-1">+5.1%</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Próximo Pagamento</span>
          <div className="flex items-end gap-2 mt-1">
            <p className="text-3xl font-bold text-secondary">05 Abr</p>
            <span className="text-[11px] bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-md mb-1">Integrado</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex items-center gap-6">
          {([
            { id: 'lista', label: 'Lista de Colaboradores' },
            { id: 'permissoes', label: 'Gestão de Permissões' },
            { id: 'despesas', label: 'Relatórios & Despesas' },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-3 text-[13px] font-medium transition-colors ${
                tab === t.id ? 'text-secondary border-b-2 border-primary' : 'text-text-muted hover:text-secondary'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'lista' && (
        <div className="bg-white rounded-lg shadow-card border border-gray-100">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Colaborador</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Cargo</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Salário</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Acesso</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-right text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center text-white text-[11px] font-bold">
                        {emp.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-secondary">{emp.name}</p>
                        <p className="text-[11px] text-text-muted">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-[13px] text-text-muted">{emp.role}</td>
                  <td className="px-5 py-3 text-[13px] font-medium text-secondary">{formatCurrency(emp.salary)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1">
                      {emp.permissions.map((p) => (
                        <span key={p} className="text-[10px] font-medium bg-gray-100 text-text-muted px-1.5 py-0.5 rounded-sm">{p}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 text-[12px] font-medium ${getStatusColor(emp.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {getStatusLabel(emp.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button className="p-1.5 rounded-md hover:bg-gray-100 text-text-muted"><MoreVertical size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[12px] text-text-muted">Mostrando {employees.length} de {employees.length} colaboradores</p>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-50"><ChevronLeft size={14} /></button>
              <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-50"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      )}

      {tab === 'permissoes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {permissionModules.map((mod) => {
            const count = employees.filter((e) => e.permissions.includes(mod.id)).length;
            return (
              <div key={mod.id} className="bg-white rounded-lg shadow-card border border-gray-100 p-5 flex items-center justify-between card-hover">
                <div>
                  <p className="text-[14px] font-semibold text-secondary">{mod.label}</p>
                  <p className="text-[12px] text-text-muted mt-0.5">{mod.desc}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-text-muted">{count} usuários</span>
                  <button className="text-[12px] font-medium text-primary hover:text-primary-dark transition-colors">Configurar</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'despesas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-card border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[14px] font-semibold text-secondary">Previsão Folha - Abril</h3>
              <BarChart3 size={18} className="text-primary" />
            </div>
            <p className="text-3xl font-bold text-secondary mb-3">{formatCurrency(totalSalary + 3850)}</p>
            <div className="flex items-center justify-between bg-bg-light rounded-md p-3">
              <span className="text-[12px] text-text-muted">Integração com Contas a Pagar</span>
              <span className="text-[11px] font-semibold text-success">CONECTADO</span>
            </div>
            <div className="progress-bar mt-3">
              <div className="progress-bar-fill bg-primary" style={{ width: '75%' }} />
            </div>
            <p className="text-[11px] text-text-muted mt-1">75% da folha já provisionada no fluxo de caixa</p>
          </div>
        </div>
      )}
    </div>
  );
}
