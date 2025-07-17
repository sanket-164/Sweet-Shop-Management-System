import React from 'react';
import type { Restock } from '../../types';

interface Props {
  restock: Restock;
}

const RestockComponent: React.FC<Props> = ({ restock }) => {
  return (
    <div className="card shadow-sm mb-3">
      <div className="card-body">
        <h5 className="card-title">{restock.sweet.name}</h5>

        <ul className="list-group list-group-flush my-3">
          <li className="list-group-item">{restock.sweet.category}</li>
          <li className="list-group-item">Restocked Quantity: {restock.quantity}</li>
          <li className="list-group-item">Now Available: {restock.sweet.quantity}</li>
          <li className="list-group-item">Price: ₹{restock.sweet.price}</li>
        </ul>

        <p className="card-text text-muted">
          {new Date(restock.restockedAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default RestockComponent;
