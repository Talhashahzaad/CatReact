import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./FeaturedSearchListing.css";
import searchIcon from "../../images/searchIcon.svg";
import categoriesIcon from "../../images/categoriesIcon.svg";
import mapMarkerIcon from "../../images/mapMarkerIcon.svg";
import axios from "axios";

const FeaturedListing = () => {
    const [categories, setCategories] = useState([]);
   
    const fetchCategories = async () => {
        try {
            const response = await axios.get("http://3.8.140.227:8000/api/category");
            setCategories(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <>
            <div className="w-100 h-auto py-5 d-block text-center text-capitalize mb-0">
                <h1 className="mb-0">Feature Product Listing</h1>
            </div>

            <Container>
                <Row className="justify-content-center productListingSearch-box">
                    <Col xxl={10} offset-xxl={1} xl={10} offset-xl={1} lg={10} offset-lg={1} md={12} sm={12} xs={12}>
                        <form>
                            <Row>
                                <div className="searchBox w-100 bg-white py-0 position-relative d-flex align-items-center justify-content-between">
                                    <span className="searchForTreatment">
                                        <img loding="lazy" src={searchIcon} alt="search" />
                                        <input type="text" placeholder="Search for treatment" id="searchForTreatment" name="searchForTreatment" required="required" />
                                    </span>

                                    <span className="selectYourCategories">
                                        <img loding="lazy" src={categoriesIcon} alt="search" />
                                        <select id="selectYourCategories" name="selectYourCategories" required="required">
                                            <option value="">Select Category</option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </span>

                                    <span className="searchByLocation">
                                        <img loding="lazy" src={mapMarkerIcon} alt="Location" />
                                        <select id="location" name="location" autoComplete="off" className="form-control">
                                            <option value="">Select Location</option>
                                            <option value="Aberdeen">Aberdeen</option>
                                            <option value="Bath">Bath</option>
                                            <option value="Belfast and Derry">Belfast and Derry</option>
                                            <option value="Birmingham">Birmingham</option>
                                            <option value="Blackburn">Blackburn</option>
                                            <option value="Blackpool">Blackpool</option>
                                            <option value="Bolton">Bolton</option>
                                            <option value="Bournemouth">Bournemouth</option>
                                            <option value="Bradford">Bradford</option>
                                            <option value="Brighton & Hove">Brighton & Hove</option>
                                            <option value="Bristol">Bristol</option>
                                            <option value="Cambridge">Cambridge</option>
                                            <option value="Cardiff">Cardiff</option>
                                            <option value="Canterbury">Canterbury</option>
                                            <option value="Carlisle">Carlisle</option>
                                            <option value="Chelmsford">Chelmsford</option>
                                            <option value="Chester">Chester</option>
                                            <option value="Coventry">Coventry</option>
                                            <option value="Chichester">Chichester</option>
                                            <option value="Colchester">Colchester</option>
                                            <option value="Coventry">Coventry</option>
                                            <option value="Derby">Derby</option>
                                            <option value="Doncaster">Doncaster</option>
                                            <option value="Durham">Durham</option>
                                            <option value="Dundee">Dundee</option>
                                            <option value="Ely">Ely</option>
                                            <option value="Edinburgh">Edinburgh</option>
                                            <option value="Exeter">Exeter</option>
                                            <option value="Glasgow">Glasgow</option>
                                            <option value="Gloucester">Gloucester</option>
                                            <option value="Hereford">Hereford</option>
                                            <option value="Kingston-upon-Hull">Kingston-upon-Hull</option>
                                            <option value="Lancaster">Lancaster</option>
                                            <option value="Londonderry">Londonderry</option>
                                            <option value="Leeds">Leeds</option>
                                            <option value="Leicester">Leicester</option>
                                            <option value="Lichfield">Lichfield</option>
                                            <option value="Lincoln">Lincoln</option>
                                            <option value="Liverpool">Liverpool</option>
                                            <option value="London">London</option>
                                            <option value="Manchester">Manchester</option>
                                            <option value="Milton Keynes">Milton Keynes</option>
                                            <option value="Newcastle-upon-Tyne">Newcastle-upon-Tyne</option>
                                            <option value="Newport">Newport</option>
                                            <option value="Norwich">Norwich</option>
                                            <option value="Nottingham">Nottingham</option>
                                            <option value="Oxford">Oxford</option>
                                            <option value="Peterborough">Peterborough</option>
                                            <option value="Plymouth">Plymouth</option>
                                            <option value="Portsmouth">Portsmouth</option>
                                            <option value="Preston">Preston</option>
                                            <option value="Ripon">Ripon</option>
                                            <option value="Salford">Salford</option>
                                            <option value="Swansea">Swansea</option>
                                            <option value="Salisbury">Salisbury</option>
                                            <option value="Sheffield">Sheffield</option>
                                            <option value="Southampton">Southampton</option>
                                            <option value="Southend-on-Sea">Southend-on-Sea</option>
                                            <option value="St Albans">St Albans</option>
                                            <option value="Swindon">Swindon</option>
                                            <option value="Stoke on Trent">Stoke on Trent</option>
                                            <option value="Sunderland">Sunderland</option>
                                            <option value="Truro">Truro</option>
                                            <option value="Wakefield">Wakefield</option>
                                            <option value="Wells">Wells</option>
                                            <option value="Westminster">Westminster</option>
                                            <option value="Winchester">Winchester</option>
                                            <option value="Wolverhampton">Wolverhampton</option>
                                            <option value="Worcester">Worcester</option>
                                            <option value="York">York</option>
                                        </select>
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

            <div className="listing-and-map-box">
                <div className="listing-box">
                    <ul className="ps-0 mb-0 d-flex flex-wrap">
                        <li>
                            <div className="search-listing-box">
                                <div className="search-listing-box-body">
                                    <div className="search-listing-box-body-item">
                                        <div className="search-listing-box-body-item-image">
                                            <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="search-listing" loading="lazy" />
                                        </div>
                                        <div className="search-listing-box-body-item-content">
                                            <h4>shop name</h4>
                                            <p className="mb-0">shop description</p>
                                            <Link to="/listing-details" className="text-decoration-underline text-capitalize mb-2 d-block small" onClick={() => {window.scrollTo(0, 0);}}>see more</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="search-listing-box">
                                <div className="search-listing-box-body">
                                    <div className="search-listing-box-body-item">
                                        <div className="search-listing-box-body-item-image">
                                            <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="search-listing" loading="lazy"    />
                                        </div>
                                        <div className="search-listing-box-body-item-content">
                                            <h4>shop name</h4>
                                            <p className="mb-0">shop description</p>
                                            <Link to="/listing-details" className="text-decoration-underline text-capitalize mb-2 d-block small" onClick={() => {window.scrollTo(0, 0);}}>see more</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="search-listing-box">
                                <div className="search-listing-box-body">
                                    <div className="search-listing-box-body-item">
                                        <div className="search-listing-box-body-item-image">
                                            <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="search-listing" loading="lazy" />
                                        </div>
                                        <div className="search-listing-box-body-item-content">
                                            <h4>shop name</h4>
                                            <p className="mb-0">shop description</p>
                                            <Link to="/listing-details" className="text-decoration-underline text-capitalize mb-2 d-block small" onClick={() => {window.scrollTo(0, 0);}}>see more</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="search-listing-box">
                                <div className="search-listing-box-body">
                                    <div className="search-listing-box-body-item">
                                        <div className="search-listing-box-body-item-image">
                                            <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="search-listing" />
                                        </div>
                                        <div className="search-listing-box-body-item-content">
                                            <h4>shop name</h4>
                                            <p className="mb-0">shop description</p>
                                            <Link to="/listing-details" className="text-decoration-underline text-capitalize mb-2 d-block small" onClick={() => {window.scrollTo(0, 0);}}>see more</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="search-listing-box">
                                <div className="search-listing-box-body">
                                    <div className="search-listing-box-body-item">
                                        <div className="search-listing-box-body-item-image">
                                            <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="search-listing" />
                                        </div>
                                        <div className="search-listing-box-body-item-content">
                                            <h4>shop name</h4>
                                            <p className="mb-0">shop description</p>
                                            <Link to="/listing-details" className="text-decoration-underline text-capitalize mb-2 d-block small" onClick={() => {window.scrollTo(0, 0);}}>see more</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="search-listing-box">
                                <div className="search-listing-box-body">
                                    <div className="search-listing-box-body-item">
                                        <div className="search-listing-box-body-item-image">
                                            <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="search-listing" />
                                        </div>
                                        <div className="search-listing-box-body-item-content">
                                            <h4>shop name</h4>
                                            <p className="mb-0">shop description</p>
                                            <Link to="/listing-details" className="text-decoration-underline text-capitalize mb-2 d-block small" onClick={() => {window.scrollTo(0, 0);}}>see more</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="search-listing-box">
                                <div className="search-listing-box-body">
                                    <div className="search-listing-box-body-item">
                                        <div className="search-listing-box-body-item-image">
                                            <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="search-listing" />
                                        </div>
                                        <div className="search-listing-box-body-item-content">
                                            <h4>shop name</h4>
                                            <p className="mb-0">shop description</p>
                                            <Link to="/listing-details" className="text-decoration-underline text-capitalize mb-2 d-block small" onClick={() => {window.scrollTo(0, 0);}}>see more</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="search-listing-box">
                                <div className="search-listing-box-body">
                                    <div className="search-listing-box-body-item">
                                        <div className="search-listing-box-body-item-image">
                                            <img src="https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY" alt="search-listing" />
                                        </div>
                                        <div className="search-listing-box-body-item-content">
                                            <h4>shop name</h4>
                                            <p className="mb-0">shop description</p>
                                            <Link to="/listing-details" className="text-decoration-underline text-capitalize mb-2 d-block small" onClick={() => {window.scrollTo(0, 0);}}>see more</Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                
                <div className="map-box">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9121.359664737483!2d-2.26609972482296!3d55.142330215826604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487d95bcc2da59a1%3A0x3d0324090bb4adc0!2sBellingham%2C%20Hexham%2C%20UK!5e0!3m2!1sen!2sin!4v1743595026595!5m2!1sen!2sin" className="w-100 h-100" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
            </div>
        </>
    )
}

export default FeaturedListing;