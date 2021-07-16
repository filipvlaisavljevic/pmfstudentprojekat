import React from "react"
import {Spinner} from "react-bootstrap";

function LoadingComponent(){
    return(
        <div className={"spiner"}>
            <Spinner animation="border" role="status" className={"velicinaspinera"}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default LoadingComponent