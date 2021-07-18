import React, {useEffect, useState} from "react"
import {Button, Card, Col, Dropdown, ListGroup, Modal, Row} from "react-bootstrap";
import {
    CaretDownFill,
    ChatDots,
    ChatQuoteFill,
    ChatRightText,
    ChatSquareText, HandThumbsDownFill,
    HandThumbsUpFill,
    Hash,
    Messenger, ThreeDots, Trash
} from "react-bootstrap-icons";
import ObjaviPostComponent from "./ObjaviPostComponent";
import ObjaviKomentarComponent from "./ObjaviKomentarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import {useParams} from "react-router-dom";
import MiniLoadingComponent from "./MiniLoadingComponent";

function KlikObjavaComponent({unistiSesiju,sesija}){

    const [show, setShow] = useState(false);
    const[objava,setObjava] = useState([]);
    const[promjena,setPromjena] = useState(false);
    const[id,setId] =useState(0);
    const[loading,setLoading] =useState(true);

    let { ide } = useParams();

    function handler(){
        setPromjena(!promjena)
    }

    function dohvatiObjavu(){
        axios.post('https://dwsproject.herokuapp.com/getPostById',{
            id: ide
        })
            .then((response)=>{
                console.info(response.data)
               setObjava(response.data)
                setLoading(false)
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

    useEffect(() =>{
       dohvatiObjavu()
    },[])

    useEffect(() =>{
        dohvatiObjavu()
    },[promjena])

    const handleClose = () => setShow(false);
    const handleShow = (id) =>{setId(id); setShow(true);}
    const[prikazi,setPrikazi] = useState(false);
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
    console.log(sesija)
    if(loading) return <MiniLoadingComponent/>
    return(
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Pročitajte punu objavu:
            </div>
            <Card className={"mb-3 mt-3"}>
                {/*<Card.Img variant="top" src="https://i.imgur.com/FW4FhbQ.png" className={"d-none d-lg-block"}/>*/}
                <Card.Body>
                    <Row>
                        <Col xs={11}>

                            <blockquote className="blockquote mb-0">
                                <p>
                                    {' '}
                                    {objava.post.text}{' '}
                                </p>
                                <footer className="blockquote-footer mt-2">
                                    <a href={"/profil/"+objava.post.author_id} className={"bez-dekoracije"}>{objava.post.first_name} {objava.post.last_name}</a>
                                </footer>
                                <Card.Text>
                                    <ChatSquareText onClick={() => postaviPrikaz()}
                                                    className={"pokazivac"}/> <small>{objava.comments.length} </small>
                                    {!objava.post.i_have_liked ? <HandThumbsUpFill className={"palac pokazivac"} onClick={() => lajkaj()}/> :
                                        <HandThumbsDownFill className={"palac pokazivac"} onClick={() => dislajk()}/>} <small> {objava.post.likes} oznaka sviđa mi se</small>
                                </Card.Text>
                            </blockquote>
                        </Col>
                        <Col xs={1} className="bezpaddinga" style={{textAlign: "center"}}>
                            {sesija.id===objava.post.author_id ?
                                <Dropdown>
                                    <Dropdown.Toggle className="dugme-dropdown" noCaret>
                                        <ThreeDots/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item style={{color: "#D83A56"}} onClick={handleShow.bind(this, objava.post.id)}><Trash/> Izbrišite
                                            objavu</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                : <></>
                            }
                        </Col>

                    </Row>
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
            <Modal
                show={show}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose}
            >
                <Modal.Body style={{textAlign: "center"}}>
                    <h4>Izbrisati objavu?</h4>
                    <p style={{textAlign: "center"}}>
                        Ukoliko izbrišite objavu, zauvijek će nestati sa Vašeg profila i ne možemo je vratiti.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Otkaži
                    </Button>
                    <Button className="dugme-warning" onClick={obrisiObjavu.bind(this)}>
                        Izbriši
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default KlikObjavaComponent