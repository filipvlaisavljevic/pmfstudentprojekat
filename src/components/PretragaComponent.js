import React from "react"
import SugestijaComponent from "./SugestijaComponent";
import {CaretDownFill} from "react-bootstrap-icons";

function PretragaComponent(){
    return(
        <div className={"mt-5"}>
            <div className={"banner pt-2 pb-2 mb-4"}>
                <CaretDownFill/> Pronađeni rezultati
            </div>
            <SugestijaComponent/>
            <SugestijaComponent/>
            <SugestijaComponent/>
        </div>
    );
}

export default PretragaComponent