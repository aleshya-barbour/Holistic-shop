import React from "react";
import { Button, Container } from "react-bootstrap";
import '../css/hero.css'


const Hero = () => {
  return (
    <Container fluid>
    <div className="hero" >
      <div className="hero1">
        <h1>We Put The Whole in Holistic.</h1>
      </div>
   
        <a href="#products">
          <Button>
             Shop Now
          </Button>
        </a>
   
    </div>

    </Container>
  )
}

export default Hero