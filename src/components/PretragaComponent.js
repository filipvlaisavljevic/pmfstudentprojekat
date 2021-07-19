import React, {useEffect, useState} from "react"
import SugestijaComponent from "./SugestijaComponent";
import {CaretDownFill} from "react-bootstrap-icons";
import {useParams} from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import RezultatComponent from "./RezultatComponent";

function PretragaComponent({unistiSesiju}){
    const [loading,setLoading] = useState(true);
    const [rezultat,setRezultat] = useState([]);
    const [promjena,setPromjena] = useState(false);
    const [kveri,setKveri] = useState([]);
    let { query } = useParams();

    function postaviKveri(){
        setKveri(query)
        setPromjena(!promjena)
    }

    useEffect(() =>{
        postaviKveri()
    },[])

    function handler(){
        setPromjena(!promjena)
    }


    function dohvatiSearch(){
        axios.post("https://dwsproject.herokuapp.com/searchProfile",{
            phrase: query
        }).then(
            (response) =>{
                console.info(response)
                setRezultat(response.data)
                setLoading(false);
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

    useEffect(() =>{
        dohvatiSearch();
    },[])

    useEffect(() =>{
        dohvatiSearch();
    },[query])

    return(
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Pronađeni rezultati za: {query}
            </div>
            {rezultat.map((rez) =>(
                <RezultatComponent predlozen={rez} unistiSesiju={() => unistiSesiju()} handler={() => handler()}/>
            ))}
        </div>
    );
}

export default PretragaComponent