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

function App() {

    const [sesija,setSesija] = useState(false);
    const [korisnik,setKorisnik] = useState(false);
    const [promjena,setPromjena] = useState(false);

    function postaviSesiju(){
        setSesija(true);
    }

    function unistiSesiju(){
        setSesija(false);
    }

    function handler(){
        setPromjena(!promjena);
    }

  return (
      <Router>
        <Container>
          <HeaderComponent sesija={sesija}/>
            {/*  Prikaz početne stranice za sve logovane korisnike*/}
            <Switch>
                <Route path="/login">
                    <LoginComponent postaviSesiju={() => postaviSesiju()}/>
                </Route>
                <Route path="/register">
                    <RegisterComponent postaviSesiju={() => postaviSesiju()}/>
                </Route>
                <Route path="/profil/edit">
                    {sesija ? <EditProfilaComponent/> : <Redirect to={'/login'}/>}
                </Route>
                <Route path="/profil">
                    {sesija ? <ProfilComponent/> : <Redirect to={'/login'}/>}
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
                    {sesija ? <HomeComponent/> : <Redirect to={'/login'}/>}
                </Route>
            </Switch>
          <FooterComponent/>
        </Container>
      </Router>
  );
}

export default App;
