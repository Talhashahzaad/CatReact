import React from "react";
import Slider from "react-slick";
import featureProduct01 from"../images/featureProduct01.png";
import arrowTopRight from"../images/arrowTopRight.svg";
import asthetics from"../images/asthetics.png";
import hair from"../images/hair.png";
import lashes from"../images/lashes.png";
import eyebrows from"../images/eyebrows.png";
import nails from"../images/nails.png";
import { Link } from "react-router-dom";

export default function FeatureCarousel() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    className: "feature-products-slider",
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
      <div className="feature-products-carousel-item">
        <div className="feature-products-carousel-card position-relative">
          <figure className="mb-0 position-absolute"><img src={asthetics} alt="spa" /></figure>
          <h3>Asthetics</h3>
          <article>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <aside className="priceCart">
              <Link to="#" className="cartbuttonStyle d-flex align-items-center">
                <span className="button_text text-capitalize">learn more</span>
                <span className="button_icon"><img src={arrowTopRight} alt="Learn More" className="mb-0 me-1" /></span>
              </Link>
            </aside>
          </article>
        </div>
      </div>

      <div className="feature-products-carousel-item">
        <div className="feature-products-carousel-card position-relative">
          <figure className="mb-0 position-absolute"><img src={hair} alt="spa" /></figure>
          <h3>Hair</h3>
          <article>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <aside className="priceCart">
              <Link to="#" className="cartbuttonStyle d-flex align-items-center">
                <span className="button_text text-capitalize">learn more</span>
                <span className="button_icon"><img src={arrowTopRight} alt="Learn More" className="mb-0 me-1" /></span>
              </Link>
            </aside>
          </article>
        </div>
      </div>

      <div className="feature-products-carousel-item">
        <div className="feature-products-carousel-card position-relative">
          <figure className="mb-0 position-absolute"><img src={lashes} alt="spa" /></figure>
          <h3>Lashes</h3>
          <article>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <aside className="priceCart">
              <Link to="#" className="cartbuttonStyle d-flex align-items-center">
                <span className="button_text text-capitalize">learn more</span>
                <span className="button_icon"><img src={arrowTopRight} alt="Learn More" className="mb-0 me-1" /></span>
              </Link>
            </aside>
          </article>
        </div>
      </div>

      <div className="feature-products-carousel-item">
        <div className="feature-products-carousel-card position-relative">
          <figure className="mb-0 position-absolute"><img src={eyebrows} alt="spa" /></figure>
          <h3>Eyebrows</h3>
          <article>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
            <aside className="priceCart">
              <Link to="#" className="cartbuttonStyle d-flex align-items-center">
                <span className="button_text text-capitalize">learn more</span>
                <span className="button_icon"><img src={arrowTopRight} alt="Learn More" className="mb-0 me-1" /></span>
              </Link>
            </aside>
          </article>
        </div>
      </div>

      <div className="feature-products-carousel-item">
        <div className="feature-products-carousel-card position-relative">
          <figure className="mb-0 position-absolute"><img src={nails} alt="spa" /></figure>
          <h3>Nails</h3>
          <article>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. </p>
            <aside className="priceCart">
              <Link to="#" className="cartbuttonStyle d-flex align-items-center">
                <span className="button_text text-capitalize">learn more</span>
                <span className="button_icon"><img src={arrowTopRight} alt="Learn More" className="mb-0 me-1" /></span>
              </Link>
            </aside>
          </article>
        </div>
      </div>
    </Slider>
  );
}