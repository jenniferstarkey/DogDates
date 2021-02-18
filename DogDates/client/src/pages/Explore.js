import React, { useContext, useEffect, useState } from "react";
import ParkList from "../components/ParkList";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Explore.css"
import "../App.css"


const Explore = () => {
    const [parks, setParks] = useState([]);
    const [parkAdded, setParkAdded] = useState(false);
    const [deletedPark, setDeletedPark] = useState(false);
    const [isToggled, setToggled] = useState(false);
    const { getCurrentUser, getToken } = useContext(UserProfileContext);
    const toggleTrueFalse = () => setToggled(!isToggled);

    useEffect(() => {
        getToken().then((token) => {
            return getParks(token);
        })
    }, [parkAdded, deletedPark, isToggled]);

    const getParks = (token) => {
        return fetch(`/api/park?q=${isToggled}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json().then((p) => setParks(p)))
    }
    const toggler = () => {
        isToggled ? setToggled(false) : setToggled(true)
    }

    return (
        <>
            <div className="park_explore">
                <div className="park_header">
                    <h2>Explore Parks</h2>
                    <label className="switch">
                        <input type="checkbox" onClick={toggler} />
                        <span class="slider round"
                        ><p className="toggle_text">Near<br />Me</p></span>
                    </label>
                </div>

                <div>
                    <ParkList parks={parks} setParkAdded={setParkAdded} parkAdded={parkAdded} setDeletedPark={setDeletedPark} deletedPark={deletedPark} />
                </div>
            </div>
        </>
    )
};
export default Explore;