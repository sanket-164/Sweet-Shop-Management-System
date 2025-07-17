import React, { useEffect, useState } from 'react';
import SweetComponent from './Sweet';
import type { Sweet } from '../../types';
import { searchSweets } from '../../api/sweets';

const SweetList: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  // Filters
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [orderBy, setOrderBy] = useState<string>('id');
  const [orderDirection, setOrderDirection] = useState<string>('desc');

  const fetchSweets = () => {
    setLoading(true);
    setError('');

    const params: Record<string, any> = {
      name: name.trim() || undefined,
      category: category.trim() || undefined,
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
      .then((response) => {
        setSweets(response.data as Sweet[]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch sweets.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleFilterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchSweets();
  };

  return (
    <div className="sweet-list-container" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Sidebar Filters */}
        <aside style={{ flex: '1 1 250px', maxWidth: '300px', border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Filter Sweets</h3>
          <form onSubmit={handleFilterSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rasmalai"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Sugar-Free"
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label>Price Range</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min Price"
                min="0"
                style={{ width: '100%' }}
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max Price"
                min="0"
                style={{ width: '100%' }}
              />
            </div>
          </div>


            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="orderBy">Order By</label>
              <select
                id="orderBy"
                value={orderBy}
                onChange={(e) => setOrderBy(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="id">ID</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
                <option value="quantity">Availability</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="orderDirection">Order Direction</label>
              <select
                id="orderDirection"
                value={orderDirection}
                onChange={(e) => setOrderDirection(e.target.value)}
                style={{ width: '100%' }}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>

            <button type="submit" style={{ width: '100%', padding: '0.5rem' }}>
              Apply Filters
            </button>
          </form>
        </aside>

        {/* Main sweets grid */}
        <main style={{ flex: '3 1 600px' }}>
          {loading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <p>Loading...</p>
            </div>
          )}
          {error && (
            <div style={{ textAlign: 'center', marginTop: '2rem', color: 'red' }}>
              {error}
            </div>
          )}
          {!loading && !error && !sweets.length && (
            <div style={{ textAlign: 'center', marginTop: '2rem', color: 'orange' }}>
              No sweets found.
            </div>
          )}
          {!loading && !error && sweets.length > 0 && (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: '1rem'
                }}
              >
                {sweets.map((sweet) => (
                  <SweetComponent key={sweet.id} sweet={sweet} />
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default SweetList;
