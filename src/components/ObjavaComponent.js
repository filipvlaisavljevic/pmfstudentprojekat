import React, {useState} from "react"
import {Card, Row, Col, ListGroup} from "react-bootstrap";
import {
    CaretDownFill,
    HandThumbsUp,
    HandThumbsDown,
    Facebook,
    HandThumbsUpFill,
    ChatSquareText, ChatQuoteFill, HandThumbsDownFill
} from 'react-bootstrap-icons';
import ObjaviKomentarComponent from "./ObjaviKomentarComponent";
import axios from "axios";
import Swal from "sweetalert2";

function ObjavaComponent({objava,handler,unistiSesiju,sesija}){
    const [show, setShow] = useState(false);
    const [show1,setShow1]=useState(false);
    const [id,setId]=useState(0)
    const[prikazi,setPrikazi] = useState(false);


    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = (id) =>{setId(id); setShow(true);}
    const handleShow1 = () => {setShow1(true);}

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

    function obrisiObjavu(){
        console.log(id)
        setShow(false);
        axios.post('https://dwsproject.herokuapp.com/deletePost',{
            post_id: id
        })
            .then((response)=>{
                if(!response.data.success){
                    console.log(response.data)
                }else{
                    Swal.fire({
                        title: 'Super!',
                        text: 'Uspješno ste izbrisali objavu.',
                        icon: 'success',
                        confirmButtonText: 'Nastavi dalje'
                    })
                    handler()
                }
            })
            .catch((error)=>{
                console.log(error)
                switch (error.response.status) {
                    case 403:
                        unistiSesiju();
                    default:
                        console.log(error)
                }
            })
    }

    return(
        <div className="bezpaddinga">
            <Card className={"mb-3"}>
                <Card.Img variant="top" src={objava.post.picture} className={"d-none d-lg-block"}/>
                <Card.Body className={"w-70"}>
                    <Row>
                        <Col xs={11}>
                            <div className="blockquote mb-0">
                                <p>
                                    <a href={"/objava/"+objava.post.id} className={"objavaa"}>{objava.post.text}</a>
                                </p>
                                <footer className="blockquote-footer mt-2">
                                    <a href={"/profil/"+objava.post.author_id} className={"bez-dekoracije"}>{objava.post.first_name} {objava.post.last_name}</a>
                                </footer>

                                <Card.Text> <ChatSquareText onClick={() => postaviPrikaz()}
                                                            className={"pokazivac"}/> <small>{objava.comments.length}</small>
                                    {!objava.post.i_have_liked? <HandThumbsUpFill className={"palac pokazivac"}  onClick={() => lajkaj()}/> :
                                        <HandThumbsDownFill className={"palac pokazivac"} onClick={() => dislajk()}/>}  <small>{objava.post.likes} oznaka sviđa mi se</small>
                                </Card.Text>
                            </div>
                        </Col>

                    </Row>
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