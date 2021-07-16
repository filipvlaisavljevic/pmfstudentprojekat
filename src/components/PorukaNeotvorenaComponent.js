import React from "react"
import {Card, Row} from "react-bootstrap";

function PorukaNeotvorenaComponent(){
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
                            <span className={"ml-1"}>Brate, evo ne znam stvarno kako mi nije prošao kod koji sam napravio. Šta se dešava? Ako
                                budemo probali ovo raditi na onaj drugi način desit će se za promjenu neka nova code react pro...</span>
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
                            <span className={"ml-1"}>Njemačka se suočava s velikom prirodnom
                                katastrofom koju su uzrokovale velike padavine i poplava. Broj
                                smrtno stradalih je viši od 100, ali se strahuje da će još rasti.</span>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PorukaNeotvorenaComponent