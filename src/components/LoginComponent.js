import React, {useState} from "react"
import {Form, Button, Alert} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";
import {XCircle} from "react-bootstrap-icons";

axios.defaults.withCredentials = true;

function LoginComponent({postaviSesiju,unistiSesiju}){

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [poruka,setPoruka]=useState("");
    const onSubmit = data => logujKorisnika(data);

    function zatvoriAlert(){
        console.log("uso")
        setShow(false)
    }

    function logujKorisnika(data){
        axios.post("https://dwsproject.herokuapp.com/loginUser",{
            username: data.username,
            password: data.password
        }).then(
            (response) =>{
                console.log(response)
                if(!response.data.success){
                    setPoruka(
                        response.data.reason
                    );
                    setShow(true)
                }
                console.log(response.data.success)
                if(response.data.success){
                    postaviSesiju();
                }
            },
            (error) =>{
                console.log(error)
            }
        ).catch((error) => {
            switch (error.response.status) {
                case 403:
                    unistiSesiju();
                default:
                    console.log(error)
            }
        });
    }

    return(
        <Form className={"mt-4 mb-4"} onSubmit={handleSubmit(onSubmit)}>
            <Alert variant="danger" show={show} onClose={zatvoriAlert.bind(this)} dismissible>
                <p className="bez-margine">
                    <XCircle style={{marginBottom: "3px"}}/> <span>{poruka}</span>
                </p>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label>Korisničko ime</Form.Label>
                <Form.Control type="text" placeholder="Unesite korisničko ime" {...register("username")} required/>
                <Form.Text className="text-muted">
                    Vaše privatne podatke nećemo dijeliti sa drugima.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Unesite password" {...register("password")} required/>
                <Form.Text className="text-muted">
                    Vaš password nećemo dijeliti sa drugima.
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit" className={"w-100"}>
                Loguj se
            </Button>
        </Form>
    )
}

export default LoginComponent