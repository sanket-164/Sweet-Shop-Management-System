import React, { useEffect, useState } from 'react';
import type { Order } from '../../types';
import { getOrderByUserId } from '../../api/orders';
import OrderComponent from './Order';
import { useAuth } from '../../context/AuthContext';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user) {
      return;
    }

    getOrderByUserId(user.id)
      .then((res) => {
        setOrders(res.data as Order[]);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch orders.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center my-5"><div className="spinner-border" role="status" /></div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center my-5">{error}</div>;
  }

  if (!orders.length) {
    return <div className="alert alert-warning text-center my-5">No orders found.</div>;
  }

  return (
    <div className="container py-4">
      <h3 className="mb-4 text-center">Your Orders</h3>
      {orders.map((order) => (
        <OrderComponent key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
