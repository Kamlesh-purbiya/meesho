import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Pagination, Card, Offcanvas } from 'react-bootstrap';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import useProducts from '../hooks/useProducts';
import ProductCard from '../components/ProductCard/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

const ProductListing = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  const productsPerPage = 12;
  const skip = (currentPage - 1) * productsPerPage;
  
  const { products, loading, error, total } = useProducts(category, productsPerPage, skip);
  
  const searchTerm = searchParams.get('search');
  const totalPages = Math.ceil(total / productsPerPage);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = !searchTerm || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const discountedPrice = product.price - (product.price * product.discountPercentage / 100);
      const matchesPrice = discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
      const matchesRating = product.rating >= minRating;
      
      return matchesSearch && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price - (a.price * a.discountPercentage / 100)) - 
                 (b.price - (b.price * b.discountPercentage / 100));
        case 'price-high':
          return (b.price - (b.price * b.discountPercentage / 100)) - 
                 (a.price - (a.price * a.discountPercentage / 100));
        case 'rating':
          return b.rating - a.rating;
        case 'discount':
          return b.discountPercentage - a.discountPercentage;
        default:
          return 0;
      }
    });

  const resetFilters = () => {
    setPriceRange([0, 2000]);
    setMinRating(0);
    setSortBy('');
  };

  const FilterContent = () => (
    <>
      <Card className="mb-3">
        <Card.Header>
          <h6 className="mb-0">Price Range</h6>
        </Card.Header>
        <Card.Body>
          <Form.Range
            min={0}
            max={2000}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="mb-2"
          />
          <div className="d-flex justify-content-between small text-muted">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </Card.Body>
      </Card>

      <Card className="mb-3">
        <Card.Header>
          <h6 className="mb-0">Minimum Rating</h6>
        </Card.Header>
        <Card.Body>
          <div className="d-flex flex-column gap-2">
            {[4, 3, 2, 1].map(rating => (
              <Form.Check
                key={rating}
                type="radio"
                id={`rating-${rating}`}
                label={`${rating}★ & above`}
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
              />
            ))}
            <Form.Check
              type="radio"
              id="rating-all"
              label="All Ratings"
              name="rating"
              checked={minRating === 0}
              onChange={() => setMinRating(0)}
            />
          </div>
        </Card.Body>
      </Card>

      <Button variant="outline-secondary" onClick={resetFilters} className="w-100">
        Clear Filters
      </Button>
    </>
  );

  if (error) {
    return (
      <Container className="my-5">
        <div className="text-center">
          <h3>Error loading products</h3>
          <p className="text-muted">{error}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2>
                {searchTerm ? `Search Results for "${searchTerm}"` : 
                 category ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') : 
                 'All Products'}
              </h2>
              <p className="text-muted mb-0">
                {filteredProducts.length} of {total} products
              </p>
            </div>
            
            <div className="d-flex gap-2">
              <Button
                variant="outline-primary"
                className="d-lg-none"
                onClick={() => setShowFilters(true)}
              >
                <Filter size={16} className="me-2" />
                Filters
              </Button>
              
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="">Sort by</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="discount">Best Discount</option>
              </Form.Select>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        {/* Desktop Filters */}
        <Col lg={3} className="d-none d-lg-block">
          <div className="sticky-top" style={{ top: '100px' }}>
            <div className="d-flex align-items-center mb-3">
              <SlidersHorizontal size={20} className="me-2" />
              <h5 className="mb-0">Filters</h5>
            </div>
            <FilterContent />
          </div>
        </Col>

        {/* Mobile Filters Offcanvas */}
        <Offcanvas show={showFilters} onHide={() => setShowFilters(false)} placement="start">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <FilterContent />
          </Offcanvas.Body>
        </Offcanvas>

        {/* Products Grid */}
        <Col lg={9}>
          {loading ? (
            <LoadingSpinner text="Loading products..." />
          ) : filteredProducts.length > 0 ? (
            <>
              <Row className="g-4">
                {filteredProducts.map((product) => (
                  <Col key={product.id} xs={6} md={4} lg={4}>
                    <ProductCard product={product} />
                  </Col>
                ))}
              </Row>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-5">
                  <Pagination>
                    <Pagination.Prev
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    />
                    
                    {[...Array(Math.min(5, totalPages))].map((_, index) => {
                      const pageNum = index + 1;
                      return (
                        <Pagination.Item
                          key={pageNum}
                          active={pageNum === currentPage}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Pagination.Item>
                      );
                    })}
                    
                    <Pagination.Next
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    />
                  </Pagination>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-5">
              <h4>No products found</h4>
              <p className="text-muted">Try adjusting your filters or search term</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductListing;