import React, { useState } from 'react';
import { Navbar, Nav, Container, Form, InputGroup, Button, Badge, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { totalItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const categories = [
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting'
  ];

  return (
    <>
      <Navbar bg="white" expand="xl" className="shadow-sm sticky-top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold text-meesho-primary fs-2">
            Meesho
          </Navbar.Brand>
          
          <Button
            variant="outline-secondary"
            className="d-lg-none"
            onClick={() => setShowOffcanvas(true)}
          >
            <Menu size={20} />
          </Button>

          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/products">All Products</Nav.Link>
              <Nav.Link as={Link} to="/products/womens-dresses">Women</Nav.Link>
              <Nav.Link as={Link} to="/products/mens-shirts">Men</Nav.Link>
              <Nav.Link as={Link} to="/products/home-decoration">Home & Kitchen</Nav.Link>
              <Nav.Link as={Link} to="/products/smartphones">Electronics</Nav.Link>
            </Nav>
            
            <Form className="d-flex me-3" onSubmit={handleSearch}>
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Try Saree, Kurti or Search by Product Code"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ minWidth: '300px' }}
                />
                <Button variant="outline-secondary" type="submit">
                  <Search size={18} />
                </Button>
              </InputGroup>
            </Form>
            
            <Nav>
              <Nav.Link as={Link} to="/cart" className="position-relative">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <Badge bg="danger" className="position-absolute top-0 start-100 translate-middle">
                    {totalItems}
                  </Badge>
                )}
              </Nav.Link>
              <Nav.Link href="#" className="d-flex align-items-center">
                <User size={20} />
                <span className="ms-1">Profile</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-meesho-primary fw-bold">Meesho</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={() => setShowOffcanvas(false)}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={() => setShowOffcanvas(false)}>
              All Products
            </Nav.Link>
            <Nav.Link as={Link} to="/products/womens-dresses" onClick={() => setShowOffcanvas(false)}>
              Women
            </Nav.Link>
            <Nav.Link as={Link} to="/products/mens-shirts" onClick={() => setShowOffcanvas(false)}>
              Men
            </Nav.Link>
            <Nav.Link as={Link} to="/products/home-decoration" onClick={() => setShowOffcanvas(false)}>
              Home & Kitchen
            </Nav.Link>
            <Nav.Link as={Link} to="/products/smartphones" onClick={() => setShowOffcanvas(false)}>
              Electronics
            </Nav.Link>
          </Nav>
          
          <hr />
          
          <Form className="d-flex mb-3" onSubmit={handleSearch}>
            <InputGroup>
              <Form.Control
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline-secondary" type="submit">
                <Search size={18} />
              </Button>
            </InputGroup>
          </Form>
          
          <div className="d-flex flex-column gap-2">
            <Button 
              as={Link} 
              to="/cart" 
              variant="outline-primary" 
              className="d-flex align-items-center justify-content-center"
              onClick={() => setShowOffcanvas(false)}
            >
              <ShoppingCart size={18} className="me-2" />
              Cart ({totalItems})
            </Button>
            
            <Button variant="outline-secondary" className="d-flex align-items-center justify-content-center">
              <User size={18} className="me-2" />
              Profile
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
