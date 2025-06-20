import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, getItemQuantity } = useCart();
  
  const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className="product-card h-100 border-0 shadow-sm">
      <div className="position-relative">
        <Link to={`/product/${product.id}`}>
          <Card.Img 
            variant="top" 
            src={product.thumbnail} 
            alt={product.title}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </Link>
        {product.discountPercentage > 0 && (
          <Badge className="position-absolute top-0 start-0 m-2 discount-badge">
            {Math.round(product.discountPercentage)}% OFF
          </Badge>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Link to={`/product/${product.id}`} className="text-decoration-none">
          <Card.Title className="h6 text-dark mb-2" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {product.title}
          </Card.Title>
        </Link>
        
        <div className="d-flex align-items-center mb-2">
          <div className="d-flex align-items-center me-2">
            <Star size={14} className="text-warning me-1" fill="currentColor" />
            <small className="text-muted">{product.rating} ({Math.floor(Math.random() * 100) + 10})</small>
          </div>
        </div>
        
        <div className="price-section mb-3">
          <div className="d-flex align-items-center">
            <span className="fw-bold text-success me-2">₹{Math.round(discountedPrice)}</span>
            {product.discountPercentage > 0 && (
              <span className="price-original small">₹{product.price}</span>
            )}
          </div>
          <small className="text-muted">Free Delivery</small>
        </div>
        
        <div className="mt-auto">
          <Button 
            variant="outline-primary" 
            size="sm" 
            className="w-100 d-flex align-items-center justify-content-center"
            onClick={handleAddToCart}
          >
            <ShoppingCart size={16} className="me-2" />
            {quantity > 0 ? `In Cart (${quantity})` : 'Add to Cart'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;