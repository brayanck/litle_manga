import React from "react";
import { Slideshow, Slide } from "../../hooks/carrusel";
import img1 from "../../assets/banners/Banner 1.png";
import img2 from "../../assets/banners/BANNER 2 .png";
import img3 from "../../assets//banners/Banner 3.png";
import "./carusel.css";
const App = () => {
  return (
    <div className="carrusel2">
      <Slideshow autoplay={true} velocidad="500" intervalo="5000" controles={true}>
        <Slide>
          <img src={img1} alt="baner1" />
        </Slide>
        <Slide>
          <img src={img2} alt="baner2" />
        </Slide>
        <Slide>
          <img src={img3} alt="baner3" />
        </Slide>
      </Slideshow>
    </div>
  );
};
export default App;
