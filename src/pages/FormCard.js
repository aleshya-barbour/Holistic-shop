
import React, { useState } from "react";
import props from 'prop-types';
import { animated, useSpring } from '@react-spring/web'
import { Row, Form, Card, Col } from "react-bootstrap";
import FormElement from "./FormElement";

const FormCard = (props) => {

  const [hovered, setHovered] = useState(false);
  
  const hovering = useSpring({
    transform : hovered
    ? "translate3d(0px,0,0) scale(1.05) rotateX(0deg)" 
    : "translate3d(0px,0,0) scale(1) rotateX(0deg)", 
  })
  return (
    
    <div>
      <animated.div
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        style={hovering}
      >
      <Row>
        <Card as={Col} sm={12} className="rounded infoCard">
          <h1 className="text-center mt-4">{props.title}</h1>
          <Form onSubmit={props.handleSubmit} className="p-4">
            <Form.Row>
              {props.formDetails.map((field) => (
                <FormElement
                  key={field.controlId}
                  controlId={field.controlId}
                  smallColSize={field.smallColSize}
                  formLabel={field.formLabel}
                  placeholder={field.formLabel}
                  name={field.name}
                  handleChange={props.handleChange}
                  value={field.value}
                  />
              ))}
            </Form.Row>
          </Form>
        </Card>
      </Row>
    </animated.div>
    </div>
  )
}

export default FormCard