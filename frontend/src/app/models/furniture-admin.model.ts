export interface FurnitureAdmin {
    id: number;
    name: string;
    price: number;
    status: 'Available' | 'Out of stock' | 'Discontinued';
  }