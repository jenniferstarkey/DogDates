import React, { useContext, useEffect, useState } from "react";
import ParkList from "../components/ParkList";
import { UserProfileContext } from "../providers/UserProfileProvider";
import "./Explore.css"


const Explore = () => {
    const [parks, setParks] = useState([]);
    const [parkAdded, setParkAdded] = useState(false);

    const { getCurrentUser, getToken } = useContext(UserProfileContext);
    useEffect(() => {
        getToken().then((token) => {
            return getParks(token);
        })
    }, [parkAdded]);
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
            <ParkList parks={parks} setParkAdded={setParkAdded} parkAdded={parkAdded} />
        </div>
    )



};
export default Explore;