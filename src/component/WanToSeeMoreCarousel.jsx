import React from "react";
import Slider from "react-slick";
import animals from"../images/animals.svg";
import children from"../images/children.svg";
import facials from"../images/facials.svg";
import wellness from"../images/wellness.svg";
import tanning from"../images/tanning.svg";
import training from"../images/training.svg";
import teeth from"../images/teeth.svg";


export default function WantToSeeMoreCarousel() {
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
      <Slider {...settings}>
        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={facials} alt="Facials" /></figure>
                <h4>Facials</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={wellness} alt="Wellness" /></figure>
                <h4>Wellness</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={training} alt="Training" /></figure>
                <h4>Training</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={teeth} alt="Teeth" /></figure>
                <h4>Teeth</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={tanning} alt="Tanning" /></figure>
                <h4>Tanning</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={animals} alt="Animals" /></figure>
                <h4>Animals</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={children} alt="Children" /></figure>
                <h4>Children</h4>
            </div>
        </div>
      </Slider>
    );
  }