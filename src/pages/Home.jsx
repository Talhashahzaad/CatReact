import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import arrowTopRight from "../images/arrowTopRight.svg";
import linkIcon from "../images/linkIcon.svg";
// import blog1 from"../images/blog-1.jpg";
// import blog2 from"../images/blog-2.jpg";
// import blog3 from"../images/blog-3.jpg";
// import blog4 from"../images/blog-4.jpg";
import eyeIcon from"../images/eyeIcon.svg";
//import FeatureCarousel from "../component/FeatureCarousel";
import FeatureProducts from "../component/FeatureProducts";
//import TrendingCarousel from "../component/TrendingCarousel";
import catDoubleCircles from "../images/catDoubleCircles.svg";
import searchIcon from "../images/searchIcon.svg";
import categoriesIcon from "../images/categoriesIcon.svg";
import mapMarkerIcon from "../images/mapMarkerIcon.svg";
import WantToSeeMoreCarousel from "../component/WanToSeeMoreCarousel";
import ProductComingSoon from "../images/check-a-treatment-coming-soon-banner.jpg";
import beyondTreatmentsVideo1 from '../images/clip1.mp4';
import beyondTreatmentsVideo2 from '../images/clip2.mp4';


function Home(){

    const [blogListing, setBlogListing] = useState([]);
    const [authors, setAuthors] = useState({});
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const blogs = async () => {
            const response = await fetch('http://3.8.140.227:8000/api/blog/');
            const data = await response.json();
            setBlogListing(data);
        }
        blogs();
    }, []);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await fetch(`http://3.8.140.227:8000/api/blog/`);
                const data = await response.json();

                const authorMap = {};
                data.forEach(author => {
                    authorMap[author.id] = author.name;
             });
                setAuthors(authorMap);
            } catch (error) {
                setError('Unable to fetch author data. Please try again later.');
            }
        };

        fetchAuthors();
    }, []);

    return(
        <>
        <div className="siteBanner w-100 position-relative d-flex align-items-center justify-content-center flex-column">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h1 className="text-center display-1 lh-base text-capitalize pb-5">Your One Stop Solution <br/>For All Things, Treatment</h1>
                    </Col>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <form>
                            <Row>
                                <div className="searchBox w-100 bg-white py-2 position-relative d-flex align-items-center justify-content-between">
                                    
                                        <span className="searchForTreatment">
                                            <img loding="lazy" src={searchIcon} alt="search" />
                                            <input type="text" placeholder="Search for treatment" id="Treatment" name="Treatment" autoComplete="off" />
                                        </span>

                                        <span className="selectYourCategories">
                                            <img loding="lazy" src={categoriesIcon} alt="search" />
                                            <select id="categories" name="categories">
                                                <option value="">Select Treatment Category</option>
                                                <option value="Hair">Hair</option>
                                                <option value="Barbers">Barbers</option>
                                                <option value="Nails">Nails</option>
                                                <option value="Lashes & Brows">L's & B's</option>
                                                <option value="Injectables">Injectables</option>
                                                <option value="SPMU">SPMU</option>
                                                <option value="Skincare">Skincare</option>
                                                <option value="Hair removal">Hair removal</option>
                                                <option value="Teeth">Teeth</option>
                                                <option value="Training">Training</option>
                                                <option value="Spa & Sauna">Spa & Sauna</option>
                                                <option value="Retreats">Retreats</option>
                                                <option value="Healthcare">Healthcare</option>
                                                <option value="Children">Children</option>
                                                <option value="Animals">Animals</option>
                                                <option value="MUA (Makeup Artist)">MUA (Makeup Artist)</option>
                                                <option value="Surgery">Surgery</option>
                                                <option value="Keep fit">Keep fit</option>
                                                <option value="Therapy">Therapy</option>
                                                <option value="Nutrition">Nutrition</option>
                                            </select>
                                        </span>

                                        <span className="searchByLocation">
                                            <img loding="lazy" src={mapMarkerIcon} alt="Location" />
                                            <input type="text" placeholder="Location" id="location" name="location" autoComplete="off" />
                                        </span>

                                        <span className="submitYourData">
                                            <button type="submit"><img loding="lazy" src={searchIcon} alt="search" /> <span className="searchButtonText text-white ps-2">Search</span></button>
                                        </span>
                                </div>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>

            <div className="bannerCaptionAnimate position-absolute w-100 h-auto d-flex align-items-center justify-content-center bottom-0 pt-2">
            <h2 className="display-1 marquee-text">
                <ul className="d-flex ps-0 mb-0">
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Hair</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Barbers</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Nails</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>L&#39;s & B&#39;s</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Injectables</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>SPMU</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Skincare</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Hair removal</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Teeth</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Training</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Spa &amp; Sauna</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Retreats</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Healthcare</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Children</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Animals</span>
                    </li>

                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>MUA (Makeup Artist)</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Surgery</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Keep fit</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Therapy</span>
                    </li>
                    <li>
                        <img loding="lazy" src={catDoubleCircles} alt="bannerCaptionVector" />
                        <span>Nutrition</span>
                    </li>
                </ul>
            </h2>
            </div>
        </div>


        <div className="featureProducts w-100 h-auto position-relative d-block">
            <Container fluid>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h2 className="text-center fw-normal lh-base text-capitalize">elite members</h2>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <FeatureProducts />
                    </Col>
                </Row>
            </Container>
        </div>


        {/* <div className="trendingTreatments w-100 h-auto position-relative d-block">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h2 className="text-center fw-normal lh-base">Our Trending Treatments</h2>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <TrendingCarousel />
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <aside className="text-center"><Link to="/" className="buttonStyle">Explore Treatments <img loding="lazy" src={arrowTopRight} /></Link></aside>
                    </Col>
                </Row>
            </Container>
        </div> */}
        


        <div className="productComingSoon w-100 h-auto position-relative d-block overflow-hidden">
            
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h2 className="text-center fw-normal lh-base">Our Featured Products</h2>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <img loding="lazy" src={ProductComingSoon} alt="product-coming-soon" className="img-fluid my-4 w-100" />
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <aside className="text-center"><Link to="/contact-us" className="buttonStyle text-capitalize">coming soon <img loding="lazy" src={arrowTopRight} /></Link></aside>
                    </Col>
                </Row>
            
        </div>

        {/* <div className="whyJoinBusiness w-100 h-auto position-relative d-block">
            <Container>
                <Row>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <img loding="lazy" src={whyJoinAsBusiness} className="w-100" />
                    </Col>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <h3>Why Join as a Business?</h3>
                        <strong>Joining our beauty platform expands your visibility, connecting you directly with your ideal clientele.
                        <br/>Key benefits include:</strong>

                        <ul className="mb-0">
                            <li>Enhanced exposure, putting your business in the spotlight.</li>
                            <li>SEO boost, improving your online searchability.</li>
                            <li>Direct connection with prospective customers, making your services more accessible.</li>
                            <li>Comprehensive profiles, showcasing your reviews and a portfolio of your work, ensuring people searching for your services can fully appreciate your expertise.</li>
                        </ul>
                        <hr/>
                        <aside><Link to="/" className="buttonStyle">Register your business <img loding="lazy" src={arrowTopRight} /></Link></aside>
                    </Col>
                </Row>
            </Container>
        </div> */}


        {/* <div className="whyJoinAsCustomer w-100 h-auto position-relative d-block">
            <Container>
                <Row>
                    <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12}>
                        <h3>Why Join as a Customer?</h3>
                        <strong>Joining our beauty directory unlocks a world of benefits for you, making it easier to find the perfect beauty services. Here's why you should sign up:</strong>

                        <ul className="mb-0">
                            <li>Wide Selection: Access a diverse array of beauty services and providers in one place.</li>
                            <li>Tailored Matches: Discover services that align perfectly with your needs and preferences.</li>
                            <li>Informed Decisions: View detailed provider profiles, including customer reviews and work galleries, to choose with confidence.</li>
                            <li>Comprehensive profiles, showcasing your reviews and a portfolio of your work, ensuring people searching for your services can fully appreciate your expertise.</li>
                            <li>Exclusive Offers: Gain access to special promotions and discounts available only to our directory members.</li>
                        </ul>
                        <hr/>
                        <aside><Link to="/" className="buttonStyle">Join us today!</Link></aside>
                    </Col>
                </Row>
            </Container>
        </div> */}

        <div className="beyond-the-treatment-section w-100 h-auto position-relative d-block bg-white">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h3 className="text-center fw-normal lh-base">Beyond the Treatment</h3>
                    </Col>

                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                        <h5 className='text-black text-capitalize mb-3 mt-3'>clip 01</h5>
                        <video className='w-100' src={beyondTreatmentsVideo1} playsInline loop muted controls={true}>
                            <source src={beyondTreatmentsVideo1} type='video/mp4' />
                        </video>
                    </Col>

                    <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
                        <h5 className='text-black text-capitalize mb-3 mt-3'>clip 02</h5>
                        <video className='w-100' src={beyondTreatmentsVideo2} playsInline loop muted controls={true}>
                            <source src={beyondTreatmentsVideo2} type='video/mp4' />
                        </video>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <aside className="text-center"><Link to="/beyond-the-treatments" className="buttonStyle text-capitalize">View More <img loding="lazy" src={arrowTopRight} onClick={() => window.scrollTo(0, 0)} /></Link></aside>
                    </Col>
                </Row>
            </Container>
        </div>

        <div className="blog-and-news w-100 h-auto position-relative d-block">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h3>Blog and News <strong>Latest news on Check a Treatment</strong></h3>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Row>
                            <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                                <div className="blogCard">
                                    <figure className="mb-0">
                                        {blogListing[0] && (
                                            <img loding="lazy" src={`http://3.8.140.227:8000${blogListing[0].image}`} alt="" title="" />
                                        )}
                                    </figure>
                                    {blogListing[0] && (
                                        <>
                                            <h5 className="mb-0">{blogListing[0].title.split(' ').slice(0, 4).join(' ') + '...'}</h5>
                                            <h6 className="mb-0">By - {blogListing[0].user.name}</h6>
                                            <aside>
                                                <Link to={`/blog/${blogListing[0].slug}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}><img loding="lazy" src={linkIcon} alt="" title="" /> read more</Link>
                                            </aside>
                                        </>
                                    )}
                                </div>
                            </Col>

                            <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                                <div className="blogCard">
                                    <figure className="mb-0">
                                        {blogListing[1] && (
                                            <img loding="lazy" src={`http://3.8.140.227:8000${blogListing[1].image}`} alt="" title="" />
                                        )}
                                    </figure>
                                    {blogListing[1] && (
                                        <>
                                            <h5 className="mb-0">{blogListing[1].title.split(' ').slice(0, 4).join(' ') + '...'}</h5>
                                            <h6 className="mb-0">By - {blogListing[1].user.name}</h6>
                                            <aside><Link to={`/blog/${blogListing[1].slug}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}><img loding="lazy" src={linkIcon} alt="" title="" /> read more</Link></aside>
                                        </>
                                    )}
                                </div>
                            </Col>

                            <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                                <div className="blogCard">
                                    <figure className="mb-0">
                                        {blogListing[2] && (
                                            <img loding="lazy" src={`http://3.8.140.227:8000${blogListing[2].image}`} alt="" title="" />
                                        )}
                                    </figure>
                                    {blogListing[2] && (
                                        <>
                                            <h5 className="mb-0">{blogListing[2].title.split(' ').slice(0, 4).join(' ') + '...'}</h5>
                                            <h6 className="mb-0">By - {blogListing[2].user.name}</h6>
                                            <aside><Link to={`/blog/${blogListing[2].slug}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}><img loding="lazy" src={linkIcon} alt="" title="" /> read more</Link></aside>
                                        </>
                                    )}
                                </div>
                            </Col>

                            <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
                                <div className="blogCard">
                                    <figure className="mb-0">
                                        {blogListing[3] && (
                                            <img loding="lazy" src={`http://3.8.140.227:8000${blogListing[3].image}`} alt="" title="" />
                                        )}
                                    </figure>
                                    {blogListing[3] && (
                                        <>
                                            <h5 className="mb-0">{blogListing[3].title.split(' ').slice(0, 4).join(' ') + '...'}</h5>
                                            <h6 className="mb-0">By - {blogListing[3].user.name}</h6>
                                            <aside><Link to={`/blog/${blogListing[3].slug}`} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}><img loding="lazy" src={linkIcon} alt="" title="" /> read more</Link></aside>
                                        </>
                                    )}
                                </div>
                            </Col>
                        </Row>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <aside className="w-100 h-auto text-center mt-4">
                            <Link to="/blogs" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="buttonStyle">Show more <img loding="lazy" src={eyeIcon} alt="" title="" /></Link>
                        </aside>
                    </Col>
                </Row>
            </Container>
        </div>


        <div className="wantOseeMore w-100 h-auto d-block position-relative">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h3>Want to See More? Browse by Treatment</h3>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <WantToSeeMoreCarousel />
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <aside className="text-center">
                            <Link to="/" className="buttonStyle text-capitalize">view all categories <img loding="lazy" src={arrowTopRight} /></Link>
                            </aside>
                    </Col>
                </Row>
            </Container>
        </div>


        <div className="filtersByCategories w-100 h-auto d-block position-relative">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h3>Filter by Cities</h3>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Row>
                            <Col xxl={7} xl={7} lg={7} md={12} sm={12} xs={12}>
                                <Row>
                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <h5>Ayrshire</h5>
                                        <ul>
                                            <li><Link to="/" className="">Hair Salons in Ayrshire</Link></li>
                                            <li><Link to="/" className="">Nail Salons in Ayrshire</Link></li>
                                            <li><Link to="/" className="">Barbershops in Ayrshire</Link></li>
                                            <li><Link to="/" className="">Beauty Salons in Ayrshire</Link></li>
                                            <li><Link to="/" className="">Spas in Ayrshire</Link></li>
                                            <li><Link to="/" className="">Massage in Ayrshire</Link></li>
                                            <li><Link to="/" className="">Waxing Salons in Ayrshire</Link></li>
                                            <li><Link to="/" className="">Eyebrows & Lashes in Ayrshire</Link></li>
                                        </ul>
                                    </Col>

                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <h5>Bedfordshire</h5>
                                        <ul>
                                            <li><Link to="/" className="">Hair Salons in Bedfordshire</Link></li>
                                            <li><Link to="/" className="">Nail Salons in Bedfordshire</Link></li>
                                            <li><Link to="/" className="">Barbershops in Bedfordshire</Link></li>
                                            <li><Link to="/" className="">Beauty Salons in Bedfordshire</Link></li>
                                            <li><Link to="/" className="">Spas in Bedfordshire</Link></li>
                                            <li><Link to="/" className="">Massage in Bedfordshire</Link></li>
                                            <li><Link to="/" className="">Waxing Salons in Bedfordshire</Link></li>
                                            <li><Link to="/" className="">Eyebrows & Lashes in Bedfordshire</Link></li>
                                        </ul>
                                    </Col>

                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
                                        <h5>Cleveland</h5>
                                        <ul>
                                            <li><Link to="/" className="">Hair Salons in Cleveland</Link></li>
                                            <li><Link to="/" className="">Nail Salons in Cleveland</Link></li>
                                            <li><Link to="/" className="">Barbershops in Cleveland</Link></li>
                                            <li><Link to="/" className="">Beauty Salons in Cleveland</Link></li>
                                            <li><Link to="/" className="">Spas in Cleveland</Link></li>
                                            <li><Link to="/" className="">Massage in Cleveland</Link></li>
                                            <li><Link to="/" className="">Waxing Salons in Cleveland</Link></li>
                                            <li><Link to="/" className="">Eyebrows & Lashes in Cleveland</Link></li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>

                            <Col xxl={5} xl={5} lg={5} md={12} sm={12} xs={12}>
                                <Row>
                                    <Col xxl={6} xl={6} lg={6} md={4} sm={12} xs={12}>
                                        <h5>East Sussex</h5>
                                        <ul>
                                            <li><Link to="/" className="">Hair Salons in East Sussex</Link></li>
                                            <li><Link to="/" className="">Nail Salons in East Sussex</Link></li>
                                            <li><Link to="/" className="">Barbershops in East Sussex</Link></li>
                                            <li><Link to="/" className="">Beauty Salons in East Sussex</Link></li>
                                            <li><Link to="/" className="">Spas in East Sussex</Link></li>
                                            <li><Link to="/" className="">Massage in East Sussex</Link></li>
                                            <li><Link to="/" className="">Waxing Salons in East Sussex</Link></li>
                                            <li><Link to="/" className="">Eyebrows & Lashes in East Sussex</Link></li>
                                        </ul>
                                    </Col>

                                    <Col xxl={6} xl={6} lg={6} md={4} sm={12} xs={12}>
                                        <h5>Kent</h5>
                                        <ul>
                                            <li><Link to="/" className="">Hair Salons in Kent</Link></li>
                                            <li><Link to="/" className="">Nail Salons in Kent</Link></li>
                                            <li><Link to="/" className="">Barbershops in Kent</Link></li>
                                            <li><Link to="/" className="">Beauty Salons in Kent</Link></li>
                                            <li><Link to="/" className="">Spas in Kent</Link></li>
                                            <li><Link to="/" className="">Massage in Kent</Link></li>
                                            <li><Link to="/" className="">Waxing Salons in Kent</Link></li>
                                            <li><Link to="/" className="">Eyebrows & Lashes in Kent</Link></li>
                                        </ul>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>

        {error && <div className="alert alert-danger" role="alert">{error}</div>}

        </>
    )
}

export default Home;