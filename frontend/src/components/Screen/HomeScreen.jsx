import React from 'react';
import data from '../../data';
import { Link } from 'react-router-dom';

export default function HomeScreen() {
  return (
    <div>
      <h1>Product List</h1>
      <div className="Products">
        {data.products.map((product) => (
          <div className="Product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="Product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>
                <strong>${product.price}</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
