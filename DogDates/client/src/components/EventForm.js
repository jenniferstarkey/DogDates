import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
    Button, Form, Input, Card, CardBody, FormGroup, Label, CardTitle
} from "reactstrap";


export const EventForm = (props) => {
    const { parkId } = useParams();
    const { getToken } = useContext(UserProfileContext);
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [eventDateTime, setEventDateTime] = useState("");


    const addEvent = () => {
        const newEvent = {
            title,
            details,
            eventDateTime,
            parkId: parkId
        };

        getToken()
            .then((token) =>
                fetch("/api/park/addEvent", {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/JSON",
                    },
                    body: JSON.stringify(newEvent),
                })
            )
            .then(() => {
                getToken()
            }).then((token) =>
                fetch(`/api/park/${newEvent.parkId}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

            ).then((res) => res.json()).then((park) => {
                props.setEvent(park.events)
            }
            );

    };
    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="Title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    name="Title"
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="Details">Details</Label>
                                <Input
                                    id="details"
                                    type="text"
                                    name="Details"
                                    onChange={(e) => setDetails(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="eventDateTime">Event Date</Label>
                                <Input
                                    id="eventDateTime"
                                    type="date"
                                    name="EventDateTime"
                                    onChange={(e) => setEventDateTime(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <Button
                            color="danger"
                            onClick={(e) => {
                                e.preventDefault();
                                addEvent();
                            }}
                        >
                            SUBMIT POST
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>

    )
};
export default EventForm;