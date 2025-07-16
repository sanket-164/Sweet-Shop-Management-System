import React, { useEffect, useState } from 'react';
import SweetComponent from './Sweet';
import type { Sweet } from '../../types';
import { getAllSweets } from '../../api/sweets';

const SweetList: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getAllSweets()
      .then((response) => {
        setSweets(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch sweets.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center my-5"><div className="spinner-border" role="status"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (!sweets.length) {
    return <div className="alert alert-warning text-center my-5">No sweets available.</div>;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">Available Sweets</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {sweets.map((sweet) => (
          <SweetComponent key={sweet.id} sweet={sweet} />
        ))}
      </div>
    </div>
  );
};

export default SweetList;
