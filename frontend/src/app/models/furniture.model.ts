// frontend/src/app/models/furniture.model.ts

export interface Furniture {
  id: number;
  name: string;
  description: string;
  size: string;
  colour: string;
  quantity: number;
  price: number;
  status: 'Available' | 'Out of stock' | 'Discontinued';
  type: { id: number; name: string };
  materials: { id: number; name: string }[];
  images: { id: number; image: string }[];
}
