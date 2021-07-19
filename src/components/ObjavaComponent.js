import React, {useEffect, useState} from "react"
import {Card, Row, Col, ListGroup, Dropdown, Modal, Button} from "react-bootstrap";
import {
    CaretDownFill,
    HandThumbsUp,
    HandThumbsDown,
    Facebook,
    HandThumbsUpFill,
    ChatSquareText, ChatQuoteFill, HandThumbsDownFill, ThreeDots, Trash, Pencil
} from 'react-bootstrap-icons';
import ObjaviKomentarComponent from "./ObjaviKomentarComponent";
import axios from "axios";
import EditObjaveComponent from "./EditObjaveComponent";
import Swal from "sweetalert2";
import EditKomentarComponent from "./EditKomentarComponent";
import {checkText} from "smile2emoji";
import {decode} from "html-entities";

function ObjavaComponent({objava,handler,unistiSesiju,sesija}){
    const[prikazi,setPrikazi] = useState(false);
    const [show, setShow] = useState(false);
    const [show1,setShow1]=useState(false);
    const [show2, setShow2] = useState(false);
    const [show3,setShow3]=useState(false);
    const [korisnik,setKorisnik]=useState([])
    const [id,setId]=useState(0)
    const [komentarId,setKomentarId]=useState(0)

    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleShow = (id) =>{setId(id); setShow(true);}
    const handleShow1 = () => {setShow1(true);}
    const handleClose2 = () =>{setShow2(false)}
    const handleShow2 = (idK) =>{console.log(idK);setKomentarId(idK); setShow2(true)}
    const handleClose3 = () =>{setShow3(false);}
    const handleShow3 = (idK) =>{console.log(idK); setKomentarId(idK); setShow3(true);}
    function postaviPrikaz(){
        setPrikazi(!prikazi);
    }

    const uzmiOKorisniku=async ()=>{
        const upit=await axios.get("https://dwsproject.herokuapp.com/getMyProfileInformation")

        setKorisnik(upit.data)
    }

    useEffect(()=>{
       uzmiOKorisniku()
    },[])



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
                    handleClose()
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

    function obrisiKomentar(){
        console.log(komentarId)
        axios.post('https://dwsproject.herokuapp.com/removeComment',{
            comment_id: komentarId
        })
            .then((response)=>{
                if(!response.data.success){
                    console.log(response.data)
                }else{
                    Swal.fire({
                        title: 'Super!',
                        text: 'Uspješno ste izbrisali komentar.',
                        icon: 'success',
                        confirmButtonText: 'Nastavi dalje'
                    })
                    handler()
                    handleClose2()
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

    if(korisnik){
        console.log("")
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
                                    <a href={"/objava/"+objava.post.id} className={"objavaa"}>{checkText(decode(objava.post.text))}</a>
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
                        <Col xs={1} className="bezpaddinga" style={{textAlign: "center"}}>
                            {korisnik.id===objava.post.author_id ?
                                <Dropdown>
                                    <Dropdown.Toggle className="dugme-dropdown">
                                        <ThreeDots/>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item style={{color: "#D83A56"}} onClick={handleShow.bind(this, objava.post.id)}><Trash/> Izbrišite
                                            objavu</Dropdown.Item>
                                        <Dropdown.Item onClick={handleShow1.bind(this)}><Pencil/> Editujte objavu
                                        </Dropdown.Item>
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
                            <Card.Header className={"w-30"}>
                                <a href={"/profil/"+komentar.author_id} className={"bez-dekoracije2"}>{komentar.first_name} {komentar.last_name}</a>
                            </Card.Header>
                            <ListGroup variant="flush" className={"w-70"}>
                                <ListGroup.Item>
                                    <Row>
                                        <Col xs={11}>
                                            <ChatQuoteFill/> {checkText(decode(komentar.text))}
                                        </Col>
                                        <Col xs={1}>
                                            {
                                                korisnik.id===komentar.author_id ?
                                                    <Dropdown>
                                                        <Dropdown.Toggle className="dugme-dropdown">
                                                            <ThreeDots/>
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item style={{color: "#D83A56"}} onClick={handleShow2.bind(this, komentar.id)}><Trash/> Izbrišite
                                                                komentar</Dropdown.Item>
                                                            <Dropdown.Item onClick={handleShow3.bind(this,komentar.id)}><Pencil/> Editujte komentar
                                                            </Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    : <></>
                                            }

                                        </Col>
                                    </Row>
                                </ListGroup.Item>
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
            <Modal
                show={show1}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose1}
            >
                <Modal.Body>
                    <EditObjaveComponent handler={handler} objava={objava.post} close={handleClose1}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="dugme-warning" onClick={handleClose1}>
                        Zatvori
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={show2}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose2}
            >
                <Modal.Body style={{textAlign: "center"}}>
                    <h4>Izbrisati objavu?</h4>
                    <p style={{textAlign: "center"}}>
                        Ukoliko izbrišite objavu, zauvijek će nestati sa Vašeg profila i ne možemo je vratiti.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose2}>
                        Otkaži
                    </Button>
                    <Button className="dugme-warning" onClick={obrisiKomentar.bind(this)}>
                        Izbriši
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={show3}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={handleClose3}
            >
                <Modal.Body>
                    <EditKomentarComponent id={komentarId} close={handleClose3} handler={handler} />
                </Modal.Body>
                <Modal.Footer>
                    <Button className="dugme-warning" onClick={handleClose3}>
                        Zatvori
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default ObjavaComponent