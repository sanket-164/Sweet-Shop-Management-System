import React, { useState } from 'react';
import type { Sweet } from '../../types';
import { useCart } from '../../context/CartContext';

type SweetProps = {
  sweet: Sweet;
};

const SweetComponent: React.FC<SweetProps> = ({ sweet }) => {
  const { cart, addToCart, removeFromCart } = useCart();
  const [qty, setQty] = useState<number>(1);

  const handleAdd = () => {
    if (qty < 1) return;
    addToCart({
      sweetId: sweet.id,
      name: sweet.name,
      price: sweet.price,
      quantity: qty
    });
  };

  const handleRemove = () => {
    removeFromCart(sweet.id);
  };

  const cartItem = cart.find((item) => item.sweetId === sweet.id);
  const totalAdded = cartItem ? cartItem.quantity : 0;

  return (
    <div className="col">
      <div className="card shadow-sm h-100">
        <div className="card-body">
          <h5 className="card-title">{sweet.name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{sweet.category}</h6>
          <p className="card-text">
            ₹{sweet.price} <br />
            Available: {sweet.quantity}
          </p>
          <div className="input-group mb-2">
            <span className="input-group-text">Qty</span>
            <input
              type="number"
              min="1"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            />
          </div>

          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-primary w-100 me-2" onClick={handleAdd}>
              Add
            </button>
            <button
              className="btn btn-outline-danger w-100"
              onClick={handleRemove}
              disabled={totalAdded === 0}
            >
              Remove
            </button>
          </div>

          {totalAdded > 0 && (
            <p className="text-success mt-2 mb-0">
              In cart: <strong>{totalAdded}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SweetComponent;
