import React from "react"
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";

function RegisterComponent({postaviSesiju}){

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => registrujKorisnika(data);

    function registrujKorisnika(data){
        axios.post("https://dwsproject.herokuapp.com/register",{
            username: data.username,
            password: data.password,
            email: data.email
        }).then(
            (response) =>{
                console.log(response)
                postaviSesiju();
            },
            (error) =>{
                console.log(error)
            }
        )
    }

    return(
        <Form className={"mt-4 mb-4"} onSubmit={handleSubmit(onSubmit)}>

            <Form.Group className="mb-3">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" placeholder="Unesite ime" {...register("ime")}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" placeholder="Unesite prezime" {...register("prezime")}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Korisničko ime</Form.Label>
                <Form.Control type="text" placeholder="Unesite željeno korisničko ime" {...register("username")}/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control type="email" placeholder="Uniste email adresu" {...register("email")}/>
                <Form.Text className="text-muted">
                    Vašu email adresu nećemo dijeliti sa drugima.
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

export default RegisterComponent