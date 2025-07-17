import React, { useState } from 'react';
import type { Sweet } from '../../types';
import { deleteSweet, updateSweet, restockSweet } from '../../api/sweets';

interface Props {
  sweet: Sweet;
  onChange: () => void;
}

const SweetComponent: React.FC<Props> = ({ sweet, onChange }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...sweet });
  const [restockAmount, setRestockAmount] = useState<number>(0);

  const handleUpdate = async () => {
    await updateSweet(sweet.id, form.name, form.price, form.category, form.quantity);
    setEditing(false);
    onChange();
  };

  const handleDelete = async () => {
    await deleteSweet(sweet.id);
    onChange();
  };

  const handleRestock = async () => {
    if (restockAmount > 0) {
        console.log(`Restocking ${sweet.name} with quantity: ${restockAmount}`);
      await restockSweet(sweet.id, restockAmount);
      setRestockAmount(0);
      onChange();
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-body">
        {editing ? (
          <>
            <input
              className="form-control mb-2"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="form-control mb-2"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: +e.target.value })}
            />
            <input
              className="form-control mb-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              className="form-control mb-2"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: +e.target.value })}
              disabled={true}
            />
            <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
            <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <>
            <h5>{sweet.name}</h5>
            <p className="mb-1"> ₹{sweet.price} | {sweet.category} | Available {sweet.quantity}</p>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <input
                type="number"
                className="form-control me-2"
                placeholder="Enter Restock Qty"
                value={restockAmount > 0 ? restockAmount : ''}
                onChange={(e) => setRestockAmount(+e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2">
              <button className="btn btn-outline-primary btn-sm" onClick={handleRestock} style={{ width: '50%' }}>Restock</button>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2">
                <button className="btn btn-outline-warning btn-sm" onClick={() => setEditing(true)} style={{ width: '50%' }}>Edit</button>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-2">
                <button className="btn btn-outline-danger btn-sm" onClick={handleDelete} style={{ width: '50%' }}>Delete</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SweetComponent;
