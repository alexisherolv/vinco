import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

//Reacstrap Components
import {
    Button,
} from "reactstrap";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const history = useHistory();

    const handleScroll=() => {
        const offset=window.scrollY;
        if(offset > 56 ){
          setScrolled(true);
        }
        else{
          setScrolled(false);
        }
      }

    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    },[])

    let navbarClasses=["navbar", "fixed-top", "navbar-expand-lg", "navbar-dark"];
    
    if(scrolled){
        navbarClasses.push('scrolled');
    }

    function logout()
    {
        localStorage.removeItem("Name");
        localStorage.removeItem("Email");
        localStorage.removeItem("Token");
        localStorage.setItem("Logged", false);
        history.push("/");
    }

    return (
        <>
            <div>
                <nav className = {navbarClasses.join(" ")}>
                    <Link className="navbar-brand logo" aria-current="page" to="/">
                            <img src={process.env.PUBLIC_URL + '/images/Logo.png'} width="160" height="50"/>
                    </Link>
                    <button 
                        className="navbar-toggler" 
                        type="button" 
                        data-toggle="collapse" 
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" 
                        aria-expanded="false" 
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto ">
                            <li className="nav-item active">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Inicio
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Empresas
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Nosotros
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">
                                    Empleos
                                </Link>
                            </li>
                        </ul>
                        <div>
                            <Button type="submit" className="btn-round mb-3 navbar-button" onClick={logout}>
                                Cerrar Sesión
                            </Button>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Navbar;