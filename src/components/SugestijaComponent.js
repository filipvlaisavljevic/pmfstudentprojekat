import React, {useEffect} from "react";
import {Col, Image, Row, Button, Container, Card} from "react-bootstrap";
import {HandThumbsUpFill} from "react-bootstrap-icons";
import {PersonPlusFill} from "react-bootstrap-icons";
import {Link} from "react-router-dom";


function SugestijaComponent({predlozen}){

    return(
        <div>
            <Card className={"mb-3"}>
                <Card.Img variant="top" src={predlozen.picture} className={"d-none d-lg-block recommended-slika"}
                />
                <Card.Body>
                    <Card.Text className={"follow"}>
                        <Row>
                            <span className={"ml-1"}>{predlozen.username}</span>
                        </Row>
                        <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>@{predlozen.username}</span>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default SugestijaComponent