import React from 'react';

const BlogCard = (props) => {

    const {image, title, description, date, author} = props;

    return(
        <>
            <div className='blog-card'>
                <figure className='blog-card-image mb-0 overflow-hidden'><img src={image} alt='blog-card-image' className='img-fluid' /></figure>
                <h3>{title}</h3>
                <article>{description}</article>
                <div className='blog-card-footer d-flex justify-content-between align-items-center px-2'>
                    <p className='blog-card-footer-date'>{date}</p>
                    <p className='blog-card-footer-author text-capitalize'>by: {author}</p>
                </div>
            </div>
        </>
    );
};

export default BlogCard;