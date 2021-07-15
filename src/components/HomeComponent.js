import React from "react"
import {Row,Col,Container} from "react-bootstrap";
import { CaretDownFill } from 'react-bootstrap-icons';
import ObjavaComponent from "./ObjavaComponent";

function HomeComponent(){
    return(
        <div>
            <Container>
                <Row className={"mt-5 mb-4"}>
                    <Col sm={8} className={"banner pt-2 pb-2 okvir-desni"}>
                        <CaretDownFill/> Nedavne objave ostalih studenata
                    </Col>
                    <Col sm={4} className={"banner pt-2 pb-2"}>
                        <CaretDownFill/> Dodajte i nove studente
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className={"mb-3"}>
                    <Col sm={8} className={"bezpaddinga"}>
                        <ObjavaComponent/>
                    </Col>
                    <Col sm={4}>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default HomeComponent