import React, {useState} from "react";
import {Redirect, useParams} from "react-router-dom";
import {Alert, Button, Form} from "react-bootstrap";
import {CheckCircle, XCircle} from "react-bootstrap-icons";
import {useForm} from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";


function ZaboravljenaSifraComponet({postaviSesiju,unistiSesiju}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [redirectLogin,setRedirectLogin] = useState(false);
    const [show, setShow] = useState(false);
    const [poruka,setPoruka]=useState("");
    const {id}=useParams()
    function zatvoriAlert(){
        setShow(false)
    }
    function zaboravljena(data){
        console.log(data)
        console.log(id)
        axios.post('https://dwsproject.herokuapp.com/resetPassword',{
            token: id,
            new_password: data.password

        })
            .then((response)=>{
                console.log(response)
                if(!response.data.success){
                    setPoruka("Nije validan token!")
                    setShow(true)
                }else{
                    Swal.fire({
                        title: 'Super!',
                        text: 'Uspješno ste se promjenili šifru, molimo Vas da se sada logujete.',
                        icon: 'success',
                        confirmButtonText: 'Nastavi dalje'
                    })
                    setRedirectLogin(true);
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
    const onSubmit=data=>zaboravljena(data);
    return(
        <Form className={"mt-4 mb-4"} onSubmit={handleSubmit(onSubmit)}>
            <Alert variant="danger" show={show} onClose={zatvoriAlert.bind(this)} dismissible>
                <p className="bez-margine">
                    <XCircle style={{marginBottom: "3px"}}/> <span>{poruka}</span>
                </p>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" aria-invalid={errors.password ? 'true' : 'false'} id="pass1" placeholder="Unesite password" {...register("password",{
                    required: "Morate unijeti šifru",
                    minLength: {
                        value: 8,
                        message: "Šifra mora minimalno 8 karaktera imati"
                    }
                })}/>
                {errors.password && <p className='greska'><XCircle/> {errors.password.message}</p> }
                <Form.Text className="text-muted">
                    Vaš password nećemo dijeliti sa drugima.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Potvrdite password</Form.Label>
                <Form.Control type="password" aria-invalid={errors.password1 ? 'true' : 'false'} placeholder="Potvrdite password" {...register("password1",{
                    validate: value =>
                        value === document.getElementById("pass1").value || "Šifre se ne poklapaju"
                })}/>
                {errors.password1 && <p className='greska'><XCircle/> {errors.password1.message}</p> }
            </Form.Group>
            <Form.Group classNam="mb-3">
                <Button className="w-100" type="submit">Pošaljite</Button>
            </Form.Group>
        </Form>
    )
}

export default ZaboravljenaSifraComponet;