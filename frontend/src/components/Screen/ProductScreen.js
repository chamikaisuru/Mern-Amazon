import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Badge, Button } from 'react-bootstrap';
import Rating from '../Rating';
import { Helmet } from 'react-helmet-async';
import LoadBox from '../LoadBox';
import MessageBox from '../MessageBox';
import { getError } from '../Utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get(`/api/product/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'ERROR', payload: getError(error) });
        // dispatch({ type: 'ERROR', payload: error.message.status });
      }
    };
    fetchData();
  }, [slug]);

  return loading ? (
    <LoadBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <Row>
      <Col md={6}>
        <img className="img-large" src={product.image} alt={product.name}></img>
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            <h1>{product.name}</h1>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating rating={product.rating} numreViews={product.numReviews} />
          </ListGroup.Item>
          <ListGroup.Item>Price: $ {product.price}</ListGroup.Item>
          <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row>
              <Col>Price: </Col>
              <Col>$ {product.price}</Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Status: </Col>
              <Col>
                {product.countInStock > 0 ? (
                  <Badge bg="success">In Stock</Badge>
                ) : (
                  <Badge bg="danger">Unavalable</Badge>
                )}
              </Col>
            </Row>
          </ListGroup.Item>
          {product.countInStock > 0 && (
            <ListGroup.Item>
              <div className="d-grid">
                <Button variant="primary">Add to Cart</Button>
              </div>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Col>
    </Row>
  );
}
