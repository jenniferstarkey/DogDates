import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "../providers/UserProfileProvider";
import ParkSummary from "./ParkSummary";

const ParkFavoriteList = () => {
    const { userId } = useParams();
    const [favorite, setFavorites] = useState([]);
    const { getToken, getCurrentUser } = useContext(UserProfileContext);
    const [deletedPark, setDeletedPark] = useState(false);


    useEffect(() => {
        getToken().then((token) => {
            return getMyFavorites(token)
        })
    }, [deletedPark])
    const user = getCurrentUser();
    const getMyFavorites = (token) => {
        return fetch(`/api/parkFavorites/${user.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((res) => res.json()
            .then((favorite) => setFavorites(favorite)))
    };

    return (
        <div>
            <h2>My Park Favorites</h2>
            {favorite.map((favorite) => (
                <div key={favorite.id}>
                    <ParkSummary key={favorite.id} park={favorite.favoritedPark} setDeletedPark={setDeletedPark} deletedPark={deletedPark} />
                </div>
            ))}

        </div>
    )
};
export default ParkFavoriteList;