import React from "react"
import {Form,Button} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";

axios.defaults.withCredentials = true;

function LoginComponent({postaviSesiju,unistiSesiju}){

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => logujKorisnika(data);

    function logujKorisnika(data){
        axios.post("https://dwsproject.herokuapp.com/logIn",{
            username: data.username,
            password: data.password
        }).then(
            (response) =>{
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
            <Form.Group className="mb-3">
                <Form.Label>Korisničko ime</Form.Label>
                <Form.Control type="text" placeholder="Unesite korisničko ime" {...register("username")}/>
                <Form.Text className="text-muted">
                    Vaše privatne podatke nećemo dijeliti sa drugima.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Unesite password" {...register("password")}/>
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