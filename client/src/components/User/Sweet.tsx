import React from 'react';
import type { Sweet } from '../../types';

type SweetProps = {
  sweet: Sweet;
};

const SweetComponent: React.FC<SweetProps> = ({ sweet }) => {
  return (
        <div className="col">
            <div className="card shadow-sm h-100">
                <div className="card-body">
                    <h5 className="card-title">{sweet.name}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{sweet.category}</h6>
                    <p className="card-text">
                        Price: ₹{sweet.price}<br />
                        Available: {sweet.quantity}
                    </p>
                </div>
                <div className="card-footer">
                    <small className="text-muted">Last updated {new Date(sweet.updatedAt).toLocaleDateString()}</small>
                </div>
            </div>
        </div>
    )
};

export default SweetComponent;
