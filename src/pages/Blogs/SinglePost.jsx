import React, {useEffect, useState} from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {useParams} from 'react-router-dom';
//import BlogListing from './BlogListing';
import { FaUserCircle } from "react-icons/fa";
import { MdDateRange } from "react-icons/md";
import { FaTag } from "react-icons/fa";
//import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import SingleSidebar from './SingleSidebar';
import Error404Page from '../Error404/Error404';


const SinglePost = (  ) => {
const {title} = useParams();

// useEffect(() => {
//     const blog = BlogListing.find(b => b.title === title);
//     setBlog(blog);
//     setCategories(blog ? [blog.category] : []);
// }, [title]);

    const [BlogListingData, setBlogListingData] = useState([]);

    useEffect(() =>{
        const BlogListingData = async () =>{
            const response = await fetch(`http://3.8.140.227:8000/api/blog/${title}`);
            const data = await response.json();
            setBlogListingData(data);
        }
        BlogListingData();
    }, []);

    //const currentIndex = BlogListing.findIndex(b => b.title === title);
    //const previousBlog = currentIndex > 0 ? BlogListing[currentIndex - 1] : null;
    //const nextBlog = currentIndex < BlogListing.length - 1 ? BlogListing[currentIndex + 1] : null;

    if (!BlogListingData) {
        return <Error404Page />;
    }

    const [BlogListingCategory, setBlogListingCategory] = useState([]);

    useEffect(() => {
        const BlogListingCategory = async () => {
            const response = await fetch('http://3.8.140.227:8000/api/blog-category');
            const data = await response.json();
            setBlogListingCategory(data);
        }
        BlogListingCategory();
    }, []);

    const categoryName = BlogListingCategory.find(cat => cat.id === BlogListingData.blog_category_id);

    const [fetchAuthors, setFetchAuthors] = useState({});
    
    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch('http://3.8.140.227:8000/api/blog/');
                const data = await response.json();
                console.log(data);

                const authorMap = {};
                data.forEach(author => {
                    authorMap[author.id] = author.name;
                });
                setFetchAuthors(authorMap);
            } catch (error) {
                console.error('Error fetching authors:', error);
            }
        };
        fetchAuthors();
    }, []);
    
    return(
        <>
            <div className='single-blog-post-feature-image'>
                <figure>
                    <img src={`http://3.8.140.227:8000${BlogListingData.image}`} alt={BlogListingData.title} title={BlogListingData.title} className='img-fluid' loading='lazy' />
                </figure>
            </div>
            
            <Container className='py-5'>
                <Row>
                    <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={12}>
                        <div className="single-blog-post">
                            <h1>{BlogListingData.title}</h1>
                            
                            <div className='single-blog-post-footer mb-3'>
                                <ul className='d-flex ps-0 mb-0 align-items-center justify-content-start'>
                                    <li className='d-flex align-items-center justify-content-start'><FaUserCircle className='me-2' /> By: 
                                    {BlogListingData.user?.name}</li>

                                    <li className='d-flex align-items-center justify-content-start'><MdDateRange className='me-2' /> Date: {new Date(BlogListingData.updated_at).toLocaleDateString('en-US')}</li>

                                    {categoryName && (
                                        <li className='d-flex align-items-center justify-content-start'>
                                            <FaTag className='me-2' /> 
                                            Category: {categoryName ? categoryName.name : ''}
                                        </li>
                                    )}
                                </ul>
                            </div>
                            <div className='single-blog-post-description' dangerouslySetInnerHTML={{ __html: BlogListingData.description }} />
                        </div>
                    </Col>
                    
                    <SingleSidebar />
                </Row>
            </Container>
            
        </>
    );
};

export default SinglePost;