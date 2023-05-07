import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function LoadBox() {
  return (
    <div>
      <Spinner animation="border" role="status" />
      <span className="visual-hidden"> Loading....</span>
    </div>
  );
}
