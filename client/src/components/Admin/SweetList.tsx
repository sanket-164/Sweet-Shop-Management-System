import React, { useEffect, useState } from 'react';
import type { Sweet } from '../../types';
import { getAllSweets, addSweet } from '../../api/sweets';
import SweetComponent from './Sweet';

const SweetList: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  // Form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState<number>(0);

  const fetchSweets = () => {
    setLoading(true);
    getAllSweets()
      .then((res) => {
        setSweets(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch sweets.');
        setLoading(false);
      });
  };

  const handleAddSweet = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addSweet(name, price, category, quantity);
      setShowModal(false);
      setName('');
      setPrice(0);
      setCategory('');
      setQuantity(0);
      fetchSweets();
    } catch (err) {
      alert('Error adding sweet.');
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Manage Sweets</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New Sweet</button>
      </div>

      {sweets.length === 0 ? (
        <div className="alert alert-warning">No sweets found.</div>
      ) : (
        <div className="row">
          {sweets.map((sweet) => (
            <div key={sweet.id} className="col-md-4 mb-4">
              <SweetComponent sweet={sweet} onChange={fetchSweets} />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <form onSubmit={handleAddSweet}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New Sweet</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input type="text" className="form-control" required value={category} onChange={(e) => setCategory(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" required value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input type="number" className="form-control" required value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-success">Add Sweet</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SweetList;
