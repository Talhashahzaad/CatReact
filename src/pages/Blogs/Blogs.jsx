import React, { useState } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import './Blogs.css';
import blogFeatureImage from '../../images/blogFeature.jpg';
import BlogListing from './BlogListing';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';


const Blogs = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBlogs = BlogListing.slice(startIndex, endIndex);

    return(
        <>
            <div className='blog-page-feature-image w-100 h-auto d-flex justify-content-center align-items-center position-relative flex-column'>
                <img src={blogFeatureImage} alt='blog-page-feature-image' className='img-fluid' />
                <div className='blog-page-feature-image-text'>
                    <h1>Blogs</h1>
                </div>
            </div>

            
            <Container className='py-5'>

                <Row>
                    {currentBlogs.map((blog) => (
                        <Col key={blog.title} xxl={4} xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Link to={`/blog/${blog.title}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                <BlogCard
                                    image={blog.image}
                                    title={blog.title.split(' ').slice(0, 5).join(' ') + '...'}
                                    description={blog.description.split(' ').slice(0, 10).join(' ') + '...'}
                                    date={new Date(blog.date).toLocaleDateString('en-US')}
                                    author={blog.author}
                                    category={blog.category}
                                />
                            </Link>
                        </Col>
                    ))}
                </Row>

                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Pagination>
                            <Pagination.First className='tool-tip' title='First' onClick={() => { setCurrentPage(1); window.scrollTo(0, 0); }} />

                            <Pagination.Prev className='tool-tip' title='Previous' onClick={() => { setCurrentPage(currentPage > 1 ? currentPage - 1 : 1); window.scrollTo(0, 0); }} />

                            {Array.from({ length: Math.ceil(BlogListing.length / itemsPerPage) }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => { setCurrentPage(index + 1); window.scrollTo(0, 0); }}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            
                            <Pagination.Next className='tool-tip' data-tip='Next' onClick={() => { setCurrentPage(currentPage < Math.ceil(BlogListing.length / itemsPerPage) ? currentPage + 1 : Math.ceil(BlogListing.length / itemsPerPage)); window.scrollTo(0, 0); }} />

                            <Pagination.Last className='tool-tip' data-tip='Last' onClick={() => { setCurrentPage(Math.ceil(BlogListing.length / itemsPerPage)); window.scrollTo(0, 0); }} />
                        </Pagination>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Blogs;