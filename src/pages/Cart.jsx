import React from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={6} className="text-center">
            <ShoppingBag size={80} className="text-muted mb-4" />
            <h3>Your Cart is Empty</h3>
            <p className="text-muted mb-4">Looks like you haven't added any items to your cart yet.</p>
            <Button as={Link} to="/products" variant="primary" size="lg">
              Start Shopping
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Shopping Cart ({totalItems} items)</h2>
            <Button variant="outline-danger" size="sm" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table className="mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const discountedPrice = item.price - (item.price * item.discountPercentage / 100);
                      const itemTotal = discountedPrice * item.quantity;
                      
                      return (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="rounded me-3"
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                              />
                              <div>
                                <h6 className="mb-1">
                                  <Link 
                                    to={`/product/${item.id}`} 
                                    className="text-decoration-none text-dark"
                                  >
                                    {item.title}
                                  </Link>
                                </h6>
                                <small className="text-muted">
                                  {item.discountPercentage > 0 && (
                                    <span className="badge bg-success me-2">
                                      {Math.round(item.discountPercentage)}% OFF
                                    </span>
                                  )}
                                  Stock: {item.stock}
                                </small>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            <div>
                              <strong>₹{Math.round(discountedPrice)}</strong>
                              {item.discountPercentage > 0 && (
                                <div>
                                  <small className="text-muted text-decoration-line-through">
                                    ₹{item.price}
                                  </small>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </Button>
                              <Form.Control
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                min="1"
                                max={item.stock}
                                className="mx-2 text-center"
                                style={{ width: '60px' }}
                              />
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                              >
                                <Plus size={14} />
                              </Button>
                            </div>
                          </td>
                          <td className="align-middle">
                            <strong>₹{Math.round(itemTotal)}</strong>
                          </td>
                          <td className="align-middle">
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>

          <div className="mt-3">
            <Button as={Link} to="/products" variant="outline-primary">
              <ArrowLeft size={16} className="me-2" />
              Continue Shopping
            </Button>
          </div>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm sticky-top" style={{ top: '100px' }}>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Items ({totalItems})</span>
                <span>₹{Math.round(totalPrice)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>₹{Math.round(totalPrice * 0.18)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total</strong>
                <strong>₹{Math.round(totalPrice + (totalPrice * 0.18))}</strong>
              </div>
              
              <div className="d-grid gap-2">
                <Button 
                  as={Link} 
                  to="/checkout" 
                  variant="primary" 
                  size="lg"
                  className="meesho-primary"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </Card.Body>
          </Card>

          <Alert variant="info" className="mt-3">
            <small>
              <strong>Free Delivery:</strong> You're eligible for free delivery on this order!
            </small>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;