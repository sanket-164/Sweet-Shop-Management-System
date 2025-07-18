import React, { useEffect, useState } from 'react';
import type { Order } from '../../types';
import { getOrders } from '../../api/orders';
import OrderComponent from './Order';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await getOrders();
      setOrders(res.data as Order[]);
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center my-5"><div className="spinner-border" /></div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container py-4">
      <h3 className="mb-4">All Orders</h3>
      {orders.length === 0 ? (
        <div className="alert alert-warning">No orders found.</div>
      ) : (
        orders.map((order) => <OrderComponent key={order.id} order={order} />)
      )}
    </div>
  );
};

export default OrderList;
