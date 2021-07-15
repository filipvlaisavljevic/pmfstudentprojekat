import React from "react"
import {Container, Row, Col, Image, Form, Button} from "react-bootstrap";


function EditProfilaComponent(){
    return(
      <Container>
          <Row className={"mt-4 mb-4"}>
              <Col sm={4}>
                  <Row><h3 className="text-center">Promjenite sliku</h3></Row>
                  <Image src="https://i.imgur.com/FW4FhbQ.png" fluid style={{objectFit: "fit"}}/>
                  <Row>
                      <Form className="mt-4 mb-4">
                          <Form.Group className="mb-3 text-center">
                              <Form.Control type="file"/>
                          </Form.Group>
                      </Form>
                  </Row>
              </Col>
              <Col sm={8}>
                  <Form>
                      <Form.Group className="mb-3">
                          <Form.Label>Ime</Form.Label>
                          <Form.Control type="text" placeholder="Promjenite ime" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Form.Label>Prezime</Form.Label>
                          <Form.Control type="text" placeholder="Promjenite prezime" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Form.Label>Nickname</Form.Label>
                          <Form.Control type="text" placeholder="Promjenite nickname" />
                      </Form.Group>
                      <Form.Group className="mb-3">
                          <Button className="w-100" type="submit">Spasi</Button>
                      </Form.Group>

                  </Form>

              </Col>
          </Row>
      </Container>
    );
}

export default EditProfilaComponent;