import React from 'react';
import type { Order } from '../../types';

interface Props {
  order: Order;
}

const OrderComponent: React.FC<Props> = ({ order }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="card-title">Order No. {order.id}</h5>
        <p className="card-text">{new Date(order.purchasedAt).toLocaleString()}</p>

        <ul className="list-group list-group-flush">
          {order.orderItems.map((item) => (
            <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.sweet.name}</strong> (x{item.quantity})
              </div>
              <span>₹{item.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="mt-3 d-flex justify-content-between align-items-center">
          <strong>Total Price:</strong>
          <span className="text-success fw-bold">₹{order.totalPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderComponent;
