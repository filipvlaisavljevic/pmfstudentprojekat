import React, {useEffect, useState} from "react"
import {Button, Form} from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from "axios";
import {XCircle} from "react-bootstrap-icons";
import Swal from "sweetalert2";

function EditKomentarComponent({handler,id,close}){
    const [text,setText]=useState("")
    const { register, handleSubmit, watch, formState: { errors },reset } = useForm({
        defaultValues: {
            text: ""
        }
    });

    console.log(id);
    const [duzina,setDuzina]=useState(250)
    const [prosli,setProsli]=useState(0)


    function uzmiPodatke(){
        axios.post('https://dwsproject.herokuapp.com/getCommentById',{
            id: id
        })
            .then((response)=>{
                console.log(response.data.text)
                setText(response.data.text);
                setDuzina(duzina-response.data.text.length)
                setProsli(response.data.text.length)
            })
            .catch((error)=>{

            })
    }

    useEffect(()=>{
       uzmiPodatke()
    },[reset])

    useEffect(() => {
        reset({text: text})
    }, [text]);




    const onSubmit = data=>{
        console.log(data);
        axios.post('https://dwsproject.herokuapp.com/editComment',{
            comment_id: id,
            text: data.text
        })
            .then((response)=>{
                if(!response.data.success){
                    console.log(response.data)
                }else{
                    Swal.fire({
                        title: 'Super!',
                        text: 'Uspješno ste promjenili komentar.',
                        icon: 'success',
                        confirmButtonText: 'Nastavi dalje'
                    })
                    document.getElementById('preostalo').classList.remove('preostalo-manje')
                    document.getElementById('preostalo').classList.remove('preostalo-nista')
                    document.getElementById('preostalo').classList.add('preostalo-poruka')
                    handler()
                    close()
                }
            })
            .catch((error)=>{
                console.log(error)
            })
    }

    function promjena(event){
        const input=event.target.value;
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
        <Form className={"mb-3"} onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
                <Form.Control as="textarea" id="text" maxLength="250" rows={3} {...register('text',{
                    required: "Morate unijeti text"
                })}
                              onChange={promjena.bind(this)}      placeholder={"Unesite sadržaj nove objave..."}
                />
                <Form.Text className="text-muted">
                    Preostaje Vam još <b className="preostalo-poruka" id="preostalo">{duzina}</b> karaktera.
                </Form.Text>
            </Form.Group>
            <Button type={"primary"} className={"w-100"}>Objavite novi post</Button>
        </Form>
    );
}

export default EditKomentarComponent