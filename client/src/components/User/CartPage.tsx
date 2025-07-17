import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { createOrder } from '../../api/orders';
import { useAuth } from '../../context/AuthContext';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, clearCart } = useCart();
  const [message, setMessage] = useState<string>('');
  const { user } = useAuth();
  
  const handleOrder = () => {
    const sweets = cart.map(item => ({
        sweetId: item.sweetId,
        quantity: item.quantity
    }));

    if (!user) {
      setMessage('You must be logged in to place an order.');
      return;
    }

    createOrder(user.id, sweets)
      .then(() => {
        setMessage('Order placed successfully!');
        clearCart();
      })
      .catch(() => {
        setMessage('Failed to place order. Try again.');
      });
  };

  if (!cart.length) {
    return <div className="container py-5"><h4 className="text-center">Your cart is empty.</h4></div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Your Cart</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sweet</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.sweetId}>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.sweetId, Number(e.target.value))}
                  className="form-control"
                  style={{ maxWidth: '80px' }}
                />
              </td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="">
        <h5>Total: ₹{cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}</h5>
        
        {/* Clear Cart Button */}
        <button className="btn btn-danger mt-3 me-2" onClick={clearCart}>
          Clear Cart
        </button>

        {/* Place Order Button */}
        <button className="btn btn-success mt-3" onClick={handleOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
