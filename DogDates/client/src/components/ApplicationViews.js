import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Explore from "../pages/Explore";
import ParkDetails from "../pages/ParkDetails";
import EventDetails from "../pages/EventDetails";


const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <p>Home</p> : <Redirect to="/login" />}
            </Route>
            <Route path="/explore" exact>
                {isLoggedIn ? <Explore /> : <Redirect to="/login" />}
            </Route>
            <Route path="/park/:parkId(\d+)" >
                {isLoggedIn ? <ParkDetails /> : <Redirect to="/login" />}
            </Route>
            <Route path="/event/:eventId(\d+)" >
                {isLoggedIn ? <EventDetails /> : <Redirect to="/login" />}
            </Route>


            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>

        </Switch>
    );
};

export default ApplicationViews;