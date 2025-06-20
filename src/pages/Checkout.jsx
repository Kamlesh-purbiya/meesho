import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CreditCard, Truck, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    paymentMethod: 'cod'
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (items.length === 0 && !orderPlaced) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <h3>No items in cart</h3>
          <p className="text-muted">Please add items to your cart before checkout.</p>
          <Button as={Link} to="/products" variant="primary">
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate order processing
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      toast.success('Order placed successfully!');
    }, 1000);
  };

  const totalAmount = totalPrice + (totalPrice * 0.18);

  if (orderPlaced) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <CheckCircle size={80} className="text-success mb-4" />
            <h2>Order Placed Successfully!</h2>
            <p className="text-muted mb-4">
              Thank you for your order. You will receive a confirmation email shortly.
            </p>
            <div className="d-flex gap-2 justify-content-center">
              <Button as={Link} to="/products" variant="primary">
                Continue Shopping
              </Button>
              <Button as={Link} to="/" variant="outline-primary">
                Go to Home
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="mb-4">
            <Button as={Link} to="/cart" variant="outline-primary" size="sm">
              <ArrowLeft size={16} className="me-2" />
              Back to Cart
            </Button>
            <h2 className="mt-3">Checkout</h2>
          </div>
        </Col>
      </Row>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={8}>
            {/* Shipping Information */}
            <Card className="mb-4 shadow-sm">
              <Card.Header>
                <h5 className="mb-0">
                  <Truck size={20} className="me-2" />
                  Shipping Information
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email Address *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Address *</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street address, P.O. Box, etc."
                    required
                  />
                </Form.Group>
                
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State *</Form.Label>
                      <Form.Select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select State</option>
                        <option value="AP">Andhra Pradesh</option>
                        <option value="AR">Arunachal Pradesh</option>
                        <option value="AS">Assam</option>
                        <option value="BR">Bihar</option>
                        <option value="CT">Chhattisgarh</option>
                        <option value="GA">Goa</option>
                        <option value="GJ">Gujarat</option>
                        <option value="HR">Haryana</option>
                        <option value="HP">Himachal Pradesh</option>
                        <option value="JK">Jammu and Kashmir</option>
                        <option value="JH">Jharkhand</option>
                        <option value="KA">Karnataka</option>
                        <option value="KL">Kerala</option>
                        <option value="MP">Madhya Pradesh</option>
                        <option value="MH">Maharashtra</option>
                        <option value="MN">Manipur</option>
                        <option value="ML">Meghalaya</option>
                        <option value="MZ">Mizoram</option>
                        <option value="NL">Nagaland</option>
                        <option value="OR">Odisha</option>
                        <option value="PB">Punjab</option>
                        <option value="RJ">Rajasthan</option>
                        <option value="SK">Sikkim</option>
                        <option value="TN">Tamil Nadu</option>
                        <option value="TG">Telangana</option>
                        <option value="TR">Tripura</option>
                        <option value="UP">Uttar Pradesh</option>
                        <option value="UT">Uttarakhand</option>
                        <option value="WB">West Bengal</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ZIP Code *</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Payment Method */}
            <Card className="mb-4 shadow-sm">
              <Card.Header>
                <h5 className="mb-0">
                  <CreditCard size={20} className="me-2" />
                  Payment Method
                </h5>
              </Card.Header>
              <Card.Body>
                <Form.Group>
                  <Form.Check
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    label="Cash on Delivery"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    label="Credit/Debit Card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    id="upi"
                    name="paymentMethod"
                    value="upi"
                    label="UPI"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                
                {formData.paymentMethod === 'card' && (
                  <Alert variant="info" className="mt-3">
                    <small>Note: This is a demo checkout. No actual payment will be processed.</small>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col lg={4}>
            {/* Order Summary */}
            <Card className="shadow-sm sticky-top" style={{ top: '100px' }}>
              <Card.Header>
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  {items.map((item) => {
                    const discountedPrice = item.price - (item.price * item.discountPercentage / 100);
                    return (
                      <div key={item.id} className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                          <img
                            src={item.thumbnail}
                            alt={item.title}
                            className="rounded me-2"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                          <div>
                            <small className="d-block">{item.title.substring(0, 20)}...</small>
                            <small className="text-muted">Qty: {item.quantity}</small>
                          </div>
                        </div>
                        <small>₹{Math.round(discountedPrice * item.quantity)}</small>
                      </div>
                    );
                  })}
                </div>
                
                <hr />
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Items ({totalItems})</span>
                  <span>₹{Math.round(totalPrice)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className="text-success">FREE</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax (18%)</span>
                  <span>₹{Math.round(totalPrice * 0.18)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong>₹{Math.round(totalAmount)}</strong>
                </div>
                
                <div className="d-grid">
                  <Button type="submit" variant="primary" size="lg" className="meesho-primary">
                    Place Order
                  </Button>
                </div>
                
                <Alert variant="success" className="mt-3">
                  <small>
                    <strong>Free Delivery:</strong> Your order qualifies for free shipping!
                  </small>
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;