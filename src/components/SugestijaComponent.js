import React from "react";
import {Col, Image, Row, Button, Container, Card} from "react-bootstrap";
import {HandThumbsUpFill} from "react-bootstrap-icons";
import {PersonPlusFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";


function SugestijaComponent(){
    return(
        <div>
            <Card className={"mb-3"}>
                <Card.Img variant="top" src="https://i.imgur.com/MLKU6yM.jpg" className={"d-none d-lg-block recommended-slika"}
                />
                <Card.Body>
                    <Card.Text className={"follow"}>
                        <Row>
                            <span className={"ml-1"}>Edah Siječić</span>
                        </Row>
                        <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>@Edahus69</span>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
            <Card className={"mb-3"}>
                <Card.Img variant="top" src="https://i.imgur.com/S4gTsXX.jpg" className={"d-none d-lg-block recommended-slika"}
                />
                <Card.Body>
                    <Card.Text className={"follow"}>
                        <Row>
                            <span className={"ml-1"}>Tarik Pašić</span>
                        </Row>
                        <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>@TarikPashich</span>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SugestijaComponent