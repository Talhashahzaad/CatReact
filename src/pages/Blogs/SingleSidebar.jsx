import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
//import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { $siteURL } from "../../common/SiteURL";

const SingleSidebar = () => {
    const [BlogListingData, setBlogListingData] = useState([]);
    const [searchListingFields, setSearchListingFields] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const handleSearchListingFields = () => {
        setSearchListingFields(!searchListingFields);
    }

    useEffect(() => {
        const BlogListingData = async () => {
            const response = await fetch(`${$siteURL}/api/blog/`);
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
            const response = await fetch(`${$siteURL}/api/blog-category`);
            const data = await response.json();
            setBlogListingCategory(data);
        }
        BlogListingCategory();
    }, []);

    const filterBlogListingCategory = (blogsCategory) => {
        return blogsCategory.filter(blogCategory => blogCategory.id === BlogListingCategory.id);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredBlogs = BlogListingData.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
                <div className='sidebar-blog-post-related-posts'>
                    <div className='sidebar-blog-post-related-posts-search'>
                        <div className='sidebar-blog-post-related-posts-search-input w-100 h-auto position-relative mb-5'>
                            <div className='d-flex justify-content-between align-items-center w-100 h-auto position-relative'>
                                <input 
                                    type='text' 
                                    placeholder='Search your blog' 
                                    className='form-control' 
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    onClick={handleSearchListingFields}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                                />

                                <div className={`position-absolute top-auto start-0 searchListingAPI ${!isFocused || !searchTerm ? 'd-none' : 'd-block'}`}>
                                    <ul className='mb-0 ps-0'>
                                        {searchTerm && filteredBlogs
                                            .sort((a, b) => b.id - a.id)
                                            .slice(0, 30)
                                            .map((blog) => (
                                                <li key={blog.id}>
                                                    <Link to={`/blog/${blog.slug}`} onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); window.location.href = `/blog/${blog.slug}`; }} className='d-flex align-items-center'>
                                                        <figure className='mb-0'>
                                                            <img src={`${$siteURL}${blog.image}`} alt={blog.title} title={blog.title} className='img-fluid' loading='lazy' />
                                                        </figure>
                                                        <h4 className='mb-0'>
                                                            <small className='text-capitalize d-block h6'>
                                                                {blog.title.length > 35 ? blog.title.substring(0, 35) + '...' : blog.title}
                                                            </small>
                                                            </h4>
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                                {/* <div className='sidebar-blog-post-related-posts-search-input-button'>
                                <button className='btn btn-default text-capitalize' type='submit'><FaSearch /></button>
                                </div> */}
                            </div>
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
                                                <figure><img src={`${$siteURL}${blog.image}`} alt={blog.title} title={blog.title} className='img-fluid' loading='lazy' /></figure>
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
                                                <figure><img src={`${$siteURL}${blog.image}`} alt={blog.title} title={blog.title} className='img-fluid' loading='lazy' /></figure>
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