import React, { useEffect, useState } from 'react';
import type { Sweet } from '../../types';
import { addSweet, searchSweets } from '../../api/sweets';
import SweetComponent from './Sweet';

const SweetList: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  // Filters
  const [nameFilter, setNameFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('id');
  const [orderDirection, setOrderDirection] = useState<string>('desc');

  // Form state for adding new sweet
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState<number>(0);

  const fetchSweets = () => {
    setLoading(true);
    setError('');

    const params: Record<string, any> = {
      name: nameFilter.trim() || undefined,
      category: categoryFilter.trim() || undefined,
      minPrice: minPrice.trim() || undefined,
      maxPrice: maxPrice.trim() || undefined,
      orderBy,
      orderDirection
    };

    const queryString = new URLSearchParams(
      Object.entries(params).reduce((acc, [key, value]) => {
        if (value !== undefined) acc[key] = value;
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    searchSweets(queryString)
      .then((res) => {
        setSweets(res.data as Sweet[]);
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

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSweets();
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>Manage Sweets</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add New Sweet</button>
      </div>

      {/* Filters */}
      <form className="row g-3 mb-4" onSubmit={handleFilterSubmit}>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="col-md-1">
          <select className="form-select" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
            <option value="id">Recency</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
          </select>
        </div>
        <div className="col-md-1">
          <select className="form-select" value={orderDirection} onChange={(e) => setOrderDirection(e.target.value)}>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>
        <div className="col-md-1">
          <button type="submit" className="btn btn-secondary w-100">Filter</button>
        </div>
      </form>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" />
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : sweets.length === 0 ? (
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
