import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import axios from "axios";
import { $siteURL } from "../common/SiteURL";

export default function WantToSeeMoreCarousel() {
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
      slidesToShow: 6,
      slidesToScroll: 1,
      className: "want-to-see-more-slider",
      autoplay: true,
      autoplaySpeed: 1500,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
        <>
            <Slider {...settings}>
                {featureListing.map((item) => (
                <div className="want-to-see-more-item" key={item.id}>
                    <div className="want-to-see-more-card">
                        <figure><img src={`${$siteURL}${item.image_icon}`} alt={item.name} /></figure>
                        <h4>{item.name}</h4>
                    </div>
                </div>
                ))}
            </Slider>
        </>
    );
  }