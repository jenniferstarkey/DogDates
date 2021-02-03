import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Jumbotron } from "reactstrap";
import EventCard from "../components/EventCard"
import { EventForm } from "../components/EventForm";


const ParkDetails = () => {
    const { parkId } = useParams();
    const [park, setPark] = useState([]);
    const [event, setEvent] = useState([]);

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