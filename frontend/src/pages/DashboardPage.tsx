import { useAuth } from '../contexts/AuthContext';
import { DollarSign, ShoppingBag, TrendingUp, TrendingDown, BarChart3, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { formatCurrency } from '../lib/utils';
import { demoDashboardStats } from '../lib/demo-data';
import { Link } from 'react-router-dom';

export default function DashboardPage() {
  const { user } = useAuth();
  const stats = demoDashboardStats;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary">Olá, {user?.name || 'Gestor'}</h1>
        <p className="text-[14px] text-text-muted mt-1">
          Aqui está o que está acontecendo na Fouet Gestta hoje.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard
          label="FATURAMENTO DO DIA"
          value={formatCurrency(stats.daily_revenue)}
          change={stats.daily_revenue_change}
          icon={<DollarSign size={18} className="text-primary" />}
          barColor="bg-primary"
        />
        <MetricCard
          label="QTD PEDIDOS"
          value={String(stats.daily_orders)}
          change={stats.daily_orders_change}
          icon={<ShoppingBag size={18} className="text-primary" />}
          barColor="bg-primary"
        />
        <MetricCard
          label="TICKET MÉDIO"
          value={formatCurrency(stats.average_ticket)}
          change={stats.average_ticket_change}
          icon={<BarChart3 size={18} className="text-primary" />}
          barColor="bg-primary"
        />
      </div>

      {/* Chart + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-card border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-[16px] font-semibold text-secondary">Desempenho Semanal</h2>
              <p className="text-[13px] text-text-muted">Vendas brutas nos últimos 7 dias</p>
            </div>
            <select className="text-[13px] px-3 py-1.5 bg-bg-light border border-gray-200 rounded-md text-secondary outline-none focus:ring-2 focus:ring-primary/30">
              <option>Esta Semana</option>
              <option>Semana Passada</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stats.weekly_sales} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: '#8892A0' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#8892A0' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `R$${v / 1000}k`}
              />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #f0f0f0', fontSize: 13 }}
                formatter={(value: any) => [formatCurrency(Number(value)), '']}
              />
              <Legend
                wrapperStyle={{ fontSize: 12 }}
                formatter={(value) => value === 'fisico' ? 'Loja Física' : 'Plataformas'}
              />
              <Bar dataKey="fisico" fill="#3EDECF" radius={[3, 3, 0, 0]} maxBarSize={28} />
              <Bar dataKey="plataformas" fill="#1B2B3A" radius={[3, 3, 0, 0]} maxBarSize={28} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Financial Alerts */}
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-6">
          <h2 className="text-[16px] font-semibold text-secondary mb-4">Alertas Financeiros</h2>

          <div className="space-y-3 mb-6">
            <div className="bg-danger-light rounded-md p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center shrink-0">
                  <AlertTriangle size={16} className="text-danger" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-secondary">Contas em Atraso</p>
                  <p className="text-[12px] text-text-muted mt-0.5">
                    {stats.overdue_bills} faturas pendentes de fornecedores que venceram ontem.
                  </p>
                  <a href="#" className="text-[12px] text-primary font-medium mt-1 inline-block hover:text-primary-dark">
                    Ver Detalhes
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-warning-light rounded-md p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                  <Clock size={16} className="text-warning" />
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-secondary">Contas a Vencer</p>
                  <p className="text-[12px] text-text-muted mt-0.5">
                    Amanhã vencem {stats.upcoming_bills} pagamentos ({formatCurrency(stats.upcoming_bills_amount)}).
                  </p>
                  <a href="#" className="text-[12px] text-primary font-medium mt-1 inline-block hover:text-primary-dark">
                    Agendar Pagamentos
                  </a>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[12px] text-text-muted italic mb-4">Nenhum novo alerta de sistema.</p>

          <Link
            to="/financeiro"
            className="flex items-center justify-center gap-1.5 text-[13px] text-primary font-medium hover:text-primary-dark transition-colors py-2 border-t border-gray-100"
          >
            Ir para Financeiro <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, change, icon, barColor }: {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  barColor: string;
}) {
  const isPositive = change >= 0;
  return (
    <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">{label}</span>
        {icon}
      </div>
      <div className="flex items-end gap-2 mb-3">
        <span className="text-2xl font-bold text-secondary">{value}</span>
        <span className={`flex items-center gap-0.5 text-[12px] font-medium ${isPositive ? 'text-success' : 'text-danger'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isPositive ? '+' : ''}{change}%
        </span>
      </div>
      <div className="progress-bar">
        <div className={`progress-bar-fill ${barColor}`} style={{ width: `${Math.min(Math.abs(change) * 5 + 40, 100)}%` }} />
      </div>
    </div>
  );
}
