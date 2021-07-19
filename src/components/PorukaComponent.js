import React from "react"
import {Card, Row} from "react-bootstrap";
import {checkText} from "smile2emoji";
import {decode} from "html-entities";

function PorukaComponent({poruka}){
    return(
        <div>
            <Card className={"mb-3"}>
                <Card.Img variant="top" src={poruka.sender_picture} className={"d-none d-lg-block slikica"}
                />
                <Card.Body className={"w-70"}>
                    <Card.Text className={"follow"}>
                        <Row className={"nick-recommended"}>
                            <span className={"datum"}>{poruka.datetime}</span>
                        </Row>
                        <Row>
                            <span>{poruka.sender_first_name} {poruka.sender_last_name}</span>
                        </Row>
                        <Row className={"nick-recommended"}>
                                <span>{checkText(decode(poruka.text))}</span>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PorukaComponent