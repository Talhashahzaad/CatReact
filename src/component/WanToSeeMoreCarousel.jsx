import React from "react";
import Slider from "react-slick";

import hairIcon from "../images/hair.svg";
import barbersIcon from "../images/Barbers.svg";
import nailsIcon from "../images/nails.svg";
import landbIcon from "../images/l&b.svg";
import injectablesIcon from "../images/Injectables.svg";
import spmuIcon from "../images/spmu.svg";
import skincareIcon from "../images/Skincare.svg";
import hairRemovalIcon from "../images/hairRemoval.svg";
import teethIcon from"../images/teeth.svg";
import tanningIcon from"../images/tanning.svg";
import spaIcon from"../images/spa.svg";
import retreatsIcon from"../images/Retreats.svg";
import healthcareIcon from"../images/Healthcare.svg";
import childrenIcon from"../images/children.svg";
import animalsIcon from"../images/animals.svg";
import makeupArtistIcon from"../images/makeupArtistIcon.svg";
import surgeryIcon from"../images/surgeryIcon.svg";
import keepFitIcon from"../images/keepFitIcon.svg";
import therapyIcon from"../images/therapyIcon.svg";
import nutritionIcon from"../images/nutritionIcon.svg";

// import facials from"../images/facials.svg";
// import wellness from"../images/wellness.svg";
// import training from"../images/training.svg";



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
                <figure><img src={hairIcon} alt="Hair" /></figure>
                <h4>Hair</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={barbersIcon} alt="Barbers" /></figure>
                <h4>Barbers</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={nailsIcon} alt="Nails" /></figure>
                <h4>Nails</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={landbIcon} alt="Lashes and Brows" /></figure>
                <h4>L&#39;s &amp; B&#39;s</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={injectablesIcon} alt="Injectables" /></figure>
                <h4>Injectables</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={spmuIcon} alt="SPMU" /></figure>
                <h4>SPMU</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={skincareIcon} alt="Skincare" /></figure>
                <h4>Skincare</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={hairRemovalIcon} alt="Hair removal" /></figure>
                <h4>Hair removal</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={teethIcon} alt="Teeth" /></figure>
                <h4>Teeth</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={tanningIcon} alt="Training" /></figure>
                <h4>Training</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={spaIcon} alt="Spa &amp; Sauna" /></figure>
                <h4>Spa &amp; Sauna</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={retreatsIcon} alt="Retreats" /></figure>
                <h4>Retreats</h4>
            </div>
        </div>
        
        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={healthcareIcon} alt="Healthcare" /></figure>
                <h4>Healthcare</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={childrenIcon} alt="Children" /></figure>
                <h4>Children</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={animalsIcon} alt="Animals" /></figure>
                <h4>Animals</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={makeupArtistIcon} alt="MUA (Makeup Artist)" /></figure>
                <h4>MUA (Makeup Artist)</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={surgeryIcon} alt="Surgery" /></figure>
                <h4>Surgery</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={keepFitIcon} alt="Keep fit" /></figure>
                <h4>Keep fit</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={therapyIcon} alt="Therapy" /></figure>
                <h4>Therapy</h4>
            </div>
        </div>

        <div className="want-to-see-more-item">
            <div className="want-to-see-more-card">
                <figure><img src={nutritionIcon} alt="Nutrition" /></figure>
                <h4>Nutrition</h4>
            </div>
        </div>
      </Slider>
    );
  }