import React from "react"
import {Row,Col} from "react-bootstrap";

function HomeComponent(){
    return(
        <Row className={"mt-5 mb-5"}>
            <Col sm={8}></Col>
            <Col sm={4}></Col>
        </Row>
    );
}

export default HomeComponent