import React from "react"
import {Row,Col,Container} from "react-bootstrap";
import { CaretDownFill } from 'react-bootstrap-icons';

function HomeComponent(){
    return(
        <Container>
            <Row className={"mt-5 mb-5"}>
                <Col sm={8} className={"banner pt-2 pb-2 okvir-desni"}>
                    <CaretDownFill/> Nedavne objave ostalih studenata
                </Col>
                <Col sm={4} className={"banner pt-2 pb-2"}>
                    <CaretDownFill/> Dodajte i nove studente
                </Col>
            </Row>
        </Container>
    );
}

export default HomeComponent