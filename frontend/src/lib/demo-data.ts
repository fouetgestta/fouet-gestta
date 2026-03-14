import type {
  Product, Order, Ingredient, Transaction, Employee,
  DashboardStats, InventoryStats, FinanceStats, ProfitabilityReport
} from '../types';

// ─── Produtos Demo ───
export const demoProducts: Product[] = [
  { id: 'prd-001', code: '#PRD-001', name: 'Bolo Trufado', category: 'bolos', description: 'Bolo de chocolate com recheio trufado', sale_price: 89.00, production_cost: 34.20, margin_percent: 60, company_id: 'c1', created_at: '2026-01-15', image_url: '' },
  { id: 'prd-002', code: '#PRD-002', name: 'Brigadeiro Gourmet', category: 'doces', description: 'Brigadeiro de chocolate belga 70%', sale_price: 4.50, production_cost: 1.20, margin_percent: 150, company_id: 'c1', created_at: '2026-01-20', image_url: '' },
  { id: 'prd-003', code: '#PRD-003', name: 'Torta de Limão', category: 'bolos', description: 'Torta com merengue italiano', sale_price: 65.00, production_cost: 22.50, margin_percent: 80, company_id: 'c1', created_at: '2026-02-01', image_url: '' },
  { id: 'prd-004', code: '#PRD-004', name: 'Cupcake Red Velvet', category: 'doces', description: 'Cupcake com cream cheese', sale_price: 12.00, production_cost: 4.80, margin_percent: 100, company_id: 'c1', created_at: '2026-02-10', image_url: '' },
  { id: 'prd-005', code: '#PRD-005', name: 'Suco Natural', category: 'bebidas', description: 'Suco de frutas frescas 500ml', sale_price: 14.00, production_cost: 5.00, margin_percent: 120, company_id: 'c1', created_at: '2026-02-12', image_url: '' },
  { id: 'prd-006', code: '#PRD-006', name: 'Bolo de Cenoura', category: 'bolos', description: 'Com cobertura de chocolate', sale_price: 55.00, production_cost: 18.00, margin_percent: 105, company_id: 'c1', created_at: '2026-02-15', image_url: '' },
  { id: 'prd-007', code: '#PRD-007', name: 'Coxinha Gourmet', category: 'salgados', description: 'Coxinha de frango com catupiry', sale_price: 8.00, production_cost: 2.80, margin_percent: 90, company_id: 'c1', created_at: '2026-02-20', image_url: '' },
  { id: 'prd-008', code: '#PRD-008', name: 'Café Espresso', category: 'bebidas', description: 'Café especial torrado artesanal', sale_price: 8.00, production_cost: 2.00, margin_percent: 200, company_id: 'c1', created_at: '2026-02-22', image_url: '' },
];

// ─── Pedidos Demo ───
export const demoOrders: Order[] = [
  { id: 'ord-001', code: '#1024', customer_name: 'João Silva', phone: '27999001122', email: 'joao@email.com', status: 'recebido', source: 'ifood', items: [{ id: 'i1', product_id: 'prd-001', product_name: 'Bolo Trufado', quantity: 1, unit_price: 89.00 }], total: 89.90, company_id: 'c1', created_at: '2026-03-14T10:45:00', updated_at: '2026-03-14T10:45:00' },
  { id: 'ord-002', code: '#1025', customer_name: 'Maria Oliveira', phone: '27999003344', email: 'maria@email.com', status: 'recebido', source: 'uber_eats', items: [{ id: 'i2', product_id: 'prd-004', product_name: 'Cupcake Red Velvet', quantity: 6, unit_price: 12.00 }], total: 124.00, company_id: 'c1', created_at: '2026-03-14T10:52:00', updated_at: '2026-03-14T10:52:00' },
  { id: 'ord-003', code: '#1026', customer_name: 'Pedro Santos', phone: '27999005566', email: 'pedro@email.com', status: 'em_producao', source: 'balcao', items: [{ id: 'i3', product_id: 'prd-006', product_name: 'Bolo de Cenoura', quantity: 1, unit_price: 55.00 }], total: 45.00, company_id: 'c1', created_at: '2026-03-14T09:30:00', updated_at: '2026-03-14T11:00:00' },
  { id: 'ord-004', code: '#1021', customer_name: 'Ana Costa', phone: '27999007788', email: 'ana@email.com', status: 'pronto', source: 'ifood', items: [{ id: 'i4', product_id: 'prd-007', product_name: 'Coxinha Gourmet', quantity: 3, unit_price: 8.00 }], total: 35.50, company_id: 'c1', created_at: '2026-03-14T08:15:00', updated_at: '2026-03-14T11:30:00' },
  { id: 'ord-005', code: '#1022', customer_name: 'Ricardo Lima', phone: '27999009900', email: 'ricardo@email.com', status: 'entrega', source: 'delivery_proprio', items: [{ id: 'i5', product_id: 'prd-003', product_name: 'Torta de Limão', quantity: 1, unit_price: 65.00 }], total: 65.00, company_id: 'c1', created_at: '2026-03-14T07:00:00', updated_at: '2026-03-14T12:00:00' },
  { id: 'ord-006', code: '#1023', customer_name: 'Renata Dias', phone: '27999112233', email: 'renata@email.com', status: 'concluido', source: 'balcao', items: [{ id: 'i6', product_id: 'prd-002', product_name: 'Brigadeiro Gourmet', quantity: 5, unit_price: 4.50 }], total: 35.50, company_id: 'c1', created_at: '2026-03-13T16:00:00', updated_at: '2026-03-13T17:00:00' },
  { id: 'ord-007', code: '#1020', customer_name: 'Lucas Fernandes', phone: '27999334455', email: 'lucas@email.com', description: 'Bolo de aniversário tema unicórnio para 30 pessoas, com recheio de morango e cobertura de chantilly colorido', status: 'recebido', source: 'formulario', items: [], total: 0, company_id: 'c1', created_at: '2026-03-14T11:00:00', updated_at: '2026-03-14T11:00:00' },
  { id: 'ord-008', code: '#1019', customer_name: 'Camila Rocha', phone: '27999556677', email: 'camila@email.com', description: 'Bolo de casamento 3 andares, sabor chocolate branco com frutas vermelhas', status: 'em_producao', source: 'formulario', items: [], total: 0, company_id: 'c1', created_at: '2026-03-12T09:00:00', updated_at: '2026-03-14T08:00:00' },
];

// ─── Insumos/Ingredientes Demo ───
export const demoIngredients: Ingredient[] = [
  { id: 'ing-001', name: 'Ovos Orgânicos', unit: 'dz', quantity: 24, min_quantity: 6, cost_per_unit: 14.50, supplier: 'Granja Verde', company_id: 'c1', icon: '🥚' },
  { id: 'ing-002', name: 'Essência de Baunilha', unit: 'L', quantity: 1.2, min_quantity: 0.5, cost_per_unit: 180.00, supplier: 'Master Flavors', company_id: 'c1', icon: '🧴' },
  { id: 'ing-003', name: 'Açúcar Mascavo', unit: 'kg', quantity: 8, min_quantity: 3, cost_per_unit: 9.20, supplier: 'Distrib. Doce Vida', company_id: 'c1', icon: '🍬' },
  { id: 'ing-004', name: 'Farinha de Trigo (T1)', unit: 'kg', quantity: 5, min_quantity: 10, cost_per_unit: 4.80, supplier: 'Moinho Central', company_id: 'c1', icon: '🌾' },
  { id: 'ing-005', name: 'Chocolate Belga 70%', unit: 'kg', quantity: 3, min_quantity: 2, cost_per_unit: 89.00, supplier: 'Callebaut', company_id: 'c1', icon: '🍫' },
  { id: 'ing-006', name: 'Manteiga sem Sal', unit: 'kg', quantity: 2.5, min_quantity: 5, cost_per_unit: 45.00, supplier: 'Laticínios Serra', company_id: 'c1', icon: '🧈' },
  { id: 'ing-007', name: 'Leite Integral', unit: 'L', quantity: 15, min_quantity: 5, cost_per_unit: 5.80, supplier: 'Laticínios Serra', company_id: 'c1', icon: '🥛' },
  { id: 'ing-008', name: 'Creme de Leite', unit: 'L', quantity: 8, min_quantity: 3, cost_per_unit: 12.50, supplier: 'Laticínios Serra', company_id: 'c1', icon: '🫗' },
  { id: 'ing-009', name: 'Morango Fresco', unit: 'kg', quantity: 4, min_quantity: 2, cost_per_unit: 18.00, supplier: 'Hortifruti Vitória', company_id: 'c1', icon: '🍓' },
  { id: 'ing-010', name: 'Leite Condensado', unit: 'un', quantity: 30, min_quantity: 10, cost_per_unit: 6.50, supplier: 'Nestlé Dist.', company_id: 'c1', icon: '🥫' },
];

// ─── Transações Demo ───
export const demoTransactions: Transaction[] = [
  { id: 'tx-001', type: 'expense', description: 'Fornecedor de Farinha Premium', amount: 1450.00, due_date: '2026-03-12', category: 'fornecedor', status: 'pendente', company_id: 'c1', created_at: '2026-03-01' },
  { id: 'tx-002', type: 'expense', description: 'Aluguel Loja', amount: 3200.00, due_date: '2026-03-10', category: 'aluguel', status: 'pago', paid_date: '2026-03-09', company_id: 'c1', created_at: '2026-02-28' },
  { id: 'tx-003', type: 'expense', description: 'Conta de Luz', amount: 480.00, due_date: '2026-03-15', category: 'energia', status: 'pendente', company_id: 'c1', created_at: '2026-03-01' },
  { id: 'tx-004', type: 'income', description: 'Vendas iFood - Semana 1', amount: 4580.00, due_date: '2026-03-07', category: 'venda', status: 'pago', paid_date: '2026-03-07', company_id: 'c1', created_at: '2026-03-07' },
  { id: 'tx-005', type: 'income', description: 'Vendas Balcão - Semana 1', amount: 3200.00, due_date: '2026-03-07', category: 'venda', status: 'pago', paid_date: '2026-03-07', company_id: 'c1', created_at: '2026-03-07' },
  { id: 'tx-006', type: 'expense', description: 'Salário - Ricardo Santos', amount: 12500.00, due_date: '2026-04-07', category: 'salario', status: 'pendente', company_id: 'c1', created_at: '2026-03-01' },
  { id: 'tx-007', type: 'expense', description: 'Salário - Ana Beatriz', amount: 8200.00, due_date: '2026-04-07', category: 'salario', status: 'pendente', company_id: 'c1', created_at: '2026-03-01' },
  { id: 'tx-008', type: 'expense', description: 'Fornecedor Chocolate Belga', amount: 2670.00, due_date: '2026-03-08', category: 'fornecedor', status: 'atrasado', company_id: 'c1', created_at: '2026-02-25' },
  { id: 'tx-009', type: 'expense', description: 'Taxa iFood (23%)', amount: 1053.40, due_date: '2026-03-14', category: 'taxa_plataforma', status: 'pendente', company_id: 'c1', created_at: '2026-03-14' },
  { id: 'tx-010', type: 'income', description: 'Vendas Balcão - Semana 2', amount: 2850.00, due_date: '2026-03-14', category: 'venda', status: 'pago', paid_date: '2026-03-14', company_id: 'c1', created_at: '2026-03-14' },
  { id: 'tx-011', type: 'expense', description: 'Conta de Água', amount: 220.00, due_date: '2026-03-20', category: 'agua', status: 'pendente', company_id: 'c1', created_at: '2026-03-05' },
  { id: 'tx-012', type: 'expense', description: 'Gás Encanado', amount: 380.00, due_date: '2026-03-18', category: 'gas', status: 'pendente', company_id: 'c1', created_at: '2026-03-05' },
];

// ─── Funcionários Demo ───
export const demoEmployees: Employee[] = [
  { id: 'emp-001', name: 'Ricardo Santos', email: 'ricardo.s@fouet.com', phone: '27999111222', role: 'Desenvolvedor Sênior', salary: 12500.00, status: 'ativo', permissions: ['FIN', 'EST'], company_id: 'c1', created_at: '2025-06-01', avatar_url: '' },
  { id: 'emp-002', name: 'Ana Beatriz Lima', email: 'ana.lima@fouet.com', phone: '27999333444', role: 'Gerente de Vendas', salary: 8200.00, status: 'ativo', permissions: ['VEN'], company_id: 'c1', created_at: '2025-08-15', avatar_url: '' },
  { id: 'emp-003', name: 'Marcos Oliveira', email: 'marcos.o@fouet.com', phone: '27999555666', role: 'Auxiliar Administrativo', salary: 3450.00, status: 'afastado', permissions: ['ADM'], company_id: 'c1', created_at: '2025-11-01', avatar_url: '' },
];

// ─── Dashboard Stats ───
export const demoDashboardStats: DashboardStats = {
  daily_revenue: 2450.00,
  daily_revenue_change: 12,
  daily_orders: 42,
  daily_orders_change: 5,
  average_ticket: 58.33,
  average_ticket_change: -2,
  weekly_sales: [
    { day: 'SEG', fisico: 1200, plataformas: 800 },
    { day: 'TER', fisico: 1400, plataformas: 950 },
    { day: 'QUA', fisico: 1100, plataformas: 1100 },
    { day: 'QUI', fisico: 1350, plataformas: 750 },
    { day: 'SEX', fisico: 1800, plataformas: 1200 },
    { day: 'SÁB', fisico: 2200, plataformas: 1500 },
    { day: 'DOM', fisico: 900, plataformas: 600 },
  ],
  overdue_bills: 3,
  upcoming_bills: 5,
  upcoming_bills_amount: 1200.00,
};

// ─── Inventory Stats ───
export const demoInventoryStats: InventoryStats = {
  total_items: 148,
  total_items_change: 5,
  low_stock: 12,
  low_stock_change: -2,
  total_value: 24500,
  total_value_change: -1,
};

// ─── Finance Stats ───
export const demoFinanceStats: FinanceStats = {
  total_balance: 42580.20,
  balance_change: 12.4,
  expected_income: 12400.00,
  scheduled_expenses: 8920.45,
  expenses_change: -2150,
};

// ─── Profitability ───
export const demoProfitability: ProfitabilityReport = {
  gross_revenue: 15420.00,
  platform_fees: 3546.60,
  card_fees: 447.18,
  ingredient_costs: 4626.00,
  net_profit: 6800.22,
  margin_percent: 44.1,
};

// ─── PDV Categories ───
export const pdvCategories = [
  { id: 'bolos', label: 'Bolos', icon: '🎂' },
  { id: 'doces', label: 'Doces', icon: '🍬' },
  { id: 'bebidas', label: 'Bebidas', icon: '🥤' },
  { id: 'salgados', label: 'Salgados', icon: '🥐' },
];
