import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer-section mt-5">
      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <h5 className="text-meesho-primary fw-bold">Meesho</h5>
            <p className="text-light">
              Your trusted partner for online shopping. Discover millions of products 
              at the best prices with fast delivery.
            </p>
            <div className="social-icons">
              <a href="#"><Facebook size={20} /></a>
              <a href="#"><Twitter size={20} /></a>
              <a href="#"><Instagram size={20} /></a>
              <a href="#"><Youtube size={20} /></a>
            </div>
          </Col>
          
          <Col md={2} className="mb-4">
            <h6 className="fw-bold">Company</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">About Us</a></li>
              <li><a href="#" className="text-light text-decoration-none">Careers</a></li>
              <li><a href="#" className="text-light text-decoration-none">Press</a></li>
              <li><a href="#" className="text-light text-decoration-none">Blog</a></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4">
            <h6 className="fw-bold">Help</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Customer Support</a></li>
              <li><a href="#" className="text-light text-decoration-none">Shipping Info</a></li>
              <li><a href="#" className="text-light text-decoration-none">Returns</a></li>
              <li><a href="#" className="text-light text-decoration-none">Size Guide</a></li>
            </ul>
          </Col>
          
          <Col md={2} className="mb-4">
            <h6 className="fw-bold">Categories</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Women</a></li>
              <li><a href="#" className="text-light text-decoration-none">Men</a></li>
              <li><a href="#" className="text-light text-decoration-none">Electronics</a></li>
              <li><a href="#" className="text-light text-decoration-none">Home & Kitchen</a></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="fw-bold">Contact Info</h6>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex align-items-center">
                <Mail size={16} className="me-2" />
                <span className="text-light">support@meesho.com</span>
              </div>
              <div className="d-flex align-items-center">
                <Phone size={16} className="me-2" />
                <span className="text-light">+91 12345 67890</span>
              </div>
              <div className="d-flex align-items-center">
                <MapPin size={16} className="me-2" />
                <span className="text-light">Bangalore, India</span>
              </div>
            </div>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row>
          <Col md={6}>
            <p className="text-light mb-0">&copy; 2024 Meesho. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-end">
            <a href="#" className="text-light text-decoration-none me-3">Privacy Policy</a>
            <a href="#" className="text-light text-decoration-none me-3">Terms of Service</a>
            <a href="#" className="text-light text-decoration-none">Cookie Policy</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;