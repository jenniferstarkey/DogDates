import React, { useEffect, useState, Component } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Jumbotron, Button } from "reactstrap";
import EventCard from "../components/EventCard"
import { EventForm } from "../components/EventForm";
import StarRating from "../components/StarRating";
import Rating from "../components/StarRating";
import "./ParkDetails.css"
import "../App.css"

const ParkDetails = () => {
    const { parkId } = useParams();
    const [park, setPark] = useState([]);
    const [event, setEvent] = useState([]);
    // const { getCurrentUser } = useState(UserProfileContext);
    const history = useHistory();

    useEffect(() => {
        fetch(`/api/Park/${parkId}`)
            .then((res) => {
                if (res.status === 404) {
                    toast.error("Whoops, we can't find that park");
                    return;
                }
                return res.json();
            }).then((res) => {
                setPark(res);
                setEvent(res.events);
            })
    }, []);

    if (event == undefined) {
        return null
    }
    return (
        <>
            <div className="park_header">
                <p className="park_name">{park.name}</p>
                <button className="secondary-button park_button" onClick={() => {
                    history.goBack()
                }}>Go Back</button>
            </div>
            <br /><br />
            <div>

                <Jumbotron className="details_jumbo" style={{ backgroundImage: `url('${park.parkImage}')` }}>
                </Jumbotron>
                <div className="park_details">
                    <p>{park.street} {park.city}, {park.state} {park.zipCode}</p>
                    <Rating />
                </div>
                <h2>Events</h2>
                <EventForm
                    setEvent={setEvent}
                />
                <div className="event_list">
                    {event.map(event => {
                        return <EventCard key={event.id} event={event} />
                    })}
                </div>
            </div>
        </>
    );
};
export default ParkDetails;