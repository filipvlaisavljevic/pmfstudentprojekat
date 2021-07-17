import React, {useState} from "react"
import {Container, Row, Col, Image, Form, Button} from "react-bootstrap";
import {CaretDownFill} from "react-bootstrap-icons";
import {useForm} from "react-hook-form";
import Swal from 'sweetalert2'
import axios from "axios";


function EditProfilaComponent({korisnik,unistiSesiju}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const [upload,setUpload] = useState(false);

    const uploadImage = () => {
        if(image) {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "tutorial")
            data.append("cloud_name", "breellz")
            Swal.showLoading();
            fetch("  https://api.cloudinary.com/v1_1/breellz/image/upload", {
                method: "post",
                body: data
            })
                .then(resp => resp.json())
                .then(data => {
                    setUrl(data.url)
                    console.info(data.url)
                    postaviSliku(data.url);
                })
                .catch(err => console.log(err))
        }
    }

    function postaviSliku(data){
        axios.post("https://dwsproject.herokuapp.com/setProfilePicture",{
            image: data
        }).then(
            (response) =>{
                Swal.hideLoading();
                return(
                    Swal.fire({
                        title: 'Super!',
                        text: 'Vaša slika je uploadovana.',
                        icon: 'success',
                        confirmButtonText: 'Nastavi dalje'
                    })
                )
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
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Uredite svoj profil
            </div>

            <Form className={"mt-3"}>
                <Form.Group className={"mb-3"} controlId="formFile">
                    <Form.Control type="file" className="form-control" onChange={(e)=>{setImage(e.target.files[0])}}/>
                </Form.Group>
                <Button type='button' id="dugme_za_slanje" className={"w-100"} onClick={uploadImage}>Promijeni sliku</Button>
            </Form>

            <Form className={"mt-3"}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nova email adresa:</Form.Label>
                    <Form.Control type="email" placeholder={korisnik.email} value={korisnik.email}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Novo korisničko ime:</Form.Label>
                    <Form.Control type="email" placeholder={korisnik.username} value={korisnik.username}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Novo ime:</Form.Label>
                    <Form.Control type="email" placeholder={korisnik.first_name} value={korisnik.first_name}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Novo prezime:</Form.Label>
                    <Form.Control type="email" placeholder={korisnik.last_name} value={korisnik.last_name}/>
                </Form.Group>

                <Button variant="primary" type="submit" className={"w-100"}>
                    Potvrdi
                </Button>
            </Form>

            <Form className={"mt-3"}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nova lozinka:</Form.Label>
                    <Form.Control type="password" placeholder={"Unesite novu lozinku"}/>
                    <Form.Label></Form.Label>
                    <Form.Control type="password" placeholder={"Unesite novu lozinku"}/>
                </Form.Group>

                <Button variant="primary" type="submit" className={"w-100"}>
                    Potvrdi
                </Button>
            </Form>


        </div>
    );
}

export default EditProfilaComponent;