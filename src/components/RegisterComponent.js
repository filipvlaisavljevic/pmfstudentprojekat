import React, {useState} from "react"
import {Alert, Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";
import Feedback from "react-bootstrap/Feedback";
import {XCircle} from "react-bootstrap-icons";
import {Redirect} from "react-router-dom";
import Swal from "sweetalert2";

axios.defaults.withCredentials = true;

function RegisterComponent({postaviSesiju,unistiSesiju}){

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [show, setShow] = useState(false);
    const [poruka,setPoruka]=useState("");
    const [redirectLogin,setRedirectLogin] = useState(false);
    const onSubmit = data => registrujKorisnika(data);

    function zatvoriAlert(){
        console.log("uso")
        setShow(false)
    }

    function registrujKorisnika(data){
        axios.post("https://dwsproject.herokuapp.com/register/",{
            username: data.username,
            password: data.password,
            email: data.email,
            first_name: data.ime,
            last_name: data.prezime
        }).then(
            (response) =>{
                if(!response.data.success){
                    setPoruka(
                        response.data.reason
                    );
                    setShow(true)
                }
                else {
                    Swal.fire({
                        title: 'Super!',
                        text: 'Uspješno ste se registrovali, molimo Vas da se sada logujete.',
                        icon: 'success',
                        confirmButtonText: 'Nastavi dalje'
                    })
                    setRedirectLogin(true);
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
        <Form className={"mt-4 mb-4"} onSubmit={handleSubmit(onSubmit)} noValidate>
            {redirectLogin ? (<Redirect push to={"/login"}/>) : null}
            <Alert variant="danger" show={show} onClose={zatvoriAlert.bind(this)} dismissible>
                <p className="bez-margine">
                    <XCircle style={{marginBottom: "3px"}}/> <span>{poruka}</span>
                </p>
            </Alert>
            <Form.Group className="mb-3">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" placeholder="Unesite ime"
                              aria-invalid={errors.ime ? "true" : "false"}
                              {...register("ime",{
                    required: "Morate unijeti ime"
                })}/>
                {errors.ime && <p className='greska'><XCircle/> {errors.ime.message}</p>}
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" aria-invalid={errors.prezime ? "true" : "false"} placeholder="Unesite prezime" {...register("prezime",{
                    required: "Morate unijeti prezime"
                })}/>
                {errors.prezime && <p className='greska'><XCircle/> {errors.prezime.message}</p> }
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Korisničko ime</Form.Label>
                <Form.Control type="text" aria-invalid={errors.username ? "true" : "false"} placeholder="Unesite željeno korisničko ime" {...register("username",{
                    required: "Morate unijet korisničko ime"
                })}/>
                {errors.username && <p className='greska'><XCircle/> {errors.username.message}</p> }
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control type="email" placeholder="Uniste email adresu" aria-invalid={errors.email ? "true" : "false"} {...register("email",{
                    required: "Morate unijeti mail",
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Niste unijeli dobar format"
                    }

                })}/>
                {errors.email && <p className='greska'><XCircle/> {errors.email.message}</p>}
                <Form.Text className="text-muted">
                    Vašu email adresu nećemo dijeliti sa drugima.
                </Form.Text>
            </Form.Group>

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
            <Button variant="primary" type="submit" className={"w-100"}>
                Registruj se
            </Button>

        </Form>
    )
}

export default RegisterComponent