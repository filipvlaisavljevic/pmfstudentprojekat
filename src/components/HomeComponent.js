import React from "react"
import {Row,Col,Container} from "react-bootstrap";
import { CaretDownFill } from 'react-bootstrap-icons';
import ObjavaComponent from "./ObjavaComponent";
import SugestijaComponent from "./SugestijaComponent";

function HomeComponent(){
    return(
        <div>
            <Container>
                <Row className={"mb-4"}>
                    <Col sm={8}>
                        <div className={"mt-5 banner pt-2 pb-2 mb-4"}>
                            <CaretDownFill/> Nedavne objave ostalih studenata
                        </div>
                        <ObjavaComponent/>
                    </Col>
                    <Col sm={4}>
                        <div className={"mt-5 banner pt-2 pb-2 mb-4"}>
                            <CaretDownFill/> Dodajte i nove studente
                        </div>
                            <div className="scrollbar w-100" id="style-1">
                                <div className="force-overflow">
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                    <SugestijaComponent/>
                                </div>
                            </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className={"mb-3 equal"}>
                    {/*<Col sm={8} className={"bezpaddinga"}>
                        <ObjavaComponent/>
                    </Col>*/}
                    {/*<Col sm={4}>
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
                    </Col>*/}
                </Row>
            </Container>
        </div>
    );
}

export default HomeComponent