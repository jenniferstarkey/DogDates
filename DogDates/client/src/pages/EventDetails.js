import userEvent from "@testing-library/user-event";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EventCard from "../components/EventCard";
import { UserProfileContext } from "../providers/UserProfileProvider";

const EventDetails = () => {
    const { getCurrentUser } = useContext(UserProfileContext);
    const [theEvent, setTheEvent] = useState([]);
    const { eventId } = useParams();
    const user = getCurrentUser();


    useEffect(() => {
        fetch(`/api/event/${eventId}`)
            .then((res) => {
                if (res === 404) {
                    toast.error("Whoops, we cant find that event");
                    return;
                }
                return res.json();
            })
            .then((theEvent) => {
                setTheEvent(theEvent);
            });
    }, []);

    // const verifyUser = (_) => {
    //     if (user.id === theEvent.userProfileId) {
    //         return true;
    //     }
    //     return false;
    // }
    return (
        <div>
            <h2> {theEvent.title}</h2>
            <p>{theEvent.details}</p>
        </div>
    )
};
export default EventDetails;