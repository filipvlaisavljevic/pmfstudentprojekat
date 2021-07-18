import React, {useState} from "react"
import {Card, Row, Col, ListGroup} from "react-bootstrap";
import {
    CaretDownFill,
    HandThumbsUp,
    HandThumbsDown,
    Facebook,
    HandThumbsUpFill,
    ChatSquareText, ChatQuoteFill
} from 'react-bootstrap-icons';
import ObjaviKomentarComponent from "./ObjaviKomentarComponent";

function ObjavaComponent({objava,handler}){
    const[prikazi,setPrikazi] = useState(false);

    function postaviPrikaz(){
        setPrikazi(!prikazi);
    }
    return(
        <div className="bezpaddinga">
            <Card className={"mb-3"}>
                <Card.Img variant="top" src={objava.post.picture} className={"d-none d-lg-block"}/>
                <Card.Body className={"w-70"}>
                    <div className="blockquote mb-0">
                        <p>
                            {objava.post.text}
                        </p>
                        <footer className="blockquote-footer mt-2">
                            <a href={"/profil/"+objava.post.author_id} className={"bez-dekoracije"}>{objava.post.first_name} {objava.post.last_name}</a>
                        </footer>

                        <Card.Text> <ChatSquareText onClick={() => postaviPrikaz()}
                                                    className={"pokazivac"}/> <small>{objava.comments.length}</small> <HandThumbsUpFill className={"palac"}/> <small>{objava.post.likes} oznaka sviđa mi se</small>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>

            {prikazi ?
                <div id={objava.id}>
                    {objava.comments.map((komentar) => (
                        <Card className={"mt-1"}>
                            <Card.Header className={"w-30"}>
                                <a href={"/profil/"+komentar.author_id} className={"bez-dekoracije2"}>{komentar.first_name} {komentar.last_name}</a>
                            </Card.Header>
                            <ListGroup variant="flush" className={"w-70"}>
                                <ListGroup.Item><ChatQuoteFill/> {komentar.text}</ListGroup.Item>
                            </ListGroup>
                        </Card>
                    ))}

                    <ObjaviKomentarComponent objava={objava.post} handler={() => handler()}/>
                </div> :
                <div></div>}
        </div>
    )
}

export default ObjavaComponent