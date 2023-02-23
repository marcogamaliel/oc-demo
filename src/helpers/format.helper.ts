export function priceFormat(price: number): string {
  return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(price);
}

export function formatDate(date?: Date): string | undefined {
  return date?.toISOString().slice(0, 10);
}