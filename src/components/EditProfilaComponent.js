import React, {useEffect, useState} from "react"
import {Container, Row, Col, Image, Form, Button, Alert} from "react-bootstrap";
import {CaretDownFill, XCircle} from "react-bootstrap-icons";
import {useForm} from "react-hook-form";
import Swal from 'sweetalert2'
import axios from "axios";


function EditProfilaComponent({korisnik,unistiSesiju}){
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {register: register1, handleSubmit: handleSubmit1, formState: {errors: errors1}}=useForm();
    const {register: register2, handleSubmit: handleSubmit2, formState: {errors: errors2}}=useForm()
    const onSubmit = data => console.log(data);
    console.log(korisnik)
    const [podaci,setPodaci]=useState({
        ime: korisnik.first_name,
        prezime: "",
        email: "",
        user: ""
    })
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
    const [upload,setUpload] = useState(false);
    const [show, setShow] = useState(false);
    const [show1,setShow1]=useState(false)
    const [poruka,setPoruka]=useState("");
    const [pass,setPass]=useState("");

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


    const onSubmit1 = async data=>{
        console.log(data)
        axios.post('https://dwsproject.herokuapp.com/editProfile',{
                first_name: data.ime,
                last_name: data.prezime,
                username: data.username,
                email: data.email
        })
            .then((response)=>{
                if(!response.data.success){
                    setPoruka(
                        response.data.reason
                    );
                    setShow(true)
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

    function zatvoriAlert(){
        console.log("uso")
        setShow(false)
    }

    function zatvoriAlert1(){
        setShow1(false)
    }

    const onSubmit2=async data=>{
        console.log(data)
        axios.post('https://dwsproject.herokuapp.com/changePassword',{
            old_password: data.trenutna,
            new_password: data.password
        })
            .then((response)=>{
                if(!response.data.success){
                    setPoruka(
                        response.data.reason
                    );
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

    useEffect(()=>{
       axios.get('https://dwsproject.herokuapp.com/getMyProfileInformation')
           .then((response)=>{
                console.log(response)
                setPodaci({
                    ime: response.data.first_name,
                    prezime: response.data.last_name,
                    user: response.data.username,
                    email: response.data.email
                })
           })
           .catch((error)=>{

           })
    },[])


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

            <Form className={"mt-3"} onSubmit={handleSubmit1(onSubmit1)}>
                <Alert variant="danger" show={show} onClose={zatvoriAlert.bind(this)} dismissible>
                    <p className="bez-margine">
                        <XCircle style={{marginBottom: "3px"}}/> <span>{poruka}</span>
                    </p>
                </Alert>
                <Form.Group className="mb-3">
                    <Form.Label>Nova email adresa:</Form.Label>
                    <Form.Control type="email" aria-invalid={errors1.email ? 'true' : 'false'} placeholder={korisnik.email} value={podaci.email}
                                  {...register1('email',{
                                      required: "Morate unijeti mail"
                                  })}
                                 onChange={(e)=>{
                                     setPodaci({email: e.target.value})
                                 }}
                    />
                    {errors1.email && <p className='greska'><XCircle/> {errors1.email.message}</p> }
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Novo korisničko ime:</Form.Label>
                    <Form.Control type="text" aria-invalid={errors1.username ? 'true' : 'false'} placeholder={korisnik.username} value={podaci.user}

                                  {...register1('username',{
                                      required: "Morate unijet korisničko ime"
                                  })}
                                  onChange={(e)=>{
                                      setPodaci({user: e.target.value})
                                  }}
                    />
                    {errors1.username && <p className='greska'><XCircle/> {errors1.username.message}</p> }
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Novo ime:</Form.Label>
                    <Form.Control type="text" aria-invalid={errors1.ime ? 'true' : 'false'} placeholder={korisnik.first_name} value={podaci.ime}
                                  {...register1('ime',{
                                      required: "Morate unijeti ime"
                                  })}
                                  onChange={(e)=>{
                                      setPodaci({ime: e.target.value})
                                  }}
                    />
                    {errors1.ime && <p className='greska'><XCircle/> {errors1.ime.message}</p> }
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Novo prezime:</Form.Label>
                    <Form.Control type="text" aria-invalid={errors1.prezime ? 'true' : 'false'} placeholder={korisnik.last_name} value={podaci.prezime}
                                  {...register1('prezime',{
                                      required: "Morate unijeti prezime"
                                  })}
                                  onChange={(e)=>{
                                      setPodaci({prezime: e.target.value})
                                  }}
                    />
                    {errors1.prezime && <p className='greska'><XCircle/> {errors1.prezime.message}</p> }
                </Form.Group>

                <Button variant="primary" type="submit" className={"w-100"}>
                    Potvrdi
                </Button>
            </Form>

            <Form className={"mt-3"} onSubmit={handleSubmit2(onSubmit2)}>
                <Alert variant="danger" show={show1} onClose={zatvoriAlert1.bind(this)} dismissible>
                    <p className="bez-margine">
                        <XCircle style={{marginBottom: "3px"}}/> <span>{poruka}</span>
                    </p>
                </Alert>
                <Form.Group className="mb-3">
                    <Form.Label>Trenutna lozinka:</Form.Label>
                    <Form.Control type="password" aria-invalid={errors2.trenutna ? 'true' : 'false'} placeholder="Unesite trenutnu lozinku"
                                  {...register2('trenutna',{
                                      required: "Morate unijeti trenutnu lozinku"
                                  })}
                    />
                    {errors2.trenutna && <p className="greska"><XCircle/> {errors2.trenutna.message}</p> }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Nova lozinka:</Form.Label>
                    <Form.Control type="password"  aria-invalid={errors2.password ? 'true' : 'false'} placeholder={"Unesite novu lozinku"}
                                  {...register2("password",{
                                      required: "Morate unijeti lozinku",
                                      minLength: {
                                          value: 8,
                                          message: "Lozinka mora minimalno 8 karaktera imati"
                                      }
                                  })}
                                onChange={(e)=>{setPass(e.target.value)}}
                    />
                    {errors2.password && <p className="greska"><XCircle/> {errors2.password.message}</p> }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Potvrdite novu lozinku</Form.Label>
                    <Form.Control type="password" aria-invalid={errors2.password1 ? 'true' : 'false'} placeholder={"Potvrdite novu lozinku"}
                                  {...register2("password1",{
                                      validate: value =>
                                          value === pass || "Lozinke se ne poklapaju"
                                  })}/>
                    {errors2.password1 && <p className="greska"><XCircle/> {errors2.password1.message}</p> }
                </Form.Group>
                <Form.Group>
                    <Button variant="primary" type="submit" className={"w-100"}>
                        Potvrdi
                    </Button>
                </Form.Group>
            </Form>


        </div>
    );
}

export default EditProfilaComponent;