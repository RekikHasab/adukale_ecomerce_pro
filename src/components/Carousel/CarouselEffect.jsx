import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { img } from './img/data';
import classes from './Carousel.module.css';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {
          img.map((imageItemLink, index) => (
            <img key={index} src={imageItemLink} alt={`Carousel Image ${index}`} />
          ))
        }
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
}

export default CarouselEffect;
