import React from "react"
import {Card, Row} from "react-bootstrap";
import {checkText} from "smile2emoji";
import {decode} from "html-entities";

function PorukaNeotvorenaComponent({podaci,korisnik,prikazime,prikazprezime,prikazslika}){
    let datum=new Date(podaci.datetime)
    return(
        <div>
            <Card className={"mb-3"}>
                <Card.Img variant="top" src={prikazslika} className={"d-none d-lg-block slikica"}
                />
                <Card.Body className={"w-70"}>
                    <Card.Text className={"follow"}>
                        <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>{
                                (!podaci.seen && podaci.sender_id != korisnik.id) ?
                                    <b className={"datum"}>{datum.getDate()}.{datum.getMonth()}.{datum.getFullYear()} {datum.getHours()}:{(datum.getMinutes() < 10 ? '0' : '')+datum.getMinutes()}</b>:
                                    <span className={"datum"}>{datum.getDate()}.{datum.getMonth()}.{datum.getFullYear()} {datum.getHours()}:{(datum.getMinutes() < 10 ? '0' : '')+datum.getMinutes()}</span>

                            }</span>
                        </Row>
                        <Row>
                            <span className={"ml-1 mt-1"}>{
                                (!podaci.seen && podaci.sender_id != korisnik.id) ?
                                    <b>{prikazime} {prikazprezime}</b>:
                                    <span>{prikazime} {prikazprezime}</span>

                            }</span>
                        </Row>
                        <Row className={"nick-recommended"}>
                            <span className={"ml-1"}>
                                {(!podaci.seen && podaci.sender_id != korisnik.id)?
                                    <b>{podaci.sender_id == korisnik.id ?  <span>You: {checkText(decode(podaci.text))}</span> : <span>{podaci.sender_first_name}: {checkText(decode(podaci.text))}</span>}</b>:
                                    podaci.sender_id == korisnik.id ? <span>You: {checkText(decode(podaci.text))}</span> :
                                        <span>{podaci.sender_first_name}: {checkText(decode(podaci.text))}</span>
                                }
                            </span>
                        </Row>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default PorukaNeotvorenaComponent