import React, { useState } from "react";
import { Container, Row, Col, Modal, Button, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight, FaTimes, FaClock, FaMapMarkerAlt, FaMapSigns, FaShareAlt, FaHeart, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import './ListingDetails.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Blog1 from "../../images/blog-1.jpg";
import Blog2 from "../../images/blog-2.jpg";
import Blog3 from "../../images/blog-3.jpg";
import Blog4 from "../../images/blog-4.jpg";
import Blog5 from "../../images/blog-5.jpg";
import confirmCheck from "../../images/check-circle.svg";
import { Link } from "react-router-dom";


export default function ListingDetails() {
    const [showGallery, setShowGallery] = useState(false);
    const [showSlider, setShowSlider] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showAllServices, setShowAllServices] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [showOpeningHours, setShowOpeningHours] = useState(false);

    const toggleOpeningHours = () => {
        setShowOpeningHours(!showOpeningHours);
    };
    
    const imagesList = [
        { id: 0, url: Blog1, title: 'Beauty Salon Interior' },
        { id: 1, url: Blog2, title: 'Salon Services' },
        { id: 2, url: Blog3, title: 'Salon Equipment' },
        { id: 3, url: Blog4, title: 'Salon Products' },
        { id: 4, url: Blog5, title: 'Salon Atmosphere' },
    ];

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setShowSlider(true);
    };

    const handleCloseSlider = () => {
        setShowSlider(false);
    };

    const handleCloseGallery = () => {
        setShowGallery(false);
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1));
    };

    const previewImages = imagesList.slice(0, 3);

    const categoryName = [
        { id: 0, name: "Salon", duration: "30 min", price: "20" },
        { id: 1, name: "Barber", duration: "1 hour, 10 min", price: "25" },
        { id: 2, name: "Spa", duration: "1 hour, 20 min", price: "30" },
        { id: 3, name: "Beauty", duration: "1 hour, 30 min", price: "35" },
        { id: 4, name: "Massage", duration: "2 hour, 30 min", price: "40" },
    ];

    const toggleServices = () => {
        setShowAllServices(!showAllServices);
    };

    const toggleReviews = () => {
        setShowAllReviews(!showAllReviews);
    };

    const reviewCategory = [
        { id: 0, name: "alexander wagon", date: "18 Dec 2024", review: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.", initial: "a" },
        { id: 1, name: "cameron white", date: "18 Dec 2024", review: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.", initial: "c" },
        { id: 2, name: "alexander wagon", date: "18 Dec 2024", review: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.", initial: "a" },
        { id: 3, name: "cameron white", date: "18 Dec 2024", review: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.", initial: "c" },
        { id: 4, name: "alexander wagon", date: "18 Dec 2024", review: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.", initial: "a" },
        { id: 5, name: "cameron white", date: "18 Dec 2024", review: "The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.", initial: "c" },
    ];

    function renderStaffImage(imageSrc, altText, initial) {
        if (imageSrc) {
            return <img src={imageSrc} alt={altText} className="img-fluid staff-image-profile-circle" />;
        } else {
            return <span className="staff-color-name-circle">{initial}</span>;
        }
    }

    function truncateText(text, wordLimit) {
        const words = text.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : text;
    }

    return(
        <>
            <Container>
                <Row>
                    <Col>
                        <nav aria-label="breadcrumb" className="py-3">
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    {categoryName[0].name}
                                </li>
                            </ol>
                        </nav>
                    </Col>
                </Row>
            </Container>

            <Container>
                <Row>
                    <div className="gallery-preview position-relative mb-5">
                        <Row>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                <div className="business-details-header">
                                    <h2 className="business-details-title text-capitalize">beauty salon &amp; spa</h2>
                                </div>
                                <div className="business-further-details">
                                    <ul className="ps-0 d-flex gap-3">
                                        <li className="d-flex">
                                            <span className="icon me-2"><FaClock /></span>
                                            <span className="text-capitalize">Open until 10:00 pm</span>
                                        </li>
                                        <li className="d-flex">
                                            <span className="icon me-2"><FaMapMarkerAlt /></span>
                                            <span className="text-capitalize">15 Holyhead Rd, Bangor, Gwynedd, LL57 1JH, UK</span>
                                        </li>
                                        <li className="d-flex">
                                            <span className="icon me-2"><Link to="#" className="get-directions-btn text-capitalize text-decoration-none small"> <FaMapSigns /> get directions</Link></span>
                                        </li>
                                        <li className="d-flex">
                                            <span className="icon me-2">
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-share">Share</Tooltip>}
                                                >
                                                    <Link to="#"><FaShareAlt /></Link>
                                                </OverlayTrigger>
                                            </span>
                                        </li>
                                        <li className="d-flex">
                                            <span className="icon me-2">
                                                <OverlayTrigger
                                                    placement="top"
                                                    overlay={<Tooltip id="tooltip-save">Wishlist</Tooltip>}
                                                >
                                                    <Link to="#"><FaHeart /></Link>
                                                </OverlayTrigger>
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                        
                        <Row className="g-2">
                            <Col xxl={8} xl={8} lg={8} md={12} sm={12}>
                                <div className="main-image" onClick={() => handleImageClick(0)}>
                                    <img src={imagesList[0].url} alt={imagesList[0].title} className="img-fluid" />
                                </div>
                            </Col>
                            <Col xxl={4} xl={4} lg={4} md={12} sm={12}>
                                <Row className="g-2">
                                    {previewImages.slice(1).map((image, index) => (
                                        <Col md={12} key={index}>
                                            <div className="preview-image" onClick={() => handleImageClick(index + 1)}>
                                                <img src={image.url} alt={image.title} className="img-fluid" />
                                            </div>
                                        </Col>
                                    ))}
                                    <Button 
                                        variant="light" 
                                        className="see-all-btn"
                                        onClick={() => setShowGallery(true)}
                                    >
                                        See all images
                                    </Button>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </Container>

            {/* Gallery Modal Popup*/}
            <Modal 
                show={showGallery} 
                onHide={handleCloseGallery}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Gallery</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Row className="g-2">
                        {imagesList.map((image, index) => (
                            <Col md={6} key={image.id}>
                                <div 
                                    className="gallery-image"
                                    onClick={() => handleImageClick(index)}
                                >
                                    <img src={image.url} alt={image.title} className="img-fluid" />
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
            </Modal>

            {/* Image Slider Modal Popup*/}
            <Modal 
                show={showSlider} 
                onHide={handleCloseSlider}
                size="xl"
                centered
                className="slider-modal"
            >
                <Modal.Header className="border-0">
                    <button 
                        className="close-btn"
                        onClick={handleCloseSlider}
                    >
                        <FaTimes size={24} />
                    </button>
                </Modal.Header>

                <Modal.Body>
                    <div className="slider-container">
                        <button className="nav-btn prev" onClick={handlePrevImage}>
                            <FaArrowLeft size={24} />
                        </button>
                        <div className="slider-image">
                            <img 
                                src={imagesList[currentImageIndex].url} 
                                alt={imagesList[currentImageIndex].title} 
                                className="img-fluid"
                            />
                        </div>
                        <button className="nav-btn next" onClick={handleNextImage}>
                            <FaArrowRight size={24} />
                        </button>
                    </div>
                    <div className="image-counter">
                        {currentImageIndex + 1}/{imagesList.length}
                    </div>
                </Modal.Body>
            </Modal>


            <div className="listing-details-content-right w-100 h-auto d-block position-relative bg-white pb-5">
                <Container>
                    <Row>
                        <Col xxl={8} xl={8} lg={8} md={8} sm={12}>
                            <div className="listing-details-content-left-contact-details">
                                <h3 className="listing-details-content-left-contact-details-title py-0 my-0 text-capitalize">our services</h3>
                                <hr/>
                            </div>

                            <div className="listing-details-content-left-contact-details-services">
                                <ul className="ps-0">
                                    {categoryName.slice(0, showAllServices ? categoryName.length : 3).map((category, index) => (
                                        <li className="d-flex justify-content-between align-items-center" key={index}>
                                            <span className="icon me-2">
                                                <strong>{category.name}</strong>
                                                <h5>{category.duration}</h5>
                                                <small>price: &pound; {category.price}</small>
                                            </span>
                                            <span className="icon me-2">
                                                <button className="rounded-pill h6 py-3 px-4 border-0 bg-jetGreen text-white text-capitalize">inquire now</button>
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button 
                                    className="rounded-pill h6 py-3 px-4 border-0 bg-jetGreen text-white text-capitalize mb-5" 
                                    id="show-hide-all-services-btn" 
                                    onClick={toggleServices}
                                >
                                    {showAllServices ? 'Hide all services' : 'View all services'}
                                </button>
                            </div>

                            {/* services section closed here */}

                            <div className="listing-details-content-left-contact-details">
                                <h3 className="listing-details-content-left-contact-details-title py-3 my-0 text-capitalize">our staff</h3>
                                <hr/>
                            </div>

                            <div className="listing-details-content-left-contact-details-staff">
                                <ul className="ps-0 d-flex">
                                    <li>
                                        <figure>
                                            {renderStaffImage(Blog1, "staff-1", "j")}
                                            <figcaption>
                                                <h5>john doe</h5>
                                                <small>designation</small>
                                            </figcaption>
                                        </figure>
                                    </li>

                                    <li>
                                        <figure>
                                            {renderStaffImage(0, "", "l")}
                                            <figcaption>
                                                <h5>lily benworth</h5>
                                                <small>designation</small>
                                            </figcaption>
                                        </figure>
                                    </li>
                                </ul>
                            </div>

                            {/* staff section closed here */}

                            <div className="listing-details-content-left-reviews-details-heading">
                                <h3 className="listing-details-content-left-reviews-details-title py-3 my-0 text-capitalize">reviews</h3>
                                <ol className="ps-0 mb-0 d-flex">
                                    <li>
                                        <span>
                                            <IoStarSharp />
                                            <IoStarSharp />
                                            <IoStarSharp />
                                            <IoStarSharp />
                                            <IoStarSharp />
                                        </span>
                                    </li>
                                </ol>
                                <hr/>
                            </div>

                            <div className="listing-details-content-left-reviews-details-reviews-box">
                                <ul className="ps-0 d-flex flex-wrap">
                                {reviewCategory.slice(0, showAllReviews ? reviewCategory.length : 4).map((category, index) => (
                                        <li key={index}>
                                            <div className="listing-details-content-left-reviews-details-review-box">
                                                <figure>
                                                    <span className="review-user-name-icon">{category.initial}</span>
                                                    <figcaption>
                                                        <h5>{category.name}</h5>
                                                        <small>{category.date}</small>
                                                    </figcaption>
                                                </figure>
                                                <p>{truncateText(category.review, 20)}</p>
                                                <Link to="#" className="read-more-btn">read more</Link>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <button 
                                    className="rounded-pill h6 py-3 px-4 border-0 bg-jetGreen text-white text-capitalize mb-5" 
                                    onClick={toggleReviews}
                                >
                                    {showAllReviews ? 'Hide reviews' : 'See all reviews'}
                                </button>
                            </div>
                            {/* reviews section closed here */}


                            <div className="listing-details-content-left-breif-business-details">
                                <h3 className="listing-details-content-left-reviews-details-title py-3 my-0 text-capitalize">about business</h3>
                                <hr/>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
                                <p>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                            </div>
                            {/* content brief business details closed here */}


                            <div className="listing-details-content-left-map-details">
                                <h3 className="listing-details-content-left-reviews-details-title py-3 my-0 text-capitalize">map</h3>
                                <hr/>
                                <div className="listing-details-content-left-map-details-map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1246453.3383500716!2d-5.478944770870201!3d52.39799126284459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486434b66c1c0fed%3A0x1ebb71bc8aa5e8a2!2sWales%2C%20UK!5e0!3m2!1sen!2sin!4v1739365781635!5m2!1sen!2sin"></iframe>
                                </div>
                            </div>
                            {/* map details closed here */}

                            <div className="listing-details-content-left-additional-details">
                                <h3 className="listing-details-content-left-contact-details-title py-3 my-0 text-capitalize">additional details</h3>
                                <hr/>
                                <div className="listing-details-content-left-additional-details-box">
                                    <div className="d-flex justify-content-between align-items-flex-start">
                                        <span className="opening-time-details">
                                            <strong>opening hours</strong>
                                            <ul className="mb-0 ps-1 justify-content-between">
                                                <li>
                                                    <span>monday</span>
                                                    <span>10:00 am - 10:00 pm</span>
                                                </li>
                                                <li>
                                                    <span>tuesday</span>
                                                    <span>10:00 am - 10:00 pm</span>
                                                </li>
                                                <li>
                                                    <span>wednesday</span>
                                                    <span>10:00 am - 10:00 pm</span>
                                                </li>
                                                <li>
                                                    <span>thursday</span>
                                                    <span>10:00 am - 10:00 pm</span>
                                                </li>
                                                <li>
                                                    <span>friday</span>
                                                    <span>10:00 am - 10:00 pm</span>
                                                </li>
                                                <li>
                                                    <span>saturday</span>
                                                    <span>10:00 am - 10:00 pm</span>
                                                </li>
                                                <li>
                                                    <span>sunday</span>
                                                    <span>10:00 am - 10:00 pm</span>
                                                </li>
                                            </ul>
                                        </span>
                                        
                                        <span className="additional-information-details">
                                            <strong>Additional information</strong>
                                            <ul className="mb-0 ps-1 justify-content-between">
                                                <li>
                                                    <span><img src={confirmCheck} alt="confirm-check" /></span>
                                                    <span>Instant Confirmation</span>
                                                </li>
                                            </ul>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {/* additional details closed here */}

                            {/* <div className="listing-details-content-left-other-location">
                                <h3 className="listing-details-content-left-reviews-details-title py-3 my-0 text-capitalize">other locations</h3>
                                <hr/>
                                <div className="listing-details-content-left-other-location-map">
                                    <ul className="ps-0 mb-0 d-flex flex-wrap justify-content-between">
                                        <li>
                                            <div className="same-shop-other-salon-box">
                                                <img src={Blog1} alt="other-location-1" />
                                                <h3 className="text-capitalize"><Link to="#" className="anchorGreen headingFont">health treatment</Link></h3>
                                                <small className="d-block my-2">2217 S Normandie Ave, Los Angeles, California, 90007</small>
                                                <mark className="text-capitalize rounded-pill bg-jetGreen text-white d-inline-block py-0 px-3 small">health</mark>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="same-shop-other-salon-box">
                                                <img src={Blog2} alt="other-location-1" />
                                                <h3 className="text-capitalize"><Link to="#" className="anchorGreen headingFont">nail art</Link></h3>
                                                <small className="d-block my-2">5588 S Normandie Ave, Los Angeles, California, 90007</small>
                                                <mark className="text-capitalize rounded-pill bg-jetGreen text-white d-inline-block py-0 px-3 small">nail</mark>
                                            </div>
                                        </li>

                                        <li>
                                            <div className="same-shop-other-salon-box">
                                                <img src={Blog3} alt="other-location-1" />
                                                <h3 className="text-capitalize"><Link to="#" className="anchorGreen headingFont">hair salon</Link></h3>
                                                <small className="d-block my-2">9897 S Normandie Ave, Los Angeles, California, 90007</small>
                                                <mark className="text-capitalize rounded-pill bg-jetGreen text-white d-inline-block py-0 px-3 small">hair</mark>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                            {/* other location closed here */}
                        </Col>
                        <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                            <div className="listing-details-content-right-sticky-contact-details">
                                <h3 className="listing-details-content-right-contact-details-title py-0 my-0">Contact Details</h3>
                                <hr />

                                <div className="listing-details-content-right-sticky-contact-details-box">
                                    <div className="listing-details-content-right-sticky-contact-details-box-icon">
                                        <h2 className="text-capitalize h2 default-font fw-bold">skin &amp; healthcare</h2>
                                        <p>2217 S Normandie Ave, Los Angeles, California, 90007</p>
                                        
                                        <span className="right-contact-details-box-review-rating d-flex align-items-flex-start justify-content-flex-start">
                                            <span className="me-2 rating-number">4.8</span>
                                            <span className="mx-1 rating-star-icons">
                                                <IoStarSharp />
                                                <IoStarSharp />
                                                <IoStarSharp />
                                                <IoStarSharp />
                                                <IoStarSharp />
                                            </span>
                                            <span className="right-contact-details-box-review-rating-count"><Link to="#" className="anchorGreen">120 reviews</Link></span>
                                        </span>

                                        <span className="right-contact-details-box-contact-number">
                                            <Link to="#" className="anchorGreen text-capitalize h6 book-now-btn-right-sticky-contact-details-box">inquire now</Link>
                                        </span>

                                        <span className="right-contact-details-box-shop-closing-time">
                                            <ol className="ps-0 mb-0">
                                                <li>
                                                    <span>
                                                        <FaClock className="me-2" color="#6C8B57" />
                                                    </span>
                                                    <span>
                                                        opening hours
                                                        <Link to="#" className="anchorGreen ms-2" onClick={toggleOpeningHours}>
                                                            {showOpeningHours ? <FaArrowUp /> : <FaArrowDown />}
                                                        </Link>
                                                    </span>
                                                </li>
                                                <li>
                                                    <ul className={`ps-0 my-4 ${showOpeningHours ? 'd-block' : 'd-none'}`}>
                                                        <li className="d-flex justify-content-between align-items-center">
                                                            <span className="week-day-name">
                                                                monday
                                                            </span>
                                                            <span className="week-day-opening-and-closing-time">
                                                                10:00 am - 10:00 pm
                                                            </span>
                                                        </li>
                                                        <li className="d-flex justify-content-between align-items-center">
                                                            <span className="week-day-name">
                                                                tuesday
                                                            </span>
                                                            <span className="week-day-opening-and-closing-time">
                                                                10:00 am - 10:00 pm
                                                            </span>
                                                        </li>
                                                        <li className="d-flex justify-content-between align-items-center">
                                                            <span className="week-day-name">
                                                                wednesday
                                                            </span>
                                                            <span className="week-day-opening-and-closing-time">
                                                                10:00 am - 10:00 pm
                                                            </span>
                                                        </li>
                                                        <li className="d-flex justify-content-between align-items-center">
                                                            <span className="week-day-name">
                                                                thursday
                                                            </span>
                                                            <span className="week-day-opening-and-closing-time">
                                                                10:00 am - 10:00 pm
                                                            </span>
                                                        </li>
                                                        <li className="d-flex justify-content-between align-items-center">
                                                            <span className="week-day-name">
                                                                friday
                                                            </span>
                                                            <span className="week-day-opening-and-closing-time">
                                                                10:00 am - 10:00 pm
                                                            </span>
                                                        </li>
                                                        <li className="d-flex justify-content-between align-items-center">
                                                            <span className="week-day-name">
                                                                saturday
                                                            </span>
                                                            <span className="week-day-opening-and-closing-time">
                                                                10:00 am - 10:00 pm
                                                            </span>
                                                        </li>
                                                        <li className="d-flex justify-content-between align-items-center">
                                                            <span className="week-day-name">
                                                                sunday
                                                            </span>
                                                            <span className="week-day-opening-and-closing-time">
                                                                closed
                                                            </span>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ol>
                                        </span>

                                        <span className="right-contact-details-box-shop-full-address">
                                            <ol className="ps-0 mb-0">
                                                <li>
                                                    <span>
                                                        <FaMapMarkerAlt />
                                                    </span>
                                                    <span>
                                                        2217 S Normandie Ave, Los Angeles, California, 90007 
                                                        <Link to="#" className="anchorGreen ms-2">Get Direction</Link>
                                                    </span>
                                                </li>
                                            </ol>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}