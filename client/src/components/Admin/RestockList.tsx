import React, { useEffect, useState } from 'react';
import type { Restock } from '../../types';
import RestockComponent from './Restock';
import { getRestocks } from '../../api/sweets';

const RestockList: React.FC = () => {
  const [restocks, setRestocks] = useState<Restock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchRestocks = async () => {
    try {
      const res = await getRestocks();
      setRestocks(res.data as Restock[]);
    } catch (err) {
      setError('Failed to fetch restocks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestocks();
  }, []);

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border" />
      </div>
    );

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h3 className="mb-4">All Restocks</h3>
      {restocks.length === 0 ? (
        <div className="alert alert-warning">No restock records found.</div>
      ) : (
        <div className="row">
          {restocks.map((restock) => (
            <div key={restock.id} className="col-md-4 mb-4">
              <RestockComponent restock={restock} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RestockList;
