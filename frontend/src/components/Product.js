import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import Rating from './Rating';
import { Store } from './Store';
import axios from 'axios';

export default function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    Cart: { CartItems },
  } = state;

  const addToCartHandler = async (item) => {
    console.log(item);
    const existItem = CartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/product/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry, Product is Out of Stock');
      return;
    }
    ctxDispatch({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity },
    });
  };

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
        {product.countInStock === 0 ? (
          <Button variant="light" disabled>
            {' '}
            Out Of Stock{' '}
          </Button>
        ) : (
          <Button onClick={() => addToCartHandler(product)}>
            {' '}
            Add to Cart{' '}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}
