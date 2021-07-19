import React, {useState} from "react"
import {CaretDownFill} from "react-bootstrap-icons";
import {Button, Form} from "react-bootstrap";
import axios from "axios";
import {Redirect,useParams} from "react-router-dom";
import {useForm} from "react-hook-form";

function NovaPorukaComponent({unistiSesiju,korisnik}){
    const [duzina,setDuzina]=useState(250)
    const [prosli,setProsli]=useState(0)
    const [loading,setLoading] = useState(true);
    const [redirect,setRedirect] = useState(false);
    const [na,setNa] = useState(0);
    const [useri,setUseri] = useState([]);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    let{id} = useParams();

    function getUser(){
        console.info("ID KORISNIKA")
        console.info(id)
        axios.post("https://dwsproject.herokuapp.com/getPeopleIFollow",
            {
                id:id
            }).then(
            (response) =>{
                setUseri(response.data);
                console.info(response.data)
                setLoading(false);
            }
        ).catch((error) => {
            switch (error.response.status) {
                case 403:
                    unistiSesiju();
                default:
                    unistiSesiju()
                    setLoading(false)
            }
        });
    }

    function posaljiPoruku(id,text){
        axios.post("https://dwsproject.herokuapp.com/sendMessage ",{
            id: id,
            text:text
        }).then(
            (response) =>{
                setRedirect(true);
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

    const onSubmit = async data=>{
        setNa(data.id)
        posaljiPoruku(data.to,data.text)
    }

    React.useEffect(()=>{
       getUser()
    },[])

    function promjenaTexta(event){
        let input=event.target.value;
        if(input.length>prosli) {
            setDuzina(duzina + (prosli-input.length))
            if(duzina+(prosli-input.length)===0){
                document.getElementById('preostalo').classList.remove('preostalo-manje')
                document.getElementById('preostalo').classList.remove('preostalo-poruka')
                document.getElementById('preostalo').classList.add('preostalo-nista')
            }
            else if (duzina + (prosli-input.length) < 20) {
                document.getElementById('preostalo').classList.remove('preostalo-poruka')
                document.getElementById('preostalo').classList.remove('preostalo-nista')
                document.getElementById('preostalo').classList.add('preostalo-manje')
            }
            setProsli(input.length)
        }else{
            setDuzina(duzina+(prosli-input.length))
            if(duzina+(prosli-input.length)>=20){
                document.getElementById('preostalo').classList.remove('preostalo-manje')
                document.getElementById('preostalo').classList.remove('preostalo-nista')
                document.getElementById('preostalo').classList.add('preostalo-poruka')

            }else if(duzina+(prosli-input.length)<20){
                document.getElementById('preostalo').classList.remove('preostalo-poruka')
                document.getElementById('preostalo').classList.remove('preostalo-nista')
                document.getElementById('preostalo').classList.add('preostalo-manje')
            }
            setProsli(input.length)
        }

    }

    return(
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Pošalji novu poruku
            </div>
            {redirect ? <Redirect to={"/chat"}/> : null}
            <Form className={"mb-3"} onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className={"mb-3"}>
                    <select className="form-select form-select-md mb-3" aria-label=".form-select-lg example" {...register('to')}>
                        <option selected>Odaberite primaoca poruke</option>
                        {useri.map((user) =>(
                            <option value={user.id}>{user.first_name} {user.last_name}</option>
                        ))}
                    </select>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control as="textarea" id="t" maxLength="250" rows={3} placeholder={"Unesite sadržaj nove poruke..."}
                                  onChange={promjenaTexta.bind(this)}
                                  {...register('text',{
                                      required: "Morate unijeti text"
                                  })}
                    />
                    <Form.Text className="text-muted">
                        Preostaje Vam još <b className="preostalo-poruka" id="preostalo">{duzina}</b> karaktera.
                    </Form.Text>
                </Form.Group>
                <Button type={"primary"} className={"w-100"}>Pošaljite poruku</Button>
            </Form>
        </div>
    );
}

export default NovaPorukaComponent