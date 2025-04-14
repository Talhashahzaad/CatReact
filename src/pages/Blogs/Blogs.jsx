import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import './Blogs.css';
import blogFeatureImage from '../../images/blogFeature.webp';
//import BlogListing from './BlogListing';
import BlogCard from './BlogCard';
import { Link } from 'react-router-dom';
import { $siteURL } from "../../common/SiteURL";

const Blogs = () => {

    const [BlogListingData, setBlogListingData] = useState([]);

    useEffect(() =>{
        const BlogListingData = async () =>{
            const response = await fetch(`${$siteURL}/api/blog/`);
            const data = await response.json();
            // Sort blogs by updated_at in descending order
            data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
            setBlogListingData(data);
        }
        BlogListingData();
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = BlogListingData.length > 6 ? 6 : BlogListingData.length;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentBlogs = BlogListingData.slice(startIndex, endIndex);

    const [BlogListingCategory, setBlogListingCategory] = useState([]);

    useEffect(() => {
        const fetchBlogListingCategory = async () => {
            const response = await fetch(`${$siteURL}/api/blog-category`);
            const data = await response.json();
            setBlogListingCategory(data);
        }
        fetchBlogListingCategory();
    }, []);

    const getCategoryName = (categoryId) => {
        const category = BlogListingCategory.find(cat => cat.id === categoryId);
        return category ? category.name : '';
    };

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch(`${$siteURL}/api/blog/`);
                const data = await response.json();

                const authorMap = {};
                data.forEach(author => {
                    authorMap[author.id] = author.name;
                });

            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };
        fetchAuthors();
    }, []);

    const stripHTML = (html) => {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return doc.body.textContent || "";
    };

    function blogPagination() {
        if (BlogListingData.length > 6) {
            const blogPagination = BlogListingData.length / 6;
            return blogPagination; 
        } else {
            return 1;
        }
    }


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
                    {currentBlogs.map((blog)  => (
                        <Col key={blog.title} xxl={4} xl={4} lg={4} md={6} sm={12} xs={12}>
                            <Link to={`/blog/${blog.slug}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                <BlogCard
                                    image={`${$siteURL}${blog.image}`}
                                    title={blog.title.split(' ').slice(0, 5).join(' ') + '...'}
                                    description={stripHTML(blog.description).split(' ').slice(0, 30).join(' ') + '...'}
                                    slug={blog.slug}
                                    date={new Date(blog.updated_at).toLocaleDateString('en-US')}
                                    author={blog.user.name}
                                    category={getCategoryName(blog.blog_category_id)}
                                />
                            </Link>
                        </Col>
                    ))}
                </Row>

                {blogPagination() > 1 && (
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Pagination>
                            <Pagination.First className='tool-tip' title='First' onClick={() => { setCurrentPage(1); window.scrollTo(0, 0); }} />
                            
                            <Pagination.Prev className='tool-tip' title='Previous' onClick={() => { setCurrentPage(currentPage > 1 ? currentPage - 1 : 1); window.scrollTo(0, 0); }} />
                            
                            {Array.from({ length: Math.ceil(BlogListingData.length / itemsPerPage) }, (_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === currentPage}
                                    onClick={() => { setCurrentPage(index + 1); window.scrollTo(0, 0); }}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                            
                            <Pagination.Next className='tool-tip' data-tip='Next' onClick={() => { setCurrentPage(currentPage < Math.ceil(BlogListingData.length / itemsPerPage) ? currentPage + 1 : Math.ceil(BlogListingData.length / itemsPerPage)); window.scrollTo(0, 0); }} />

                            <Pagination.Last className='tool-tip' data-tip='Last' onClick={() => { setCurrentPage(Math.ceil(BlogListingData.length / itemsPerPage)); window.scrollTo(0, 0); }} />
                        </Pagination>
                    </Col>
                </Row>
                )}
            </Container>
        </>
    );
};

export default Blogs;