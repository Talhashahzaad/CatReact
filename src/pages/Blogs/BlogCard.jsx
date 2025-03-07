import React from 'react';
import {useNavigate} from 'react-router-dom';

const BlogCard = ({image, title, description, date, author, slug, category}) => {
    
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/blog/${slug}`);
    };

    //const {image, title, description, date, author, slug} = props;

    return(
        <>
            <div className='blog-card' onClick={handleClick} style={{ cursor: 'pointer' }}>
                <figure className='blog-card-image mb-0 overflow-hidden'>
                    <img src={image} alt={title} title={title} className='img-fluid' loading='lazy' />
                </figure>
                <h3>{title.split(' ').slice(0, 4).join(' ') + '...'}</h3>
                <div className='blog-card-description'>
                    <p dangerouslySetInnerHTML={{ __html: description.split(' ').slice(0, 24).join(' ') + '...' }} />
                </div>
                <div className='blog-card-footer d-flex justify-content-between align-items-center px-2'>
                    <p className='blog-card-footer-date'>Upload on: {date}</p>
                    <p className='blog-card-footer-author text-capitalize'>by: {author}</p>
                    <p className='blog-card-footer-category text-capitalize position-absolute'>category: {category}</p>
                </div>
            </div>
        </>
    );
};

export default BlogCard;