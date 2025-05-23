import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import arrowTopRight from"../images/arrowTopRight.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { $siteURL } from "../common/SiteURL";

export default function FeatureCarousel() {
  const [featureListing, setFeatureListing] = useState([]);
  const [error, setError] = useState(null);

    const fetchFeatureListing = async () => {
    const response = await axios.get(`${$siteURL}/api/category`);
    setFeatureListing(response.data);
  }

  useEffect(() => {
    fetchFeatureListing();
  }, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    className: "feature-products-slider",
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 540,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <>
    <Slider {...settings}>
      {Array.isArray(featureListing) && featureListing.map ((item, index) => (
      <div className="feature-products-carousel-item" key={index}>
        <div className="feature-products-carousel-card position-relative">
                
            <figure className="mb-0 position-absolute"><img src={`${$siteURL}${item.background_image}`} alt={item.name} loading="lazy" /></figure>
            <h3>{item.name}</h3>
            <article>
            <p>{item.description}</p>
            {/* <aside className="priceCart">
              <Link to="/service-categories" className="cartbuttonStyle d-flex align-items-center">
                <span className="button_text text-capitalize">learn more</span>
                <span className="button_icon"><img src={arrowTopRight} alt="Learn More" className="mb-0 me-1" /></span>
              </Link>
            </aside> */}
          </article>
        </div>
      </div>
      ))}
    </Slider>
    </>
  );
}