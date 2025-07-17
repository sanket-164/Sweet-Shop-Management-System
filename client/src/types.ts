export type Sweet = {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  sweetId: number;
  name: string;
  quantity: number;
  price: number;
};