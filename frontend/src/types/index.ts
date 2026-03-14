export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  avatar_url?: string;
  company_id: string;
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  ie?: string;
  tax_regime: string;
  logo_url?: string;
  address: Address;
  nfce_enabled: boolean;
  nfce_series?: number;
  nfce_next_number?: number;
  nfce_environment: 'homologacao' | 'producao';
}

export interface Address {
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  category: 'bolos' | 'doces' | 'bebidas' | 'salgados';
  description?: string;
  image_url?: string;
  sale_price: number;
  production_cost: number;
  margin_percent: number;
  company_id: string;
  created_at: string;
}

export interface ProductSheet {
  id: string;
  product_id: string;
  ingredients: SheetIngredient[];
  labor_cost: number;
  fixed_cost: number;
  total_cost: number;
}

export interface SheetIngredient {
  ingredient_id: string;
  ingredient_name: string;
  quantity_grams: number;
  proportional_cost: number;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  quantity: number;
  min_quantity: number;
  cost_per_unit: number;
  supplier: string;
  company_id: string;
  icon?: string;
}

export type OrderStatus = 'recebido' | 'em_producao' | 'pronto' | 'entrega' | 'concluido' | 'cancelado';
export type OrderSource = 'balcao' | 'ifood' | 'uber_eats' | 'formulario' | 'delivery_proprio';

export interface Order {
  id: string;
  code: string;
  customer_name: string;
  phone: string;
  email: string;
  description?: string;
  images?: string[];
  status: OrderStatus;
  source: OrderSource;
  items: OrderItem[];
  total: number;
  company_id: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
}

export type TransactionType = 'income' | 'expense';
export type TransactionCategory = 'venda' | 'fornecedor' | 'salario' | 'aluguel' | 'energia' | 'agua' | 'gas' | 'taxa_plataforma' | 'outros';

export interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  amount: number;
  due_date: string;
  paid_date?: string;
  category: TransactionCategory;
  status: 'pendente' | 'pago' | 'atrasado';
  company_id: string;
  created_at: string;
}

export interface Employee {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  salary: number;
  avatar_url?: string;
  status: 'ativo' | 'afastado' | 'desligado';
  permissions: string[];
  company_id: string;
  created_at: string;
}

export interface DashboardStats {
  daily_revenue: number;
  daily_revenue_change: number;
  daily_orders: number;
  daily_orders_change: number;
  average_ticket: number;
  average_ticket_change: number;
  weekly_sales: WeeklySales[];
  overdue_bills: number;
  upcoming_bills: number;
  upcoming_bills_amount: number;
}

export interface WeeklySales {
  day: string;
  fisico: number;
  plataformas: number;
}

export interface NfceRecord {
  id: string;
  order_id: string;
  status: 'pendente' | 'autorizada' | 'rejeitada' | 'cancelada';
  focus_nfe_ref?: string;
  xml?: string;
  pdf_url?: string;
  company_id: string;
  created_at: string;
}

// Cart for PDV
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface InventoryStats {
  total_items: number;
  total_items_change: number;
  low_stock: number;
  low_stock_change: number;
  total_value: number;
  total_value_change: number;
}

export interface FinanceStats {
  total_balance: number;
  balance_change: number;
  expected_income: number;
  scheduled_expenses: number;
  expenses_change: number;
}

export interface ProfitabilityReport {
  gross_revenue: number;
  platform_fees: number;
  card_fees: number;
  ingredient_costs: number;
  net_profit: number;
  margin_percent: number;
}
