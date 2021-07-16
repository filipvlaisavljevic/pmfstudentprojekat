import React from "react"
import {Card,ListGroup} from "react-bootstrap";
import {ChatQuoteFill, HandThumbsUpFill, Hash, Messenger} from "react-bootstrap-icons";
import ObjaviPostComponent from "./ObjaviPostComponent";
import ObjaviKomentarComponent from "./ObjaviKomentarComponent";

function FullObjavaComponent(){
    return(
      <div>
          <Card className={"mb-3 mt-5"}>
              {/*<Card.Img variant="top" src="https://i.imgur.com/FW4FhbQ.png" className={"d-none d-lg-block"}/>*/}
              <Card.Body>
                  <blockquote className="blockquote mb-0">
                      <p>
                          {' '}
                          Cras blandit ex ex, et vehicula ex faucibus suscipit. Nunc lobortis
                          ante vulputate risus aliquet egestas. Etiam quis tellus a purus ultrices
                          hendrerit id id sem. Class aptent taciti sociosqu ad litora torquent per
                          conubia nostra, per inceptos ligula.{' '}
                      </p>
                      <footer className="blockquote-footer mt-2">
                          Filip Vlaisavljević
                      </footer>
                      <Card.Text>
                          <HandThumbsUpFill className={"palac"}/> <small>15 oznaka sviđa mi se</small>
                      </Card.Text>
                  </blockquote>
              </Card.Body>
          </Card>
          <Card>
              <Card.Header className={"w-30"}>Amar Kurić</Card.Header>
              <ListGroup variant="flush">
                  <ListGroup.Item><ChatQuoteFill/> Ovo je moj prvi komentar! Ja volim matematiku.</ListGroup.Item>
              </ListGroup>
          </Card>
          <Card className={"mt-1"}>
              <Card.Header className={"w-30"}>Tarik Pašić</Card.Header>
              <ListGroup variant="flush">
                  <ListGroup.Item><ChatQuoteFill/> Ćao Amare i Filipe, ja volim čokoladne kokice. Xoxo!</ListGroup.Item>
              </ListGroup>
          </Card>
          <ObjaviKomentarComponent/>
      </div>
    );
}

export default FullObjavaComponent