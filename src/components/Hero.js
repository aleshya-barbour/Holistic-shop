import React from "react";
import { Container } from "react-bootstrap";
import '../css/hero.css'


const Hero = () => {
  return (
    <Container fluid>
    <div className="hero" >
      <div className="hero1">
        <h1>We Put The Whole in Holistic.</h1>
      </div>
      < div className="picture">
        <img className="pic" src={require('../assets/healthy_logo.png')} alt='logo' />
      </div>
    </div>
    </Container>
  )
}

export default Hero