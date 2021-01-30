import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input, Container, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css";
import { toast } from 'react-toastify';
import "toastify-js/src/toastify.css";


const Login = () => {
    const { login } = useContext(UserProfileContext);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        login(email, password)
            .then((user) => {
                setLoading(false);
                toast.info(`Welcome back ${user.displayName}`);
                history.push("/");
            })
            .catch((err) => {
                setLoading(false);
                toast.error("Invalid email or password");
            });
    };

    return (
        <Container>
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    {/* <div className="avatar bg-primary"> */}
                    <img src="/DD_logo.png" />
                    {/* </div> */}
                    <h2 className="text-center">Sign in to your account</h2>
                    <div className="form-group">
                        <Input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            required="required"
                        />
                    </div>
                    <div className="form-group">
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="form-control"
                            name="password"
                            placeholder="Password"
                            required="required"
                        />
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col xs="auto">
                                <button type="submit" className="primaryButton" disabled={loading}>
                                    Sign in
                                </button></Col>
                            <Col xs="auto">
                                <button className="primaryButton"><Link to="/register">Sign up here</Link></button>
                            </Col>
                        </Row>
                    </div>
                </form>
            </div >

        </Container>
    );
};

export default Login;