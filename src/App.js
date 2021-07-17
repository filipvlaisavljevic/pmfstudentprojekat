import logo from './logo.svg';
import './App.css';
import {Container,Button} from "react-bootstrap";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import HomeComponent from "./components/HomeComponent";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import ProfilComponent from "./components/ProfilComponent";
import EditProfilaComponent from "./components/EditProfilaComponent";
import FullObjavaComponent from "./components/FullObjavaComponent";
import PretragaComponent from "./components/PretragaComponent";
import ChatComponent from "./components/ChatComponent";
import NovaPorukaComponent from "./components/NovaPorukaComponent";
import {useEffect, useState} from "react";
import axios from "axios";
import LoadingComponent from "./components/LoadingComponent";

function App() {

    const [sesija,setSesija] = useState(true);
    const [loading,setLoading] = useState(true);
    const [korisnik,setKorisnik] = useState([]);
    const [promjena,setPromjena] = useState(false);

    function postaviSesiju(){
        setSesija(true);
        setLoading(false);
    }

    function unistiSesiju(){
        setSesija(false);
        setLoading(false);
    }

    function handler(){
        setPromjena(!promjena);
    }

    function provjeriSesiju(){
        axios.get("https://dwsproject.herokuapp.com/getMyProfileInformation").then(
            (response) =>{
                postaviSesiju();
                setKorisnik(response.data);
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

    useEffect(() =>
    {
        provjeriSesiju();
    },[]);

    if(loading){
        return (<LoadingComponent/>);
    }
    else return (
          <Router>
            <Container>
              <HeaderComponent sesija={sesija} unistiSesiju={() => unistiSesiju()}/>
                {/*  Prikaz početne stranice za sve logovane korisnike*/}
                <Switch>
                    <Route path="/login">
                        {!sesija ? <LoginComponent postaviSesiju={() => postaviSesiju()}
                            unistiSesiju={() => unistiSesiju()}
                        /> :<Redirect to={'/'}/>}
                    </Route>
                    <Route path="/register">
                        {!sesija ? <RegisterComponent postaviSesiju={() => postaviSesiju()}
                          unistiSesiju={() => unistiSesiju()}
                        /> :<Redirect to={'/'}/>}
                    </Route>
                    <Route path="/profil/edit">
                        {sesija ? <EditProfilaComponent korisnik={korisnik}
                            unistiSesiju={() => unistiSesiju()}
                        /> : <Redirect to={'/login'}/>}
                    </Route>
                    <Route path="/profil">
                        {sesija ? <ProfilComponent korisnik={korisnik}
                            unistiSesiju={() => unistiSesiju()}
                            handler={() => handler()}
                        /> : <Redirect to={'/login'}/>}
                    </Route>
                    <Route path="/objava">
                        {sesija ? <FullObjavaComponent/> : <Redirect to={'/login'}/>}
                    </Route>
                    <Route path="/pretraga">
                        {sesija ? <PretragaComponent/> : <Redirect to={'/login'}/>}
                    </Route>
                    <Route path="/chat">
                        {sesija ? <ChatComponent/> : <Redirect to={'/login'}/>}
                    </Route>
                    <Route path="/novaporuka">
                        {sesija ?  <NovaPorukaComponent/> : <Redirect to={'/login'}/>}
                    </Route>
                    <Route path="/">
                        {sesija ? <HomeComponent unistiSesiju={() => unistiSesiju()}/> : <Redirect to={'/login'}/>}
                    </Route>
                </Switch>
              <FooterComponent/>
            </Container>
          </Router>
      );
}

export default App;
