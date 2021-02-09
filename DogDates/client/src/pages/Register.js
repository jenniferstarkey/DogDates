import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Login.css"
import { toast } from "react-toastify";
import "toastify-js/src/toastify.css";

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
    const [imageLoading, setImageLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
    }
    if (password !== confirm) {
        toast("Oops, try another password");
        return;
    }
    const uploadImage = async e => {
        const files = e.target.files
        setImageLoading(true)
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'b94rzefr')
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/dogdates/image/upload/',
            {
                method: "POST",
                body: data
            }
        )
        const file = await res.json()
        let image = file.secure_url
        localStorage.setItem("image", image)

        setImageLoading(false)
        const matches = document.querySelectorAll(".hidden");
        for (const m of matches) {
            m.style.display = "block"
        }
        const submit = document.querySelector(".submitContainer");
        submit.style.display = "flex"
        document.querySelector(".notHidden").style.display = "none"
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


    return (
        <div className="login-form">
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">User Register</h2>
                <div className="form-group uploadForm">

                    <div className='defaultImageContainer'>
                        <img className='defaultImage-register' src={localStorage.image ? localStorage.image : 'https://build.dfomer.com/wp-content/uploads/2016/04/dummy-post-horisontal-thegem-blog-default.jpg'} />
                    </div>

                    {imageLoading ? (
                        <h6 className="loadingImage">Loading...</h6>
                    ) : <></>}


                    <br />
                    <label htmlFor="embedpollfileinput" className="btn dangerBtn notHidden uploadButton">
                        Upload image
                </label>
                    <input hidden type="file" onChange={uploadImage} className="inputfile" id="embedpollfileinput" />

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
                    {/* <div className="form-group">
                        <Input
                            // onChange={(e) => setProfileImage(e.target.value)}
                            type="file"
                            className="form-control"
                            name="profileImage"
                            placeholder="Profile Image"
                            required="required"
                            onChange={(e) => { uploadImage(e.target.files) }}
                        />
                    </div> */}
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
                        <Button type="submit" block color="danger" disabled={loading} >
                            Sign Up
                    </Button>
                    </div>
                    <div className="text-center small">
                        Already have an account?
                    <div>
                            <Link to="/login">Log in here</Link>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
};

export default Register;
