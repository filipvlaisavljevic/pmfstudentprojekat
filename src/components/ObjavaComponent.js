import React from "react"
import {Card,Row,Col} from "react-bootstrap";
import {CaretDownFill, HandThumbsUp, HandThumbsDown, Facebook, HandThumbsUpFill} from 'react-bootstrap-icons';

function ObjavaComponent({objava}){
    return(
        <div className="bezpaddinga">
            <Card className={"mb-3"}>
                <Card.Img variant="top" src={objava.post.picture} className={"d-none d-lg-block"}/>
                <Card.Body>
                    <div className="blockquote mb-0">
                        <p>
                            {objava.post.text}
                        </p>
                        <footer className="blockquote-footer mt-2">
                            @{objava.post.username}
                        </footer>

                        <Card.Text>
                            <HandThumbsUpFill className={"palac"}/> <small>{objava.post.likes} oznaka sviđa mi se</small>
                        </Card.Text>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ObjavaComponent