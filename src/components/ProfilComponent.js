import React, {useEffect, useState} from "react"
import {Container, Row, Col, Image,Button} from "react-bootstrap";
import SugestijaComponent from "./SugestijaComponent";
import ObjavaComponent from "./ObjavaComponent";
import {Link} from "react-router-dom";


function ProfilComponent(){
    return(
        <Container>
            <Row className={"mt-4 mb-4"}>
                <Col md={8} className={"pt-2 pb-2 okvir-desni"}>
                    <Row className="banner">
                        <Col md="auto" style={{paddingLeft: 0}}>
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
                        {/*<Row>
                           <Link to="/profil/edit" className="p-0"> <Button className="w-100">Uredi profil</Button></Link>
                        </Row>*/}
                    </Row>
                    {/*<Row className="mt-4 objave-profil">
                        <ObjavaComponent/>
                    </Row>*/}
                </Col>
                <Col md={4} className="pt-2 pb-2">
                    <Row className="banner">
                        <div>
                            <div className="recommended mt-1 mb-1">Predloženi profili</div>
                        </div>
                    </Row>
                    <Row className={"banner"}>
                        <div className="scrollbar" id="style-1">
                            <div className="force-overflow">
                                <SugestijaComponent/>
                                <SugestijaComponent/>
                                <SugestijaComponent/>
                                <SugestijaComponent/>
                                <SugestijaComponent/>
                                <SugestijaComponent/>
                            </div>
                        </div>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilComponent;