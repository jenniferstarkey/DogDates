import React, { useContext, useEffect, useState } from "react";
import ParkList from "../components/ParkList";
import { UserProfileContext } from "../providers/UserProfileProvider";


const Explore = () => {
    const [parks, setParks] = useState([]);
    const { getCurrentUser, getToken } = useContext(UserProfileContext);
    useEffect(() => {
        getToken().then((token) => {
            return getParks(token);
        })
    }, []);
    const getParks = (token) => {
        return fetch(`/api/park`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((res) => res.json().then((p) => setParks(p)))
    }

    return (
        <div className="row">
            <ParkList parks={parks} />
        </div>
    )



};
export default Explore;