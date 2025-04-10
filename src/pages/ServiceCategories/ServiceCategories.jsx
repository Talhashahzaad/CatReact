import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './ServiceCategories.css';
import axios from 'axios';

const ServiceCategories = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://3.8.140.227:8000/api/category');
                setCategories(response.data);
            } catch (error) {
                setError(error || 'Category not found');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);
  return (
    <>
        <div className="service-categories">
            <Container>

            <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h1 className='text-center py-5 mb-0 font-bold'>Service Categories</h1>
                    </Col>
                    </Row>
                <Row className='category-cards'>
                    {categories.map((category) => {
                        return (
                            <Col key={category.id} xxl={3} xl={3} lg={3} md={4} sm={6} xs={12}>
                                <div className='service-category-card'>
                                    <img src={`http://3.8.140.227:8000${category.background_image}`} alt={category.name} className='img-fluid' />
                                    <h3>{category.name}</h3>
                                    {/* <p>{category.description.split(' ').slice(0, 12).join(' ') + '...'}</p> */}
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    </>
  );
};

export default ServiceCategories;