import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "../providers/UserProfileProvider";
import EventCard from "./EventCard";

const EventFavoriteList = () => {
    const { userId } = useParams();
    const [favoriteEvents, setFavoriteEvents] = useState([]);
    const { getToken, getCurrentUser } = useContext(UserProfileContext);

    useEffect(() => {
        getToken().then((token) => {
            return getMyFavorites(token)
        })
    }, [])
    const user = getCurrentUser();
    const getMyFavorites = (token) => {
        return fetch(`/api/eventFavorites/${user.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        }).then((res) => res.json()
            .then((favoriteEvents) => setFavoriteEvents(favoriteEvents)))
    };

    return (
        <div>
            <h2>My Saved Events</h2>
            {favoriteEvents.map((event) => (
                <div key={event.id}>
                    <EventCard key={event.id} event={event} />
                </div>
            ))}

        </div>
    )
};
export default EventFavoriteList;