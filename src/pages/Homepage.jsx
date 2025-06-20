import React from 'react';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, HeartHandshake, RotateCcw } from 'lucide-react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const Homepage = () => {
  const { products, loading } = useProducts('', 12);

  const categories = [
    { name: 'Women Clothing', path: '/products/womens-dresses', image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Men Clothing', path: '/products/mens-shirts', image: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Electronics', path: '/products/smartphones', image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Home & Kitchen', path: '/products/home-decoration', image: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Beauty', path: '/products/skincare', image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Accessories', path: '/products/womens-bags', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=300' }
  ];

  const features = [
    { icon: <Truck size={40} />, title: 'Free Delivery', description: 'Free delivery on orders above ₹499' },
    { icon: <Shield size={40} />, title: 'Secure Payment', description: '100% secure payment methods' },
    { icon: <HeartHandshake size={40} />, title: 'Quality Products', description: 'Quality assured products' },
    { icon: <RotateCcw size={40} />, title: 'Easy Returns', description: '7 days easy return policy' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="hero-banner">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Discover Products at <span className="text-warning">Best Prices</span>
              </h1>
              <p className="lead mb-4">
                Shop from millions of products across categories like Fashion, Electronics, 
                Home & Kitchen, and more at unbeatable prices.
              </p>
              <Button 
                as={Link} 
                to="/products" 
                variant="warning" 
                size="lg"
                className="me-3"
              >
                Start Shopping <ArrowRight size={20} className="ms-2" />
              </Button>
            </Col>
            <Col lg={6} className="text-center">
              <img 
                src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Shopping" 
                className="img-fluid rounded"
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <Container className="my-5">
        <Row>
          <Col>
            <h2 className="text-center mb-4">Shop by Category</h2>
            <Row className="g-4">
              {categories.map((category, index) => (
                <Col key={index} xs={6} md={4} lg={2}>
                  <Link to={category.path} className="text-decoration-none">
                    <Card className="category-card text-center border-0 shadow-sm">
                      <Card.Img 
                        variant="top" 
                        src={category.image} 
                        alt={category.name}
                        style={{ height: '120px', objectFit: 'cover' }}
                      />
                      <Card.Body className="p-2">
                        <Card.Text className="small fw-semibold text-dark mb-0">
                          {category.name}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>

      {/* Featured Products */}
      <Container className="my-5">
        <Row>
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Featured Products</h2>
              <Button as={Link} to="/products" variant="outline-primary">
                View All <ArrowRight size={16} className="ms-2" />
              </Button>
            </div>
            
            {loading ? (
              <LoadingSpinner text="Loading featured products..." />
            ) : (
              <Row className="g-4">
                {products.slice(0, 8).map((product) => (
                  <Col key={product.id} xs={6} md={4} lg={3}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>
            )}
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="my-5">
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3}>
              <Card className="text-center border-0 shadow-sm h-100">
                <Card.Body className="p-4">
                  <div className="text-meesho-primary mb-3">
                    {feature.icon}
                  </div>
                  <Card.Title className="h5">{feature.title}</Card.Title>
                  <Card.Text className="text-muted">{feature.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Newsletter Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="justify-content-center text-center">
            <Col lg={6}>
              <h3 className="mb-3">Stay Updated with Latest Offers</h3>
              <p className="text-muted mb-4">
                Subscribe to our newsletter and get exclusive deals and offers delivered to your inbox.
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <input 
                  type="email" 
                  className="form-control" 
                  placeholder="Enter your email"
                  style={{ maxWidth: '300px' }}
                />
                <Button variant="primary">Subscribe</Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Homepage;