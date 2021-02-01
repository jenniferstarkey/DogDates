import React from "react";


export const EventCard = ({ event }) => {
    return (
        <div>
            <h2>Events</h2>
            <div>
                {event.title}
            </div>
            <p>{ }</p>
        </div>
    )
};
export default EventCard;