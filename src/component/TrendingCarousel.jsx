import React from "react";
import Slider from "react-slick";
import starRating from"../images/starRating.svg";
import trendingTreatment01 from"../images/trendingTreatment01.png";
import trendingTreatment02 from"../images/trendingTreatment02.png";
import trendingTreatment03 from"../images/trendingTreatment03.png";
import trendingTreatment04 from"../images/trendingTreatment04.png";



export default function TrendingCarousel() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    className: "trending-slider",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      <div className="trending-carousel-item">
        <div className="trending-carousel-card">
          <figure><img src={trendingTreatment01} alt="spa" /></figure>
          <h3>Pacific salon & spa</h3>
          <span className="rating-and-reviews d-flex align-items-center py-2">
            <span className="rating">4.7</span>
            <span className="rating-star"><img src={starRating} alt="star" /></span>
            <span className="reviews">259 reviews</span>
          </span>
          <p>27 Hainton Ave, Grimsby, South Humberside, UK</p>
          <span className="categoryName">hair salon</span>
        </div>
      </div>

      <div className="trending-carousel-item">
        <div className="trending-carousel-card">
          <figure><img src={trendingTreatment02} alt="spa" /></figure>
          <h3>Beauty salon</h3>
          <span className="rating-and-reviews d-flex align-items-center py-2">
            <span className="rating">4.5</span>
            <span className="rating-star"><img src={starRating} alt="star" /></span>
            <span className="reviews">271 reviews</span>
          </span>
          <p>6-8 Matilda St, Sheffield, South Yorkshir, UK</p>
          <span className="categoryName">Therapy center</span>
        </div>
      </div>

      <div className="trending-carousel-item">
        <div className="trending-carousel-card">
          <figure><img src={trendingTreatment03} alt="spa" /></figure>
          <h3>Skin & health care</h3>
          <span className="rating-and-reviews d-flex align-items-center py-2">
            <span className="rating">4.4</span>
            <span className="rating-star"><img src={starRating} alt="star" /></span>
            <span className="reviews">473 reviews</span>
          </span>
          <p>17 South St, Bo'ness, West Lothian, UK</p>
          <span className="categoryName">Beauty Salion</span>
        </div>
      </div>

      <div className="trending-carousel-item">
        <div className="trending-carousel-card">
          <figure><img src={trendingTreatment04} alt="spa" /></figure>
          <h3>Hair & care salon</h3>
          <span className="rating-and-reviews d-flex align-items-center py-2">
            <span className="rating">4.8</span>
            <span className="rating-star"><img src={starRating} alt="star" /></span>
            <span className="reviews">910 reviews</span>
          </span>
          <p>114 Hillmorton Rd, Rugby, Warwickshire, UK</p>
          <span className="categoryName">hair salon</span>
        </div>
      </div>
      
    </Slider>
  );
}