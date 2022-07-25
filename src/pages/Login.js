import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState, useEffect} from "react";
import ReactBSAlert from "react-bootstrap-sweetalert";
import Cargando from "../assets/img/loading_icon.gif";

//Reacstrap Components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    FormGroup,
    Form,
    Input,
    Container,
    Col,
    Row,
} from "reactstrap";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const logged = localStorage.getItem("Logged");

    const [emailState, setEmailState] = useState("");

    const [errorState, setErrorState] = React.useState("");
    const [error, setError] = React.useState();
    const [errorMessage, setErrorMessage] = React.useState("");

    const [alert2, setAlert2] = React.useState(null);

    useEffect(() => {
        //Si el usuario ya ha iniciado sesión enviar al dashboard
        if(logged==="true")
        {
          history.push("/dashboard");
        }
    }, []);
    

    const autoCloseAlert2 = (mensaje) => {
        setAlert2(
            <ReactBSAlert
                style={{ display: "block", marginTop: "auto", marginBottom: "auto" }}
                title=""
                showConfirm={false}
            >
                <Row>
                    <Col sm="4">
                    </Col>
                    <Col sm="4">
                        <img 
                        src = {Cargando} 
                        style ={{ width: "50px", height: "50px" }}
                        />
                    </Col>
                    <Col sm="4">
                    </Col>
                </Row>
                &nbsp;
                {mensaje}
            </ReactBSAlert>
        );
    };

    const hideAlert2 = () => {
        setAlert2(null);
    };

    //Verificar Input Email
    const verifyEmail = (value) => {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value)) {
            return true;
        }
        return false;
    };
    
    function onSubmitForm(event) {
        event.preventDefault();
    
        const catRegister = {
          pvIdUser: email,
          pvPassword: password
        };

        autoCloseAlert2("Iniciando Sesión...")
    
        fetch(`${process.env.REACT_APP_API_URI}security-users/login/`, {
            method: "POST",
            body: JSON.stringify(catRegister),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if (data.errors) {
                setError(
                    <p>Hubo un error al realizar tu solicitud</p>
                );
            }
            else{
                if(data.Code_Type === "Error")
                {
                    hideAlert2()
                    setErrorState("has-danger")
                    setErrorMessage(data[0].Code_Message_User)
                }
                else{
                    console.log("ENTRE AQUI")
                    setErrorState("has-success");
                    setTimeout(function(){
                      getUser(email, data.token)
                    },500);
                }
            }
        });
    }
    
    function getUser(email, token){
    
        var url = new URL(`${process.env.REACT_APP_API_URI}security-users/${email}`);
        fetch(url, {
          method: "GET",
          headers: {
              "access-token": token,
              "Content-Type": "application/json",
          }
        })
        .then(function(response) {
            return response.ok ? response.json() : Promise.reject();
        })
        .then(function(data) {
            hideAlert2() 
            localStorage.setItem("Name", data[0].Name);
            localStorage.setItem("Email", data[0].Email);
            localStorage.setItem("Token", token)
            localStorage.setItem("Logged", true)
            history.push("/dashboard");
        })
        .catch(function(err) {
            console.log("No se pudo consultar la informacion del usuario" + err);
        });
    }

    return (
        <Container>
            <Row className="abs-center">
                <Col className="ml-auto mr-auto" lg="4" md="6">
                    <Form className="form" onSubmit={onSubmitForm} >
                        <Card className="card-login">
                            <CardHeader className="card-header">
                                <h3 className="header">¡Bienvenido!</h3>
                            </CardHeader>
                            <CardBody className="card-body">
                                <FormGroup className={`has-label ${setEmailState}`}>
                                    <label className="card-label">Correo electrónico *</label>
                                    <Input
                                        className="card-input"
                                        name="email"
                                        type="email"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            if (!verifyEmail(e.target.value)) {
                                                setEmailState("has-danger");
                                            } else {
                                                setEmailState("has-success");
                                            }
                                            setEmail(e.target.value);
                                        }}
                                    />
                                    {emailState === "has-danger" ? (
                                        <label className="error">
                                            Ingresa un correo electrónico válido.
                                        </label>
                                    ) : null}
                                </FormGroup>
                                <FormGroup>
                                    <label className="card-label">Contraseña *</label>
                                    <Input
                                        className="card-input"
                                        name="password"
                                        type="password"
                                        autoComplete="off"
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </FormGroup>
                            </CardBody>
                            <CardFooter className="card-footer">
                                <div className="card-btn">
                                    <Button type="submit" className="btn-round mb-3 card-button">
                                        Iniciar Sesión
                                    </Button>
                                </div>
                                {error}
                                <p className="card-fpassword">¿Olvidaste tu contraseña?</p>
                                <FormGroup className={`has-label ${errorState}`}>
                                    {errorState === "has-danger" ? (
                                            <label className="error">{errorMessage}</label>
                                    ) : null}
                                </FormGroup>
                            </CardFooter>
                        </Card>
                    </Form>
                </Col>
            </Row>
            {alert2}
        </Container>
    ) 
}

export default Login;