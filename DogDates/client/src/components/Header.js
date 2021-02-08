import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
} from "reactstrap";
import { UserProfileContext } from "../providers/UserProfileProvider";

const AppHeader = () => {
    const { logout, isAdmin } = useContext(UserProfileContext);
    const user = JSON.parse(localStorage.getItem("userProfile"));
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const logoutAndReturn = () => {
        return logout().then(() => {
            toast.dark("You are now logged out");
            history.push("/login");
        });
    };

    return (
        <div>
            <Navbar color="faded" light>
                <NavbarBrand tag={Link} to="/">
                    <img
                        id="header-logo"
                        src="/DD_icon.png"
                        width="30"
                        height="30"
                        className="mr-1"
                        alt="DogDates Logo"
                    />
                </NavbarBrand>
                {user ? (
                    <NavbarText className="d-sm-none d-md-block">
                        Hey there, {user.displayName}
                    </NavbarText>
                ) : null}
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        {user ? (
                            <>
                                <NavItem>
                                    <NavLink to="/explore" tag={Link}>
                                        Explore
                        </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink to="/myAccount" tag={Link}>
                                        My Account
                                        </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink onClick={logoutAndReturn}>Logout</NavLink>
                                </NavItem>
                            </>
                        ) : (
                                <>
                                    <NavItem>
                                        <NavLink to="/login" tag={Link}>
                                            Login
                  </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink to="/register" tag={Link}>
                                            Register
                  </NavLink>
                                    </NavItem>
                                </>
                            )}
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );
};

export default AppHeader;
