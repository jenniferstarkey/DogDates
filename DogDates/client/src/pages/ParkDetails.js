import React, { useEffect, useState, Component } from "react";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Jumbotron, Button } from "reactstrap";
import EventCard from "../components/EventCard"
import { EventForm } from "../components/EventForm";
import StarRating from "../components/StarRating";
import Paws from "../components/Stars";

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
        <div>
            <Button onClick={() => {
                history.goBack()
            }}>Go Back</Button>
            <Paws />
            {/* <div className="actions">
                <button type="submit" onClick={this.saveRating}>
                    Submit Rating
                </button>
            </div> */}
            <Jumbotron style={{ backgroundImage: `url('${park.parkImage}')` }}>
            </Jumbotron>
            <div className="container">
                <h1>{park.name}</h1>
                <p>{park.street} {park.city}, {park.state} {park.zipCode}</p>
            </div>
            <div>
                <h2>Events</h2>
                <EventForm
                    setEvent={setEvent}
                />
                {event.map(event => {
                    return <EventCard key={event.id} event={event} />
                })}
            </div>
        </div>
    );
};
export default ParkDetails;