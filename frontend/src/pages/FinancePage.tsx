import { useState } from 'react';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency, getStatusColor, getStatusLabel, formatDate } from '../lib/utils';
import { demoTransactions, demoFinanceStats, demoProfitability } from '../lib/demo-data';

const cashflowData = [
  { month: 'JAN', entradas: 38000, saidas: 28000 },
  { month: 'FEV', entradas: 42000, saidas: 31000 },
  { month: 'MAR', entradas: 45000, saidas: 33000 },
  { month: 'ABR', entradas: 42580, saidas: 35000 },
];

export default function FinancePage() {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const stats = demoFinanceStats;
  const profitability = demoProfitability;

  const filteredTransactions = filter === 'all'
    ? demoTransactions
    : demoTransactions.filter((t) => filter === 'income' ? t.type === 'income' : t.type === 'expense');

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-secondary">Gestão Financeira</h1>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-[13px] font-medium rounded-md btn-press">
          <Plus size={16} /> Nova Transação
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center"><TrendingUp size={18} className="text-primary" /></div>
            <span className="text-[12px] text-success font-medium flex items-center gap-0.5"><TrendingUp size={12} /> +{stats.balance_change}%</span>
          </div>
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Saldo Total</span>
          <p className="text-2xl font-bold text-secondary mt-1">{formatCurrency(stats.total_balance)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-md bg-success/10 flex items-center justify-center"><span className="text-success text-sm">↗</span></div>
            <span className="text-[12px] text-text-muted">Este mês</span>
          </div>
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Entradas Previstas</span>
          <p className="text-2xl font-bold text-secondary mt-1">{formatCurrency(stats.expected_income)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-md bg-danger/10 flex items-center justify-center"><span className="text-danger text-sm">↙</span></div>
            <span className="text-[12px] text-danger font-medium flex items-center gap-0.5"><TrendingDown size={12} /> -{formatCurrency(Math.abs(stats.expenses_change))}</span>
          </div>
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Saídas Agendadas</span>
          <p className="text-2xl font-bold text-secondary mt-1">{formatCurrency(stats.scheduled_expenses)}</p>
        </div>
      </div>

      {/* Chart + Profitability */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
        {/* Cashflow Chart */}
        <div className="lg:col-span-3 bg-white rounded-lg shadow-card border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-[16px] font-semibold text-secondary">Fluxo de Caixa</h2>
              <p className="text-[12px] text-text-muted">Comparativo Entradas vs Saídas</p>
            </div>
            <span className="text-[12px] text-text-muted">Últimos 6 meses</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8892A0' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#8892A0' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v / 1000}k`} />
              <Tooltip contentStyle={{ borderRadius: 8, fontSize: 13 }} formatter={(value: any) => [formatCurrency(Number(value)), '']} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="entradas" stroke="#10B981" strokeWidth={2} dot={{ r: 3 }} name="Entradas" />
              <Line type="monotone" dataKey="saidas" stroke="#EF4444" strokeWidth={2} dot={{ r: 3 }} name="Saídas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Profitability Card */}
        <div className="lg:col-span-2 bg-secondary rounded-lg shadow-card p-6 text-white">
          <h2 className="text-[16px] font-semibold mb-1">Relatório de Lucratividade</h2>
          <p className="text-[12px] text-white/50 mb-4">Baseado no faturamento líquido</p>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-[13px]">
              <span className="text-white/60">Faturamento Bruto</span>
              <span>{formatCurrency(profitability.gross_revenue)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-danger">Taxas iFood (23%)</span>
              <span className="text-danger">- {formatCurrency(profitability.platform_fees)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-danger">Taxas Cartão (2.9%)</span>
              <span className="text-danger">- {formatCurrency(profitability.card_fees)}</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-white/60">Custo de Insumos (CMV)</span>
              <span>- {formatCurrency(profitability.ingredient_costs)}</span>
            </div>
          </div>

          <div className="border-t border-white/10 pt-3">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">LUCRO LÍQUIDO</span>
                <p className="text-2xl font-bold text-primary mt-0.5">{formatCurrency(profitability.net_profit)}</p>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-white/40 uppercase">MARGEM</span>
                <p className="text-xl font-bold">{profitability.margin_percent}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-card border border-gray-100">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-[16px] font-semibold text-secondary">Contas a Pagar e Receber</h2>
          <div className="flex items-center gap-1 bg-gray-100/70 rounded-md p-0.5">
            {(['all', 'expense', 'income'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-[12px] font-medium rounded-md transition-all ${
                  filter === f ? 'bg-white text-secondary shadow-sm' : 'text-text-muted'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'expense' ? 'Boletos' : 'Faturas'}
              </button>
            ))}
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Vencimento</th>
              <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Descrição</th>
              <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Tipo</th>
              <th className="text-right text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Valor</th>
              <th className="text-center text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3 text-[13px] text-secondary">{formatDate(tx.due_date)}</td>
                <td className="px-5 py-3 text-[13px] text-secondary font-medium">{tx.description}</td>
                <td className="px-5 py-3 text-[12px]">
                  <span className={`px-2 py-0.5 rounded-md ${tx.type === 'income' ? 'bg-success-light text-success' : 'bg-gray-100 text-text-muted'}`}>
                    {tx.type === 'income' ? 'Receber' : 'Boleto / Pagar'}
                  </span>
                </td>
                <td className={`px-5 py-3 text-[13px] font-medium text-right ${tx.type === 'income' ? 'text-success' : 'text-danger'}`}>
                  {tx.type === 'income' ? '+' : '-'} {formatCurrency(tx.amount)}
                </td>
                <td className="px-5 py-3 text-center">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${getStatusColor(tx.status)}`}>
                    {getStatusLabel(tx.status)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
