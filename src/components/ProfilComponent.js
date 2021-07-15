import React, {useEffect, useState} from "react"
import {Container, Row, Col, Image,Button} from "react-bootstrap";
import SugestijaComponent from "./SugestijaComponent";


function ProfilComponent(){
    const [x,setX]=useState({text: "nesto"})
    var nesto=[];
    for(let i=0;i<500;i++){
        nesto.push(
           <div className="red">
               <SugestijaComponent/>
           </div>
        );
    }

    return(
        <Container>
            <Row className={"mt-4 mb-4"}>
                <Col md={8} className={"pt-2 pb-2 okvir-desni"}>
                    <Row className="banner">
                        <Col md={4}>
                            <Image src="https://wallpaperaccess.com/full/2213424.jpg"
                                   thumbnail className='profilna-slika'/>
                        </Col>
                        <Col md={8}>
                            <Row>
                                <Col md={5}>
                                    <b className='inline-htag'>Ime i prezime: </b>
                                </Col>
                                <Col md={7}>
                                    <span className='font-podaci'> Filip Vlaisavljević</span>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md={5}>
                                    <b className='inline-htag'>Nickname: </b>
                                </Col>
                                <Col md={7}>
                                    <span className='font-podaci'> Exzone</span>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <span className='font-osebi'> <i>Volim gledati anime, hentai, uživam u igranju warzone</i></span>
                            </Row>
                            <br/>
                            <Row className="mb-1">
                                <Col md={6} xs={6}>
                                    <span>Prati: <b>320</b></span>
                                </Col>
                                <Col md={6} xs={6}>
                                    <span>Pratitelji: <b>420</b></span>
                                </Col>
                            </Row>
                            <Row>
                                <Button className="w-100">Uredi profil</Button>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <h1>Objave</h1>
                    </Row>
                </Col>
                <Col md={4} className="pt-2 pb-2">
                    <Row className="banner sugestije">
                        <div className="red">
                            <div className="glavni"><b>Zapratite</b></div>
                        </div>
                        {nesto}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilComponent;