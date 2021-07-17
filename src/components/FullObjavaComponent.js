import React, {useEffect, useState} from "react"
import {Card,ListGroup} from "react-bootstrap";
import {
    ChatDots,
    ChatQuoteFill,
    ChatRightText,
    ChatSquareText,
    HandThumbsUpFill,
    Hash,
    Messenger
} from "react-bootstrap-icons";
import ObjaviPostComponent from "./ObjaviPostComponent";
import ObjaviKomentarComponent from "./ObjaviKomentarComponent";

function FullObjavaComponent({objava}){

    const[prikazi,setPrikazi] = useState(false);

    function postaviPrikaz(){
        setPrikazi(!prikazi);
    }
    console.log()

    return(
      <div>
          <Card className={"mb-3"}>
              {/*<Card.Img variant="top" src="https://i.imgur.com/FW4FhbQ.png" className={"d-none d-lg-block"}/>*/}
              <Card.Body>
                  <blockquote className="blockquote mb-0">
                      <p>
                          {' '}
                          {objava.post.text}{' '}
                      </p>
                      <footer className="blockquote-footer mt-2">
                          {objava.post.first_name} {objava.post.last_name}
                      </footer>
                      <Card.Text>
                          <ChatSquareText onClick={() => postaviPrikaz()}
                          className={"pokazivac"}/> {objava.comments.length} <HandThumbsUpFill className={"palac pokazivac"}/> <small>{objava.post.likes} oznaka sviđa mi se</small>
                      </Card.Text>
                  </blockquote>
              </Card.Body>
          </Card>

          {prikazi ?
              <div id={objava.id}>
                  {objava.comments.map((komentar) => (
                      <Card className={"mt-1"}>
                          <Card.Header className={"w-30"}>{komentar.first_name} {komentar.last_name}</Card.Header>
                          <ListGroup variant="flush" className={"w-70"}>
                              <ListGroup.Item><ChatQuoteFill/> {komentar.text}</ListGroup.Item>
                          </ListGroup>
                      </Card>
                  ))}

                  <ObjaviKomentarComponent objava={objava.post}/>
              </div> :
              <div></div>}
      </div>
    );
}

export default FullObjavaComponent