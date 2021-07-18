import React, {useEffect, useState} from "react"
import {Card,ListGroup} from "react-bootstrap";
import {
    ChatDots,
    ChatQuoteFill,
    ChatRightText,
    ChatSquareText, HandThumbsDownFill,
    HandThumbsUpFill,
    Hash,
    Messenger
} from "react-bootstrap-icons";
import ObjaviPostComponent from "./ObjaviPostComponent";
import ObjaviKomentarComponent from "./ObjaviKomentarComponent";
import axios from "axios";
import Swal from "sweetalert2";

function FullObjavaComponent({objava,handler,unistiSesiju}){

    const[prikazi,setPrikazi] = useState(false);

    function postaviPrikaz(){
        setPrikazi(!prikazi);
    }

    function lajkaj(){
            axios.post("https://dwsproject.herokuapp.com/likePost",{
                post_id: objava.post.id
            }).then(
                (response) =>{
                    handler();
                },
                (error) =>{
                    console.log(error)
                }
            ).catch((error) => {
                console.log(error)
                switch (error.response.status) {
                    case 403:
                        unistiSesiju();
                    default:
                        console.log(error)
                }
            });
        }

    function dislajk(){
        axios.post("https://dwsproject.herokuapp.com/removeLikeFromPost",{
            post_id: objava.post.id
        }).then(
            (response) =>{
                handler();
            },
            (error) =>{
                console.log(error)
            }
        ).catch((error) => {
            console.log(error)
            switch (error.response.status) {
                case 403:
                    unistiSesiju();
                default:
                    console.log(error)
            }
        });
    }



    console.log("OBJAVA")
    console.log(objava)

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
                                          className={"pokazivac"}/> <small>{objava.comments.length} </small>
                          {!objava.i_have_liked? <HandThumbsUpFill className={"palac pokazivac"} onClick={() => lajkaj()}/> :
                              <HandThumbsDownFill className={"palac pokazivac"} onClick={() => dislajk()}/>} <small> {objava.post.likes} oznaka sviđa mi se</small>
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

                  <ObjaviKomentarComponent objava={objava.post} handler={() => handler()}/>
              </div> :
              <div></div>}
      </div>
    );
}

export default FullObjavaComponent