import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css"

const Register = () => {
    const { register } = useContext(UserProfileContext);
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [bio, setBio] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [confirm, setConfirm] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirm) {
            //toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        const profile = {
            firstName,
            lastName,
            displayName,
            email,
            city,
            state,
            zipCode,
            bio,
            profileImage,
        };
        register(profile, password)
            .then((user) => {
                setLoading(false);
                //toast.info(`Welcome ${user.displayName}`);
                history.push("/");
            })
            .catch((err) => {
                setLoading(false);
                //toast.error("Invalid email");
            });
    };

    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <div className="avatar bg-primary">
                    {/* <img src="/quill.png" alt="Avatar" /> */}
                </div>
                <h2 className="text-center">User Register</h2>
                <div className="form-group">
                    <Input
                        onChange={(e) => setFirstName(e.target.value)}
                        type="text"
                        className="form-control"
                        name="firstName"
                        placeholder="First Name"
                        required="required"
                    />
                </div>
                <div className="form-group">
                    <Input
                        onChange={(e) => setLastName(e.target.value)}
                        type="text"
                        className="form-control"
                        name="lastName"
                        placeholder="Last Name"
                        required="required"
                    />
                </div>
                <div className="form-group">
                    <Input
                        onChange={(e) => setDisplayName(e.target.value)}
                        type="text"
                        className="form-control"
                        name="displayName"
                        placeholder="Display Name"
                        required="required"
                    />
                </div>
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
                        onChange={(e) => setCity(e.target.value)}
                        type="text"
                        className="form-control"
                        name="city"
                        placeholder="City"
                        required="required"
                    />
                </div>
                <div className="form-group">
                    <Input
                        onChange={(e) => setState(e.target.value)}
                        type="text"
                        className="form-control"
                        name="state"
                        placeholder="State"
                        required="required"
                    />
                </div>
                <div className="form-group">
                    <Input
                        onChange={(e) => setZipCode(e.target.value)}
                        type="numbers"
                        className="form-control"
                        name="zipCode"
                        placeholder="Zip Code"
                        required="required"
                    />
                </div>
                <div className="form-group">
                    <Input
                        onChange={(e) => setBio(e.target.value)}
                        type="text"
                        className="form-control"
                        name="bio"
                        placeholder="Bio"
                        required="required"
                    />
                </div>
                <div className="form-group">
                    <Input
                        onChange={(e) => setProfileImage(e.target.value)}
                        type="text"
                        className="form-control"
                        name="profileImage"
                        placeholder="Profile Image"
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
                    <Input
                        onChange={(e) => setConfirm(e.target.value)}
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        required="required"
                    />
                </div>
                <div className="form-group">
                    <Button type="submit" block color="danger" disabled={loading}>
                        Sign Up
          </Button>
                </div>
                <div className="text-center small">
                    Already have an account?
          <div>
                        <Link to="/login">Log in here</Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Register;
