import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form, Tab, Tabs } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import useProduct from '../hooks/useProduct';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart, getItemQuantity } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  
  const cartQuantity = getItemQuantity(parseInt(id));

  if (loading) return <LoadingSpinner text="Loading product details..." />;
  if (error) return (
    <Container className="my-5">
      <div className="text-center">
        <h3>Error loading product</h3>
        <p className="text-muted">{error}</p>
      </div>
    </Container>
  );
  if (!product) return <div>Product not found</div>;

  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const savings = product.price - discountedPrice;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout or cart
    window.location.href = '/cart';
  };

  return (
    <Container className="my-4">
      <Row>
        {/* Product Images */}
        <Col lg={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="mb-3">
                <img
                  src={product.images?.[selectedImage] || product.thumbnail}
                  alt={product.title}
                  className="w-100 rounded"
                  style={{ height: '400px', objectFit: 'cover' }}
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <Row className="g-2">
                  {product.images.slice(0, 4).map((image, index) => (
                    <Col key={index} xs={3}>
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className={`w-100 rounded cursor-pointer border ${
                          selectedImage === index ? 'border-primary' : 'border-light'
                        }`}
                        style={{ height: '80px', objectFit: 'cover' }}
                        onClick={() => setSelectedImage(index)}
                      />
                    </Col>
                  ))}
                </Row>
              )}
              
              <div className="d-flex justify-content-between mt-3">
                <Button variant="outline-secondary" size="sm">
                  <Heart size={16} className="me-2" />
                  Wishlist
                </Button>
                <Button variant="outline-secondary" size="sm">
                  <Share2 size={16} className="me-2" />
                  Share
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Product Details */}
        <Col lg={6}>
          <div className="mb-3">
            <h1 className="h3 mb-2">{product.title}</h1>
            <p className="text-muted mb-3">{product.description}</p>
            
            {/* Rating */}
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex align-items-center me-3">
                <Star size={16} className="text-warning me-1" fill="currentColor" />
                <span className="fw-semibold">{product.rating}</span>
                <span className="text-muted ms-1">({Math.floor(Math.random() * 500) + 100} reviews)</span>
              </div>
              <Badge bg="success" className="me-2">In Stock</Badge>
              <span className="text-muted">Brand: {product.brand || 'Generic'}</span>
            </div>

            {/* Price */}
            <div className="price-section mb-4">
              <div className="d-flex align-items-center mb-2">
                <span className="h3 text-success fw-bold me-3">₹{Math.round(discountedPrice)}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="h5 text-muted text-decoration-line-through me-2">
                      ₹{product.price}
                    </span>
                    <Badge bg="danger">
                      {Math.round(product.discountPercentage)}% OFF
                    </Badge>
                  </>
                )}
              </div>
              {savings > 0 && (
                <p className="text-success mb-0">You save ₹{Math.round(savings)}</p>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="mb-4">
              <Form.Label>Quantity:</Form.Label>
              <div className="d-flex align-items-center mb-3">
                <Form.Select
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={{ width: '100px' }}
                  className="me-3"
                >
                  {[...Array(Math.min(10, product.stock))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
                </Form.Select>
                <span className="text-muted">
                  ({product.stock} available)
                </span>
              </div>

              <div className="d-flex gap-2 mb-3">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="flex-fill"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart size={20} className="me-2" />
                  {cartQuantity > 0 ? `In Cart (${cartQuantity})` : 'Add to Cart'}
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-fill meesho-primary"
                  onClick={handleBuyNow}
                  disabled={product.stock === 0}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="features-section">
              <Row className="g-3">
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <Truck size={20} className="text-primary me-2" />
                    <div>
                      <small className="fw-semibold d-block">Free Delivery</small>
                      <small className="text-muted">On orders above ₹499</small>
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <RotateCcw size={20} className="text-primary me-2" />
                    <div>
                      <small className="fw-semibold d-block">7 Days Return</small>
                      <small className="text-muted">Easy return policy</small>
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <Shield size={20} className="text-primary me-2" />
                    <div>
                      <small className="fw-semibold d-block">Secure Payment</small>
                      <small className="text-muted">100% secure payment</small>
                    </div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="d-flex align-items-center">
                    <Star size={20} className="text-primary me-2" />
                    <div>
                      <small className="fw-semibold d-block">Quality Assured</small>
                      <small className="text-muted">Quality checked products</small>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>

      {/* Product Information Tabs */}
      <Row className="mt-5">
        <Col>
          <Tabs defaultActiveKey="details" className="mb-4">
            <Tab eventKey="details" title="Product Details">
              <Card>
                <Card.Body>
                  <h5>Description</h5>
                  <p>{product.description}</p>
                  
                  <h5>Specifications</h5>
                  <Row>
                    <Col md={6}>
                      <ul className="list-unstyled">
                        <li><strong>Brand:</strong> {product.brand || 'Generic'}</li>
                        <li><strong>Category:</strong> {product.category}</li>
                        <li><strong>Stock:</strong> {product.stock} units</li>
                        <li><strong>Rating:</strong> {product.rating}/5</li>
                      </ul>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="reviews" title="Reviews">
              <Card>
                <Card.Body>
                  <h5>Customer Reviews</h5>
                  <div className="d-flex align-items-center mb-3">
                    <div className="me-4">
                      <div className="d-flex align-items-center">
                        <Star size={20} className="text-warning me-1" fill="currentColor" />
                        <span className="h4 mb-0">{product.rating}</span>
                      </div>
                      <small className="text-muted">Based on {Math.floor(Math.random() * 500) + 100} reviews</small>
                    </div>
                  </div>
                  
                  <div className="review-item border-bottom pb-3 mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <strong className="me-2">Rajesh K.</strong>
                      <div className="d-flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} size={14} className="text-warning" fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    <p className="mb-1">Excellent product! Great quality and fast delivery. Highly recommended.</p>
                    <small className="text-muted">Verified Purchase • 2 days ago</small>
                  </div>
                  
                  <div className="review-item border-bottom pb-3 mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <strong className="me-2">Priya S.</strong>
                      <div className="d-flex">
                        {[1, 2, 3, 4].map(star => (
                          <Star key={star} size={14} className="text-warning" fill="currentColor" />
                        ))}
                        <Star size={14} className="text-muted" />
                      </div>
                    </div>
                    <p className="mb-1">Good product overall. Packaging could be better but the item itself is great.</p>
                    <small className="text-muted">Verified Purchase • 1 week ago</small>
                  </div>
                </Card.Body>
              </Card>
            </Tab>
            
            <Tab eventKey="shipping" title="Shipping & Returns">
              <Card>
                <Card.Body>
                  <h5>Shipping Information</h5>
                  <ul>
                    <li>Free delivery on orders above ₹499</li>
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery: 1-2 business days (charges apply)</li>
                    <li>Cash on Delivery available</li>
                  </ul>
                  
                  <h5>Return Policy</h5>
                  <ul>
                    <li>7 days easy return policy</li>
                    <li>Items must be in original condition</li>
                    <li>Free return pickup</li>
                    <li>Refund processed within 7-10 business days</li>
                  </ul>
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;