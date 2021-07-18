import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";
import {Redirect} from "react-router-dom";
import {CheckCircle, XCircle} from "react-bootstrap-icons";
import Swal from 'sweetalert2'


function ZaboravljenaSifraMailComponent({postaviSesiju,unistiSesiju}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [poruka,setPoruka]=useState("");
    const onSubmit = data=> zaboravljenaSifra(data)

    function zatvoriAlert(){
        setShow(false)
    }
    function zatvoriAlert1(){
        setShow1(false)
    }
    function zaboravljenaSifra(data){
        Swal.showLoading();
        console.log(data)
        axios.post('https://dwsproject.herokuapp.com/sendResetToken',{
            email: data.email
        })
            .then((response)=>{
                if(!response.data.success){
                    Swal.hideLoading()
                    setPoruka("Ne postoji korisnik sa datim emailom!")
                    setShow(true)
                }else{
                    Swal.hideLoading()
                    setPoruka("Poslali smo restartovanje šifre na vaš mail!")
                    setShow1(true)

                }
            })
            .catch((error)=>{
                switch (error.response.status) {
                    case 403:
                        unistiSesiju();
                    default:
                        console.log(error)
                }
            })
    }


    return(
        <Form className={"mt-4 mb-4"} onSubmit={handleSubmit(onSubmit)}>
            <Alert variant="danger" show={show} onClose={zatvoriAlert.bind(this)} dismissible>
                <p className="bez-margine">
                    <XCircle style={{marginBottom: "3px"}}/> <span>{poruka}</span>
                </p>
            </Alert>
            <Alert variant="success" show={show1} onClose={zatvoriAlert1.bind(this)} dismissible>
                <p className="bez-margine">
                    <CheckCircle style={{marginBottom: "3px"}}/> <span>{poruka}</span>
                </p>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label>Unesite vaš mail</Form.Label>
                <Form.Control type="email" aria-invalid={errors.email ? 'true' : 'false'} placeholder="neko@gmail.com"
                              {...register('email',{
                                  required: 'Morate unijeti email'
                              })}
                />
                {errors.email && <p className="greska">{errors.email.message}</p> }
            </Form.Group>
            <Form.Group classNam="mb-3">
                <Button className="w-100" type="submit">Pošaljite</Button>
            </Form.Group>
        </Form>
    )
}

export default ZaboravljenaSifraMailComponent;