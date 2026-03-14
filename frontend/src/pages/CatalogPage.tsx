import { useState } from 'react';
import { Plus, Search, Upload, Trash2, Edit, MoreHorizontal, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { formatCurrency } from '../lib/utils';
import { demoProducts } from '../lib/demo-data';

export default function CatalogPage() {
  const [products] = useState(demoProducts);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewProduct, setShowNewProduct] = useState(false);
  const [marginSlider, setMarginSlider] = useState(100);

  const categories = ['all', 'bolos', 'doces', 'salgados', 'bebidas'];

  const filteredProducts = products.filter((p) => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const avgCost = products.reduce((a, p) => a + p.production_cost, 0) / products.length;
  const avgMargin = products.reduce((a, p) => a + p.margin_percent, 0) / products.length;

  // Simulated new product form data
  const demoIngCost = 20.50;
  const demoFixedCost = 4.00;
  const demoTotalCost = demoIngCost + demoFixedCost;
  const demoMarkup = demoTotalCost * (marginSlider / 100);
  const demoSuggestedPrice = demoTotalCost + demoMarkup;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Catálogo</h1>
          <p className="text-[14px] text-text-muted mt-1">Gestão inteligente de insumos e margens de lucro.</p>
        </div>
        <button
          onClick={() => setShowNewProduct(!showNewProduct)}
          className="flex items-center gap-1.5 px-4 py-2 bg-secondary text-white text-[13px] font-medium rounded-md btn-press"
        >
          <Plus size={16} /> Novo Produto
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">CUSTO MÉDIO DE PRODUÇÃO</span>
          <p className="text-xl font-bold text-secondary mt-1">{formatCurrency(avgCost)}</p>
          <span className="text-[12px] text-danger flex items-center gap-0.5 mt-1">
            <TrendingDown size={12} /> -4% vs último mês
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">MARGEM MÉDIA GERAL</span>
          <p className="text-xl font-bold text-primary mt-1">{avgMargin.toFixed(1)}%</p>
          <span className="text-[12px] text-text-muted flex items-center gap-0.5 mt-1">
            <Minus size={12} /> Estável
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-card border border-gray-100 p-5">
          <span className="text-[11px] font-medium text-text-muted uppercase tracking-wider">TOTAL EM CATÁLOGO</span>
          <p className="text-xl font-bold text-secondary mt-1">{products.length} Itens</p>
          <span className="text-[12px] text-success flex items-center gap-0.5 mt-1">
            <TrendingUp size={12} /> +2 novos produtos
          </span>
        </div>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow-card border border-gray-100 mb-6">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-[13px] font-medium rounded-md transition-colors ${
                  activeCategory === cat ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-secondary'
                }`}
              >
                {cat === 'all' ? 'Todos' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100/70 rounded-md px-3 py-1.5 gap-2">
              <Search size={14} className="text-text-muted" />
              <input
                type="text"
                placeholder="Buscar produto..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-[13px] outline-none w-[140px]"
              />
            </div>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">ID</th>
              <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Produto</th>
              <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Custo Produção</th>
              <th className="text-left text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Margem Sugerida</th>
              <th className="text-right text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Preço de Venda</th>
              <th className="text-right text-[11px] font-medium text-text-muted uppercase tracking-wider px-5 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3 text-[12px] text-text-muted">{product.code}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center text-sm">
                      {product.category === 'bolos' ? '🎂' : product.category === 'doces' ? '🍬' : product.category === 'bebidas' ? '🥤' : '🥐'}
                    </div>
                    <span className="text-[13px] font-medium text-secondary">{product.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-[13px] text-secondary">{formatCurrency(product.production_cost)}</td>
                <td className="px-5 py-3">
                  <span className="text-[12px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                    {product.margin_percent}% Markup
                  </span>
                </td>
                <td className="px-5 py-3 text-[13px] font-semibold text-secondary text-right">{formatCurrency(product.sale_price)}</td>
                <td className="px-5 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 rounded-md hover:bg-gray-100 text-text-muted transition-colors"><Edit size={14} /></button>
                    <button className="p-1.5 rounded-md hover:bg-gray-100 text-text-muted transition-colors"><MoreHorizontal size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Product + Pricing */}
      {showNewProduct && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
          {/* Product Form */}
          <div>
            <h2 className="text-xl font-bold text-secondary mb-4">Nova Ficha Técnica</h2>
            <div className="bg-white rounded-lg shadow-card border border-gray-100 p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Nome do Produto</label>
                  <input type="text" placeholder="Ex: Torta de Limão" className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Categoria</label>
                  <select className="w-full px-3 py-2 bg-bg-light border border-gray-200 rounded-md text-[13px] outline-none focus:ring-2 focus:ring-primary/30">
                    <option>Selecione...</option>
                    <option>Bolos</option>
                    <option>Doces</option>
                    <option>Salgados</option>
                    <option>Bebidas</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="mb-6">
                <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider mb-1 block">Foto do Produto</label>
                <div className="border-2 border-dashed border-gray-200 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors">
                  <Upload size={20} className="text-text-muted mx-auto mb-1" />
                  <p className="text-[12px] text-text-muted"><span className="text-primary font-medium">Clique para subir</span> ou arraste uma foto</p>
                  <p className="text-[10px] text-text-muted mt-0.5">PNG, JPG até 5MB</p>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[11px] font-medium text-text-muted uppercase tracking-wider">Insumos e Gramaturas</label>
                  <button className="text-[12px] text-primary font-medium flex items-center gap-1 hover:text-primary-dark">
                    <Plus size={12} /> Adicionar Insumo
                  </button>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Farinha de Trigo', qty: 500, cost: 2.50 },
                    { name: 'Chocolate Belga 70%', qty: 200, cost: 18.00 },
                  ].map((ing, i) => (
                    <div key={i} className="flex items-center gap-3 bg-bg-light p-3 rounded-md">
                      <div className="flex-1">
                        <p className="text-[11px] text-text-muted">Insumo</p>
                        <p className="text-[13px] font-medium text-secondary">{ing.name}</p>
                      </div>
                      <div className="w-20">
                        <p className="text-[11px] text-text-muted">Qtd (g/ml)</p>
                        <p className="text-[13px] font-medium text-secondary">{ing.qty}</p>
                      </div>
                      <div className="w-24">
                        <p className="text-[11px] text-text-muted">Custo Proporcional</p>
                        <p className="text-[13px] font-medium text-secondary">{formatCurrency(ing.cost)}</p>
                      </div>
                      <button className="text-text-muted hover:text-danger transition-colors"><Trash2 size={14} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div>
            <h2 className="text-xl font-bold text-secondary mb-4">Precificação Automática</h2>
            <div className="bg-secondary text-white rounded-lg shadow-card p-6">
              <div className="mb-4">
                <span className="text-[11px] font-medium text-white/60 uppercase tracking-wider">CUSTO TOTAL DE PRODUÇÃO</span>
                <p className="text-3xl font-bold text-primary mt-1">{formatCurrency(demoTotalCost)}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-medium text-white/60 uppercase tracking-wider">MARGEM DE LUCRO SUGERIDA (%)</span>
                  <span className="text-[14px] font-bold text-primary">{marginSlider}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="300"
                  value={marginSlider}
                  onChange={(e) => setMarginSlider(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-primary bg-white/20"
                />
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/60">Custo Insumos</span>
                  <span>{formatCurrency(demoIngCost)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/60">Markup ({marginSlider}%)</span>
                  <span className="text-primary">+ {formatCurrency(demoMarkup)}</span>
                </div>
                <div className="flex justify-between text-[13px]">
                  <span className="text-white/60">Custos Fixos/Gás</span>
                  <span>{formatCurrency(demoFixedCost)}</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-4 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[15px] font-medium">Preço Sugerido</span>
                  <span className="text-2xl font-bold text-primary">{formatCurrency(demoSuggestedPrice)}</span>
                </div>
              </div>

              <button className="w-full py-2.5 bg-primary text-white font-semibold rounded-md btn-press text-[14px] uppercase tracking-wider">
                SALVAR E PUBLICAR
              </button>
              <p className="text-[10px] text-white/40 text-center mt-2 uppercase tracking-wider">
                Cálculo baseado em valores atualizados dos insumos
              </p>
            </div>

            {/* Tip */}
            <div className="mt-4 bg-primary/5 border border-primary/20 rounded-md p-4">
              <p className="text-[12px] font-semibold text-primary mb-1">💡 DICA DO GESTTA</p>
              <p className="text-[12px] text-text-muted">
                Sua margem para este produto está <span className="text-success font-medium">15% acima</span> da média do mercado local. Considere revisar para maior competitividade.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
