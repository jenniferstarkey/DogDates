import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import formatDate from "../utils/dateFormatter";
import "../App.css"



export const EventCard = ({ event }) => {
    return (
        // <Link to={`/event/${event.id}`}>
        //     <h2>
        //         {event.title}
        //     </h2>
        // </Link>
        <>
            <a href={`/event/${event.id}`}>
                <Card className="summary_card">
                    <CardBody>
                        <CardTitle tag="h5" className="h5">
                            {event.title}
                        </CardTitle>
                        <CardText className="sub_text">{formatDate(event.eventDateTime)}</CardText>
                    </CardBody>
                </Card >
            </a>
        </>
    );
};
export default EventCard;