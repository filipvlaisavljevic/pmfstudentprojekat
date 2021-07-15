import React from "react";
import {Col, Image, Row,Button} from "react-bootstrap";


function SugestijaComponent(){
    return(
      <Row>
          <Col xs={8}>
              <Row>
                  <Col xs={4} >
                      <Image src="https://i.imgur.com/MLKU6yM.jpg" style={{objectFit: 'cover'}}
                             width="70px" height="70px"/>
                  </Col>
                  <Col xs={8} style={{padding: 0}}>
                      <div>
                          <b>Nickname</b>
                      </div>
                      <p>Ime i prezime</p>
                  </Col>
              </Row>
          </Col>
          <Col xs={4}>
              <Button style={{marginTop: "10px"}}>Zaprati</Button>
          </Col>
      </Row>
    );
}

export default SugestijaComponent