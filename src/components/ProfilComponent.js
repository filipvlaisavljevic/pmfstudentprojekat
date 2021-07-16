import React, {useEffect, useState} from "react"
import {Container, Row, Col, Image, Button, Card,ListGroup} from "react-bootstrap";
import SugestijaComponent from "./SugestijaComponent";
import ObjavaComponent from "./ObjavaComponent";
import {Link} from "react-router-dom";
import {CaretDownFill, HandThumbsUpFill} from "react-bootstrap-icons";
import {PencilSquare} from "react-bootstrap-icons";
import FullObjavaComponent from "./FullObjavaComponent";


function ProfilComponent(){
    return(
        <div>
            <Container>
                <Row className={"mb-4"}>

                    <Col sm={8}>
                        <div className="mt-5 banner mb-4">
                            <Row>
                                <Col md="auto">
                                    <Image src="https://i.imgur.com/FW4FhbQ.png"
                                           className='profilna-slika d-none d-lg-block' fluid/>
                                </Col>
                                <Col md="auto" className={"mt-1"}>
                                    <Row>
                                        <Col>
                                            <span className='font-podaci'><b>Filip Vlaisavljević</b></span>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <span className='font-nick'>@Exzone</span>
                                        </Col>
                                    </Row>
                                    <Row className="mb-1 mt-1">
                                        <Col md="auto">
                                            <span>Prati: <b><a href={"#"} className={"followeri"}>320</a></b></span>
                                        </Col>
                                        <Col md="auto">
                                            <span>Pratitelji: <b><a href={"#"} className={"followeri"}>420</a></b></span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </div>

                        <FullObjavaComponent/>
                        <FullObjavaComponent/>

                    </Col>

                    <Col sm={4}>
                        <div className={"mt-5 banner pt-2 pb-2 mb-4"}>
                            <CaretDownFill/> Dodajte i nove studente
                        </div>
                            <div className="scrollbar w-100" id="style-1">
                                <div className="force-overflow">
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                </div>
                            </div>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}

export default ProfilComponent;