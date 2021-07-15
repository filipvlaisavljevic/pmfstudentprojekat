import React from "react"
import {Container, Row,Col} from "react-bootstrap";


function ProfilComponent(){
    return(
        <Container>
            <Row className={"mt-4 mb-4"}>
                <Col sm={8} className={"banner pt-2 pb-2 okvir-desni"}>
                    <h1>Kurac</h1>
                </Col>
                <Col sm={4} className={"banner pt-2 pb-2"}>
                    <h2>Kurac</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default ProfilComponent;