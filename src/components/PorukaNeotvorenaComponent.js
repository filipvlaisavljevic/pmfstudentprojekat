import React from "react"
import {Card, Row} from "react-bootstrap";

function PorukaNeotvorenaComponent({podaci,korisnik}){
    return(
        <div>
            <Card className={"mb-3"}>
                <Card.Img variant="top" src={podaci.sender_picture} className={"d-none d-lg-block slikica"}
                />
                <Card.Body className={"w-70"}>
                    <Card.Text className={"follow"}>
                        <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>{
                                (podaci.seen && podaci.sender_id != korisnik.id) ? <span className={"datum"}>{podaci.datetime}</span>
                                    : <b className={"datum"}>{podaci.datetime}</b>
                            }</span>
                        </Row>
                        <Row>
                            <span className={"ml-1 mt-1"}>{
                                (podaci.seen && podaci.sender_id != korisnik.id) ? <span>{podaci.sender_first_name} {podaci.sender_last_name}</span> :
                                    <b>{podaci.sender_first_name} {podaci.sender_last_name}</b>
                            }</span>
                        </Row>
                        <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>
                                {(podaci.seen && podaci.sender_id != korisnik.id)?
                                    podaci.sender_id == korisnik.id ? <span>You: {podaci.text}</span> : <span>{podaci.sender_first_name}: {podaci.text}</span> :
                                <b>{podaci.sender_id == korisnik.id ?  <span>You: {podaci.text}</span> : <span>{podaci.sender_first_name}: {podaci.text}</span>}</b>}
                            </span>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PorukaNeotvorenaComponent