import React from 'react';
import type { Order } from '../../types';

interface Props {
  order: Order;
}

const OrderComponent: React.FC<Props> = ({ order }) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between">
        <strong>Order No. {order.id}</strong>
        <span>{new Date(order.purchasedAt).toLocaleString()}</span>
      </div>
      <div className="card-body">
        <ul className="list-group">
          {order.orderItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                <h6 className="mb-1">{item.sweet.name}</h6>
              <span className="badge bg-primary rounded-pill">
                 ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
              </span>
            </li>
          ))}
        </ul>
        <div className="text-end fw-bold mt-4">
          Total: ₹{order.totalPrice}
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
