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

export type OrderItem = {
  id: number;
  orderId: number;
  sweetId: number;
  quantity: number;
  price: number;
  sweet: Sweet;
}

export type Order = {
  id: number;
  userId: number;
  totalPrice: number;
  purchasedAt: string;
  orderItems: OrderItem[];
}
