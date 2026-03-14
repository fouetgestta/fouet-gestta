export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  }).format(new Date(date));
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 11) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }
  return phone;
}

export function formatCNPJ(cnpj: string): string {
  const digits = cnpj.replace(/\D/g, '');
  if (digits.length === 14) {
    return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12)}`;
  }
  return cnpj;
}

export function getStatusColor(status: string): string {
  const map: Record<string, string> = {
    recebido: 'bg-blue-50 text-blue-600',
    em_producao: 'bg-amber-50 text-amber-600',
    pronto: 'bg-emerald-50 text-emerald-600',
    entrega: 'bg-purple-50 text-purple-600',
    concluido: 'bg-gray-100 text-gray-500',
    cancelado: 'bg-red-50 text-red-500',
    pendente: 'bg-amber-50 text-amber-600',
    pago: 'bg-emerald-50 text-emerald-600',
    atrasado: 'bg-red-50 text-red-500',
    ativo: 'bg-emerald-50 text-emerald-600',
    afastado: 'bg-amber-50 text-amber-600',
    desligado: 'bg-gray-100 text-gray-500',
  };
  return map[status] || 'bg-gray-100 text-gray-500';
}

export function getStatusLabel(status: string): string {
  const map: Record<string, string> = {
    recebido: 'Recebido',
    em_producao: 'Em Produção',
    pronto: 'Pronto',
    entrega: 'Entrega',
    concluido: 'Concluído',
    cancelado: 'Cancelado',
    pendente: 'Pendente',
    pago: 'Pago',
    atrasado: 'Atrasado',
    ativo: 'Ativo',
    afastado: 'Afastado',
    desligado: 'Desligado',
  };
  return map[status] || status;
}

export function getSourceLabel(source: string): string {
  const map: Record<string, string> = {
    balcao: 'Balcão',
    ifood: 'iFood',
    uber_eats: 'Uber Eats',
    formulario: 'Formulário',
    delivery_proprio: 'Delivery Próprio',
  };
  return map[source] || source;
}

export function getSourceColor(source: string): string {
  const map: Record<string, string> = {
    balcao: 'bg-primary/10 text-primary-dark',
    ifood: 'bg-red-50 text-red-600',
    uber_eats: 'bg-green-50 text-green-700',
    formulario: 'bg-blue-50 text-blue-600',
    delivery_proprio: 'bg-purple-50 text-purple-600',
  };
  return map[source] || 'bg-gray-100 text-gray-500';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
