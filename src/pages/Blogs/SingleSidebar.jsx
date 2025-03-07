import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SingleSidebar = () => {
    const [BlogListingData, setBlogListingData] = useState([]);

    useEffect(() => {
        const BlogListingData = async () => {
            const response = await fetch('http://3.8.140.227:8000/api/blog/');
            const data = await response.json();
            setBlogListingData(data);
        }
        BlogListingData();
    }, []);

    const filterPopularBlogs = (blogs) => {
        return blogs.filter(blog => blog.is_popular === 1);
    };

    const [BlogListingCategory, setBlogListingCategory] = useState([]);

    useEffect(() => {
        const BlogListingCategory = async () => {
            const response = await fetch('http://3.8.140.227:8000/api/blog-category');
            const data = await response.json();
            setBlogListingCategory(data);
        }
        BlogListingCategory();
    }, []);

    const filterBlogListingCategory = (blogsCategory) => {
        return blogsCategory.filter(blogCategory => blogCategory.id === BlogListingCategory.id);
    };

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
                                {BlogListingData && filterBlogListingCategory(BlogListingCategory) && BlogListingCategory.length > 0 && BlogListingData
                                    .sort((a, b) => b.id - a.id)
                                    .slice(0, 3)
                                    .map((blog, index) => (
                                        <li key={blog.id}>
                                            <Link to={`/blog/${blog.slug}`} onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); window.location.href = `/blog/${blog.slug}`; }}>
                                                <figure><img src={`http://3.8.140.227:8000${blog.image}`} alt={blog.title} title={blog.title} className='img-fluid' loading='lazy' /></figure>
                                                <h4 className='mb-0'>{blog.title.length > 20 ? blog.title.substring(0, 20) + '...' : blog.title}
                                                    <small className='text-capitalize d-block h6'>{BlogListingCategory[index].name ? BlogListingCategory[index].name : ''}</small>
                                                </h4>
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
                                {BlogListingData && filterPopularBlogs(BlogListingData) 
                                    .slice(0, 3)
                                    .sort((a, b) => a.id - b.id)
                                    .map((blog) => (
                                        <li key={blog.id}>
                                            <Link to={`/blog/${blog.slug}`} onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); window.location.href = `/blog/${blog.slug}`; }}>
                                                <figure><img src={`http://3.8.140.227:8000${blog.image}`} alt={blog.title} title={blog.title} className='img-fluid' loading='lazy' /></figure>
                                                <h4 className='mb-0'>{blog.title.length > 20 ? blog.title.substring(0, 20) + '...' : blog.title}
                                                    <small className='text-capitalize d-block h6' dangerouslySetInnerHTML={{ __html: blog.description.substring(0, 40) + '...' }}  />
                                                </h4>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Col>
        </>
    );
}

export default SingleSidebar;