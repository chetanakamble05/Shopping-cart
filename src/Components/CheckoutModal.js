import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';


export default function CheckoutModal({ cart, onClose }) {
  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="checkout-modal">
        <h2>Checkout Summary</h2>
        <p>No items in the cart.</p>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    );
  }

  return (
    <Container className="checkout-modal">
      <h2 className="text-center mb-3">Checkout Summary</h2>
      <Table striped bordered hover size="sm" className="text-center custom-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
          <tr className="table-info">
            <td colSpan="3" className="text-right"><strong>Total Cart Price:</strong></td>
            <td><strong>₹
              {cart
                .map((item) => item.price * item.quantity)
                .reduce((total, value) => total + value, 0)}
            </strong></td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-between mt-3">
        <Button variant="secondary" onClick={handleProceedToPayment}>
          Proceed to Payment
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </div>
    </Container>
  );

  function handleProceedToPayment() {
    console.log('Proceeding to payment...');
  }
}
