import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import Rating from './Rating';

export default function Product(props) {
  const { product } = props;
  return (
    <Card className="Product" key={product.slug}>
      <Link to={`/product/${product.slug}`}>
        <Card.Img
          src={product.image}
          className="Card-img-top"
          alt={product.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numreViews={product.numreview} />
        <Card.Text>${product.price}</Card.Text>
        <Button>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
