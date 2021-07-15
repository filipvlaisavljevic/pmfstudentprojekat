import React from "react"
import {Row,Col,Container} from "react-bootstrap";
import { CaretDownFill } from 'react-bootstrap-icons';
import ObjavaComponent from "./ObjavaComponent";
import SugestijaComponent from "./SugestijaComponent";

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
                <Row className={"mb-3 equal"}>
                    <Col sm={8} className={"bezpaddinga"}>
                        <ObjavaComponent/>
                    </Col>
                    <Col sm={4}>
                            <Row>
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
        </div>
    );
}

export default HomeComponent