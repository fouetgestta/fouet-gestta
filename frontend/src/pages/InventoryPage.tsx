import { useState } from 'react';
import { Search, FileText, Download, TrendingUp, TrendingDown, AlertTriangle, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { demoIngredients, demoInventoryStats } from '../lib/demo-data';

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const stats = demoInventoryStats;
  const ingredients = demoIngredients;

  const lowStockItems = ingredients.filter((i) => i.quantity <= i.min_quantity);
  const filtered = ingredients.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="animate-fade-in">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center"><FileText size={18} className="text-primary" /></div>
            <span className="text-[12px] text-success font-medium flex items-center gap-0.5"><TrendingUp size={12} /> +{stats.total_items_change}%</span>
          </div>
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">TOTAL ITENS</span>
          <p className="text-3xl font-bold text-secondary mt-1">{stats.total_items}</p>
        </div>
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-md bg-warning/10 flex items-center justify-center"><AlertTriangle size={18} className="text-warning" /></div>
            <span className="text-[12px] text-danger font-medium flex items-center gap-0.5"><TrendingDown size={12} /> {stats.low_stock_change}%</span>
          </div>
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">ESTOQUE BAIXO</span>
          <p className="text-3xl font-bold text-secondary mt-1">{stats.low_stock}</p>
        </div>
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5 card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-md bg-secondary/10 flex items-center justify-center"><span className="text-sm">💰</span></div>
            <span className="text-[12px] text-danger font-medium flex items-center gap-0.5"><TrendingDown size={12} /> {stats.total_value_change}%</span>
          </div>
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">VALOR EM ESTOQUE</span>
          <p className="text-3xl font-bold text-secondary mt-1">{formatCurrency(stats.total_value)}</p>
        </div>
      </div>

      {/* Actions Row */}
      <div className="flex items-start gap-6 mb-6">
        {/* Entry + Alerts */}
        <div className="w-80 space-y-4 shrink-0">
          <button className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-md btn-press text-[14px] flex items-center justify-center gap-2">
            <FileText size={16} /> Entrada de Faturas
          </button>

          <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5">
            <h3 className="text-[14px] font-semibold text-secondary flex items-center gap-2 mb-3">
              <span className="text-danger">✱</span> Alertas de Segurança
            </h3>
            {lowStockItems.length > 0 ? (
              <div className="space-y-2">
                {lowStockItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-warning-light rounded-md p-3">
                    <div>
                      <p className="text-[13px] font-medium text-secondary">{item.name}</p>
                      <p className="text-[11px] text-danger font-medium">Restante: {item.quantity}{item.unit}</p>
                    </div>
                    <button className="px-3 py-1 text-[11px] font-medium bg-warning text-white rounded-md btn-press">
                      REPOR
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[13px] text-text-muted">Nenhum alerta no momento.</p>
            )}
          </div>
        </div>

        {/* Ingredients Table */}
        <div className="flex-1 bg-white rounded-lg shadow-card border border-gray-100">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-secondary">Insumos em Estoque</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gray-100/70 rounded-md px-3 py-1.5 gap-2">
                <Search size={14} className="text-text-muted" />
                <input
                  type="text"
                  placeholder="Buscar insumo..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-[13px] outline-none w-[140px]"
                />
              </div>
              <button className="px-3 py-1.5 text-[12px] font-medium text-text-muted border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                <Download size={12} /> Gerar PDF
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Item / Insumo</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Quantidade</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Custo Unit.</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Fornecedor</th>
                <th className="text-right text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((ing) => {
                const isLow = ing.quantity <= ing.min_quantity;
                return (
                  <tr key={ing.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{ing.icon}</span>
                        <span className="text-[13px] font-medium text-secondary">{ing.name}</span>
                      </div>
                    </td>
                    <td className={`px-5 py-3 text-[13px] font-medium ${isLow ? 'text-danger' : 'text-secondary'}`}>
                      {ing.quantity} {ing.unit}
                    </td>
                    <td className="px-5 py-3 text-[13px] text-secondary">{formatCurrency(ing.cost_per_unit)}</td>
                    <td className="px-5 py-3">
                      <span className="text-[12px] bg-gray-100 text-text-muted px-2 py-0.5 rounded-md">{ing.supplier}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button className="p-1.5 rounded-md hover:bg-gray-100 text-text-muted transition-colors"><MoreHorizontal size={14} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="p-4 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[12px] text-text-muted">Mostrando {filtered.length} de {ingredients.length} itens</p>
            <div className="flex items-center gap-1">
              <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-50"><ChevronLeft size={14} /></button>
              <button className="w-7 h-7 rounded-md border border-gray-200 flex items-center justify-center text-text-muted hover:bg-gray-50"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
