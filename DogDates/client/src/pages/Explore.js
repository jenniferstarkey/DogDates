import React, { useContext, useEffect, useState } from "react";
import ParkList from "../components/ParkList";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Explore.css"


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
    }, [parkAdded, deletedPark]);

    const getParks = (token) => {
        return fetch(`/api/park`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json().then((p) => setParks(p)))
    }

    return (
        <div className="park_explore">
            <h2>Explore Parks</h2>
            <label className="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
            </label>

            <ParkList parks={parks} setParkAdded={setParkAdded} parkAdded={parkAdded} setDeletedPark={setDeletedPark} deletedPark={deletedPark} />
        </div>
    )



};
export default Explore;