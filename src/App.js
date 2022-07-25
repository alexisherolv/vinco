import React from "react";
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles/footer.css";
import "./styles/login.css";
import "./styles/main.css";
import "./styles/navbar.css";
import "./styles/dashboard.css";

import Login from "./pages/Login";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
    
    return(
        <div className="page">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Redirect to = {Login} />
                </Switch>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App;
