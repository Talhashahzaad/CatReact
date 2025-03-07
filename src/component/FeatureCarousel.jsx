import React from "react";
import Slider from "react-slick";
import starRating from"../images/starRating.svg";
import featureProduct01 from"../images/featureProduct01.png";
import featureProduct02 from"../images/featureProduct02.png";
import featureProduct03 from"../images/featureProduct03.png";
import featureProduct04 from"../images/featureProduct04.png";
import cartIcon from"../images/cartIcon.svg";
import { Link } from "react-router-dom";

export default function FeatureCarousel() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    className: "feature-slider",
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
      <div className="feature-carousel-item">
        <div className="feature-carousel-card">
          <figure><img src={featureProduct01} alt="spa" /></figure>
          <h3>Pastel beige cosmetic cream</h3>
          <span className="rating-and-reviews d-flex align-items-center py-2">
            <span className="rating">4.7</span>
            <span className="rating-star"><img src={starRating} alt="star" /></span>
            <span className="reviews">521 reviews</span>
          </span>
          <div className="productPrice">
            <span className="price"><strong className="currencyIcon">&pound;</strong> <span className="priceValue">99.79</span></span>
          </div>
          <aside className="priceCart">
            <Link to="/" className="cartbuttonStyle d-flex align-items-center">
              <span className="priceCartIcon"><img src={cartIcon} alt="cart" className="mb-0 me-1" /></span>
              <span className="priceCartText">Add to Cart</span>
            </Link>
          </aside>
        </div>
      </div>

      
      <div className="feature-carousel-item">
        <div className="feature-carousel-card">
          <figure><img src={featureProduct02} alt="spa" /></figure>
          <h3>Lip glow stick</h3>
          <span className="rating-and-reviews d-flex align-items-center py-2">
            <span className="rating">4.4</span>
            <span className="rating-star"><img src={starRating} alt="star" /></span>
            <span className="reviews">229 reviews</span>
          </span>
          <div className="productPrice">
            <span className="price"><strong className="currencyIcon">&pound;</strong> <span className="priceValue">15.50</span></span>
          </div>
          <aside className="priceCart">
            <Link to="/" className="cartbuttonStyle d-flex align-items-center">
              <span className="priceCartIcon"><img src={cartIcon} alt="cart" className="mb-0 me-1" /></span>
              <span className="priceCartText">Add to Cart</span>
            </Link>
          </aside>
        </div>
      </div>

      <div className="feature-carousel-item">
        <div className="feature-carousel-card">
          <figure><img src={featureProduct03} alt="spa" /></figure>
          <h3>Plant based matte lipstick</h3>
          <span className="rating-and-reviews d-flex align-items-center py-2">
            <span className="rating">4.6</span>
            <span className="rating-star"><img src={starRating} alt="star" /></span>
            <span className="reviews">151 reviews</span>
          </span>
          <div className="productPrice">
            <span className="price"><strong className="currencyIcon">&pound;</strong> <span className="priceValue">50.25</span></span>
          </div>
          <aside className="priceCart">
            <Link to="/" className="cartbuttonStyle d-flex align-items-center">
              <span className="priceCartIcon"><img src={cartIcon} alt="cart" className="mb-0 me-1" /></span>
              <span className="priceCartText">Add to Cart</span>
            </Link>
          </aside>
        </div>
      </div>

      <div className="feature-carousel-item">
        <div className="feature-carousel-card">
          <figure><img src={featureProduct04} alt="spa" /></figure>
          <h3>Pastel beige cosmetic cream</h3>
          <span className="rating-and-reviews d-flex align-items-center py-2">
            <span className="rating">4.5</span>
            <span className="rating-star"><img src={starRating} alt="star" /></span>
            <span className="reviews">782 reviews</span>
          </span>
          <div className="productPrice">
            <span className="price"><strong className="currencyIcon">&pound;</strong> <span className="priceValue">85.25</span></span>
          </div>
          <aside className="priceCart">
            <Link to="/" className="cartbuttonStyle d-flex align-items-center">
              <span className="priceCartIcon"><img src={cartIcon} alt="cart" className="mb-0 me-1" /></span>
              <span className="priceCartText">Add to Cart</span>
            </Link>
          </aside>
        </div>
      </div>
    </Slider>
  );
}