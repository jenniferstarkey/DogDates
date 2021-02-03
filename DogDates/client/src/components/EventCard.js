import React from "react";
import { Link } from "react-router-dom";


export const EventCard = ({ event }) => {
    return (
        <Link to={`/event/${event.id}`}>
            <h2>
                {event.title}
            </h2>
        </Link>
    );
};
export default EventCard;