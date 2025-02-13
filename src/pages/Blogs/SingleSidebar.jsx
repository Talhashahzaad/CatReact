import React, { useState } from 'react';
//import {useNavigate} from 'react-router-dom';
import { Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import BlogListing from './BlogListing';
import { Link } from 'react-router-dom';

const SingleSidebar = () => {
    // const navigate = useNavigate();
    // const [searchQuery, setSearchQuery] = useState('');

    // const handleSearch = (e) => {
    //     e.preventDefault();
    //     if (searchQuery.trim()) {
    //        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    //     }
    // };

    return (
        <>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
                <div className='sidebar-blog-post-related-posts'>
                    <div className='sidebar-blog-post-related-posts-search'>
                        <div className='sidebar-blog-post-related-posts-search-input w-100 h-auto position-relative mb-5'>
                            <form className='d-flex justify-content-between align-items-center'>
                                <input type='text' placeholder='Search your blog' className='form-control' />

                                <div className='sidebar-blog-post-related-posts-search-input-button'>
                                <button className='btn btn-default text-capitalize' type='submit'><FaSearch /></button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='sidebar-blog-post-categories'>
                        <h3>Categories:</h3>
                        <div className='categories-list'>
                            <ul className='list-unstyled'>
                                {BlogListing
                                    .sort((a, b) => b.id - a.id)
                                    .slice(0, 3)
                                    .map((blog) => (
                                        <li key={blog.id}>
                                            <Link to={`/blog/${blog.title}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                                <figure><img src={blog.image} alt={blog.title} title={blog.title} className='img-fluid' /></figure>
                                                <h4>{blog.title}</h4>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>

                    <div className='sidebar-blog-post-related-posts-popular'>
                        <h3>Popular Posts:</h3>
                        <div className='popular-posts-list'>
                            <ul className='list-unstyled'>
                                {BlogListing
                                    .sort((a, b) => a.id - b.id)
                                    .slice(0, 3)
                                    .map((blog) => (
                                        <li key={blog.id}>
                                            <Link to={`/blog/${blog.title}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                                <figure><img src={blog.image} alt={blog.title} title={blog.title} className='img-fluid' /></figure>
                                                <h4>{blog.title}</h4>
                                            </Link>
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Col>
        </>
    );
}

export default SingleSidebar;