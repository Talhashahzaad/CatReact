import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams, Link} from 'react-router-dom';
//import BlogListing from './BlogListing';
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaTag } from "react-icons/fa";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import SingleSidebar from './SingleSidebar';
import Error404Page from '../Error404/Error404';


const SinglePost = (  ) => {
const {title} = useParams();

// useEffect(() => {
//     const blog = BlogListing.find(b => b.title === title);
//     setBlog(blog);
//     setCategories(blog ? [blog.category] : []);
// }, [title]);

    const [BlogListing, setBlogListing] = useState([]);

    useEffect(() =>{
        const BlogListing = async () =>{
            const response = await fetch(`http://3.8.140.227:8000/api/blog/${title}`);
            const data = await response.json();
            setBlogListing(data);
        }
        BlogListing();
    }, []);

    const currentIndex = BlogListing.findIndex(b => b.title === title);
    //const previousBlog = currentIndex > 0 ? BlogListing[currentIndex - 1] : null;
    //const nextBlog = currentIndex < BlogListing.length - 1 ? BlogListing[currentIndex + 1] : null;

    if (!BlogListing) {
        return <Error404Page />;
    }

    return(
        <>
            <div className='single-blog-post-feature-image'>
                <figure>
                    <img src={`http://3.8.140.227:8000${BlogListing.map(blog => blog.image)}`} alt={BlogListing.map(blog => blog.title)} title={BlogListing.map(blog => blog.title)} className='img-fluid' />
                </figure>
            </div>
            <Container className='py-5'>
                <Row>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={12}>
                        <div className="single-blog-post">
                            <h1>{BlogListing.map(blog => blog.title)}</h1>

                            <div className='single-blog-post-footer mb-3'>
                                <ul className='d-flex ps-0 mb-0 align-items-center justify-content-start'>
                                    <li className='d-flex align-items-center justify-content-start'><FaUserCircle className='me-2' /> By: {BlogListing.map(blog => blog.author_id)}</li>
                                    <li className='d-flex align-items-center justify-content-start'><MdDateRange className='me-2' /> Date: {new Date(BlogListing.map(blog => blog.updated_at)).toLocaleDateString('en-US')}</li>
                                    <li className='d-flex align-items-center justify-content-start'><FaTag className='me-2' /> Category: {BlogListing.map(blog => blog.blog_category_id)}</li>
                                </ul>
                            </div>
                            
                            <div className='single-blog-post-description' dangerouslySetInnerHTML={{ __html: BlogListing.map(blog => blog.description) }} />
                            
                        </div>
                        {/* <div className='single-blog-post-next-prev'>
                            {previousBlog && (
                                <Link to={`/blog/${previousBlog.title}`} className='single-blog-post-prev-link me-3' onClick={() => { window.scrollTo(0, 0); }}>
                                    <IoIosArrowRoundBack className='me-2' /> Previous
                                </Link>
                            )}
                            {nextBlog && (
                                <Link to={`/blog/${nextBlog.title}`} className='single-blog-post-next-link' onClick={() => { window.scrollTo(0, 0); }}>
                                    Next <IoIosArrowRoundForward className='ms-2' />
                                </Link>
                            )}
                        </div> */}
                    </Col>
                    
                    <SingleSidebar />
                </Row>
            </Container>
        </>
    );
};

export default SinglePost;