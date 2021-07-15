import React from "react";
import {Col, Image, Row,Button} from "react-bootstrap";


function SugestijaComponent(){
    return(
      <Row>
          <Col>
              <Row>
                  <Col xs={5} >
                      <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLqfekg_kitC_QJ5kgBUTh2tt5EIcxEnQDQ&usqp=CAU"
                             width="70px" height="70px"/>
                  </Col>
                  <Col xs={7}>
                      <div>
                          <b>Nickname</b>
                      </div>
                      <p>Ime i prezime</p>
                  </Col>
              </Row>
          </Col>
          <Col style={{textAlign: "center"}}>
              <Button>Zaprati</Button>
          </Col>
      </Row>
    );
}

export default SugestijaComponent