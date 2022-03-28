import React from "react";
import '../css/hero.css'


const Hero = () => {
  return (
    <div className="hero" >
      <div className="hero1">
        <h1>We Put The Whole in Holistic.</h1>
      </div>
      < div className="picture">
        <img className="pic" src={require('../assets/health_logo.png')} alt='logo' />
      </div>
    </div>
  )
}

export default Hero