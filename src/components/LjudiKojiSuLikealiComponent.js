import React from "react";
import {Card, Row} from "react-bootstrap";
import {PersonPlusFill} from "react-bootstrap-icons";

function LjudiKojiSuLikealiComponent({ime,prezime,slika,username}){
    return(
        <div>
            <Card className={"mb-3"}>
                <Card.Img variant="top" src={slika} className={"d-none d-lg-block recommended-slika"}
                />
                <Card.Body>
                    <Card.Text className={"follow"}>
                        <Row>
                            <div className={"ml-1"}>
                                <span className={"text2"}>  {ime} {prezime}</span>
                            </div>
                        </Row>
                        <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>
                                <a>@{username}</a>
                            </span>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );

}

export default LjudiKojiSuLikealiComponent;