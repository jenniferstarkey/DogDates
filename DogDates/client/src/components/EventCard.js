import React from "react";
import { Link } from "react-router-dom";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";
import formatDate from "../utils/dateFormatter";



export const EventCard = ({ event }) => {
    return (
        // <Link to={`/event/${event.id}`}>
        //     <h2>
        //         {event.title}
        //     </h2>
        // </Link>
        <Card className="summary_card">
            <CardBody>
                <CardTitle tag="h5"> <Link to={`/event/${event.id}`} >
                    {event.title}
                </Link>
                </CardTitle>
                <CardText>{formatDate(event.eventDateTime)}</CardText>
            </CardBody>
        </Card >
    );
};
export default EventCard;