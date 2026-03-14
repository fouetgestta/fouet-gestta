import { useState } from 'react';
import { Plus, ShoppingCart, Trash2, Download } from 'lucide-react';
import { formatCurrency, getStatusLabel, getStatusColor, getSourceLabel, getSourceColor } from '../lib/utils';
import { demoOrders, demoProducts, pdvCategories } from '../lib/demo-data';
import type { CartItem, Order, OrderStatus } from '../types';

const kanbanColumns: { status: OrderStatus; label: string }[] = [
  { status: 'recebido', label: 'RECEBIDO' },
  { status: 'em_producao', label: 'EM PRODUÇÃO' },
  { status: 'pronto', label: 'PRONTO' },
  { status: 'entrega', label: 'ENTREGA' },
];

export default function SalesPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState(demoOrders);
  const [activeTab, setActiveTab] = useState<'pdv' | 'kanban' | 'historico'>('pdv');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [platformFilter] = useState<string>('all');

  const addToCart = (product: typeof demoProducts[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cart.reduce((acc, item) => acc + item.product.sale_price * item.quantity, 0);

  const handleFinalizeSale = () => {
    if (cart.length === 0) return;
    alert('Venda finalizada com sucesso! (Demo)');
    setCart([]);
  };

  const moveOrder = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
  };

  const filteredProducts = selectedCategory === 'all'
    ? demoProducts
    : demoProducts.filter((p) => p.category === selectedCategory);

  const filteredOrders = platformFilter === 'all'
    ? orders
    : orders.filter((o) => o.source === platformFilter);

  return (
    <div className="animate-fade-in">
      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6 bg-gray-100/70 rounded-md p-1 w-fit">
        {(['pdv', 'kanban', 'historico'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition-all ${
              activeTab === tab
                ? 'bg-white text-secondary shadow-sm'
                : 'text-text-muted hover:text-secondary'
            }`}
          >
            {tab === 'pdv' ? 'PDV' : tab === 'kanban' ? 'Pedidos' : 'Histórico'}
          </button>
        ))}
      </div>

      {activeTab === 'pdv' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Products */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-card border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[16px] font-semibold text-secondary flex items-center gap-2">
                <ShoppingCart size={18} className="text-primary" />
                Venda Rápida PDV
              </h2>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 text-[12px] font-medium text-primary border border-primary/30 rounded-md hover:bg-primary/5 transition-colors">
                  NOVO CLIENTE
                </button>
                <button className="px-3 py-1.5 text-[12px] font-medium text-text-muted border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                  HISTÓRICO
                </button>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`shrink-0 px-4 py-2 rounded-md text-[13px] font-medium transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-secondary text-white'
                    : 'bg-gray-100 text-text-muted hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {pdvCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`shrink-0 px-4 py-2 rounded-md text-[13px] font-medium transition-all flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-secondary text-white'
                      : 'bg-gray-100 text-text-muted hover:bg-gray-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
              <button className="shrink-0 w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-text-muted hover:bg-gray-200 transition-colors">
                <Plus size={18} />
              </button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
              {filteredProducts.map((product) => (
                <button
                  key={product.id}
                  onClick={() => addToCart(product)}
                  className="p-4 bg-bg-light rounded-md border border-gray-100 text-left hover:border-primary/30 hover:bg-primary/5 transition-all btn-press"
                >
                  <div className="text-2xl mb-2">
                    {product.category === 'bolos' ? '🎂' : product.category === 'doces' ? '🍬' : product.category === 'bebidas' ? '🥤' : '🥐'}
                  </div>
                  <p className="text-[13px] font-medium text-secondary truncate">{product.name}</p>
                  <p className="text-[14px] font-bold text-primary mt-1">{formatCurrency(product.sale_price)}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5">
            <h3 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider mb-3">CARRINHO ATUAL</h3>
            {cart.length === 0 ? (
              <p className="text-[13px] text-text-muted text-center py-8">Carrinho vazio</p>
            ) : (
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between py-1.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] text-secondary truncate">{item.quantity}x {item.product.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[13px] font-medium text-secondary">{formatCurrency(item.product.sale_price * item.quantity)}</span>
                      <button onClick={() => removeFromCart(item.product.id)} className="text-text-muted hover:text-danger transition-colors">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="border-t border-gray-100 pt-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-[13px] text-text-muted">Total</span>
                <span className="text-xl font-bold text-secondary">{formatCurrency(cartTotal)}</span>
              </div>
            </div>
            <button
              onClick={handleFinalizeSale}
              disabled={cart.length === 0}
              className="w-full py-2.5 bg-secondary text-white font-semibold rounded-md btn-press text-[14px] flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <ShoppingCart size={16} />
              Finalizar Venda
            </button>
          </div>
        </div>
      )}

      {activeTab === 'kanban' && (
        <div>
          {/* Status Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-[16px] font-semibold text-secondary">Status de Pedidos</h2>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-success bg-success-light px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 bg-success rounded-full" />
                Sistema Online
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                <img src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'/>" alt="" className="w-4 h-4" />
                iFood ({orders.filter((o) => o.source === 'ifood').length})
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                Uber Eats ({orders.filter((o) => o.source === 'uber_eats').length})
              </button>
              <button
                onClick={() => {/* open new order modal */}}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-primary text-white rounded-md btn-press"
              >
                <Plus size={14} /> Novo Pedido
              </button>
            </div>
          </div>

          {/* Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kanbanColumns.map((col) => {
              const colOrders = filteredOrders.filter((o) => o.status === col.status);
              return (
                <div key={col.status} className="min-h-[300px]">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-[12px] font-semibold text-text-muted uppercase tracking-wider">{col.label}</h3>
                    <span className="w-5 h-5 rounded-full bg-gray-100 text-[11px] font-medium text-text-muted flex items-center justify-center">
                      {colOrders.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {colOrders.map((order) => (
                      <KanbanCard key={order.id} order={order} onMove={moveOrder} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activeTab === 'historico' && (
        <div className="bg-white rounded-lg shadow-card border border-gray-100">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-[16px] font-semibold text-secondary">Resumo de Vendas Recentes</h2>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 text-[12px] font-medium text-text-muted border border-gray-200 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                <Download size={12} /> Exportar CSV
              </button>
              <button className="px-3 py-1.5 text-[12px] font-medium bg-primary text-white rounded-md btn-press">
                Ver Todas
              </button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">ID Pedido</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Cliente</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Plataforma</th>
                <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-right text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Valor Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 8).map((order) => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-5 py-3 text-[13px] text-text-muted">{order.code}</td>
                  <td className="px-5 py-3 text-[13px] text-secondary font-medium">{order.customer_name}</td>
                  <td className="px-5 py-3">
                    <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded-md ${getSourceColor(order.source)}`}>
                      {getSourceLabel(order.source)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`inline-flex items-center gap-1 text-[12px] ${getStatusColor(order.status)}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {getStatusLabel(order.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[13px] font-medium text-secondary text-right">{formatCurrency(order.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function KanbanCard({ order, onMove }: { order: Order; onMove: (id: string, status: OrderStatus) => void }) {
  const nextStatus: Record<string, OrderStatus> = {
    recebido: 'em_producao',
    em_producao: 'pronto',
    pronto: 'entrega',
    entrega: 'concluido',
  };
  const actionLabel: Record<string, string> = {
    recebido: 'Aceitar',
    em_producao: 'Finalizar',
    pronto: 'Chamar Motoboy',
    entrega: 'Concluir',
  };

  return (
    <div className="bg-white rounded-md shadow-card border border-gray-100 p-4 kanban-card">
      <div className="flex items-center justify-between mb-2">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${getSourceColor(order.source)} px-1.5 py-0.5 rounded-sm`}>
          {getSourceLabel(order.source)} {order.code}
        </span>
        <span className="text-[11px] text-text-muted">
          {new Date(order.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <p className="text-[14px] font-semibold text-secondary">{order.customer_name}</p>
      <p className="text-[12px] text-text-muted mt-0.5 truncate">
        {order.items.map((i) => `${i.quantity}x ${i.product_name}`).join(', ') || order.description?.slice(0, 50)}
      </p>
      <div className="flex items-center justify-between mt-3">
        <span className="text-[14px] font-bold text-secondary">{formatCurrency(order.total)}</span>
        {nextStatus[order.status] && (
          <button
            onClick={() => onMove(order.id, nextStatus[order.status])}
            className="px-3 py-1 text-[11px] font-medium bg-primary text-white rounded-md btn-press"
          >
            {actionLabel[order.status]}
          </button>
        )}
      </div>
    </div>
  );
}
