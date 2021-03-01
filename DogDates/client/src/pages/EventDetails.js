import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { toast } from "react-toastify";
import EventCard from "../components/EventCard";
import { UserProfileContext } from "../providers/UserProfileProvider";
import formatDate from "../utils/dateFormatter";
import { Spinner, Card, CardBody, FormGroup } from "reactstrap";
import CommentList from "../components/CommentList";
import "../App.css"

import {
    Button,
    Form, Input,
    InputGroup, ButtonGroup,
    Modal, ModalBody,
    ModalFooter, ModalHeader
} from "reactstrap";

const EventDetails = ({ }) => {
    const { getCurrentUser, getToken } = useContext(UserProfileContext);
    const [events, setEvents] = useState([]);
    const [theEvent, setTheEvent] = useState([]);
    const { eventId } = useParams();
    const [pendingDelete, setPendingDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const history = useHistory();
    const [eventSaved, setEventSaved] = useState(false);

    const addSavedEvent = (savedEvent) => {
        const user = JSON.parse(localStorage.getItem("userProfile"))
        const eventToSave = { eventId: savedEvent, userProfileId: user.id };

        getToken().then((token) =>
            fetch(`/api/eventfavorites/addfavorite`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(eventToSave),
            }).then((events) => setEventSaved(!eventSaved)),

        );

    };
    const deleteSavedEvent = (event) => {
        const user = JSON.parse(localStorage.getItem("userProfile"))
        const eventToDelete = { eventId: event, userProfileId: user.id };

        getToken().then((token) =>
            fetch(`/api/eventfavorites/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(eventToDelete),
            }

            ).then((events) => setEventSaved(!eventSaved))

        );
    };
    const viewUser = () => {
        const id = user.id
        fetch(`api/userProfile/${id}`, {
            method: "GET",
        }).then((res) => {
            if (res === 404) {
                toast.error("Looks like we can't find that user right now");
                return;
            }
            return res.json();
        })
    }
    const user = viewUser.id;

    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/event/${eventId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then((res) => {
                    if (res === 404) {
                        toast.error("Whoops, we cant find that event");
                        return;
                    }
                    return res.json();
                }))
            .then((theEvent) => {
                setTheEvent(theEvent);
            });
    }, [eventSaved]);

    const handleChange = (e) => {
        const stateToChange = { ...theEvent }
        stateToChange[e.target.id] = e.target.value;
        setTheEvent(stateToChange)
    }
    const showEdit = () => {
        setIsEditing(true);
        setTheEvent(theEvent);
    }
    const hideEdit = () => {
        setIsEditing(false);
        setTheEvent("");
    }
    const updateEvent = () => {
        const user = JSON.parse(localStorage.getItem("userProfile"))
        const eventToUpdate = {
            id: theEvent.id, userProfileId: user.id, title: theEvent.title,
            details: theEvent.title, eventDateTime: theEvent.eventDateTime,
            parkId: theEvent.parkId, createdDateTime: theEvent.createdDateTime
        };
        getToken()
            .then((token) =>
                fetch(`/api/event/${eventId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(eventToUpdate)
                }))
            .then(() => {
                setIsEditing(false);

            })
    }
    const deleteEvent = () => {
        const eventToDelete = { id: theEvent.id }
        getToken().then((token) =>
            fetch(`/api/event/${theEvent.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(eventToDelete)
            }).then(() => {
                setPendingDelete(false);
            }).then(() => history.push(`/explore`))
        )
    }
    const EditButton = () => {
        const user = getCurrentUser();
        if (user.id === theEvent.userProfile.id) {
            return <button
                className="secondary-button"
                color="info"
                onClick={showEdit}

            >Edit My DogDate
                    </button>
        }
        else {
            return null;
        }
    }
    const DeleteButton = () => {
        const user = getCurrentUser()
        if (user.id === theEvent.userProfile.id) {
            return <button
                className="secondary-button"
                color="info"
                onClick={(e) => setPendingDelete(true)}
            >Delete My DogDate
                    </button>
        }
        else {
            return null;
        }
    }
    if (theEvent.userProfile == undefined) {
        return <Spinner className="app-spinner dark" />
    }
    else {
        return (
            <>
                {/* {/* <div className="container pt-4"> */}
                <div className="container pt-4">

                    <div className="row justify-content-center">
                        {/* If user is editing */}
                        {isEditing ? (
                            <Card className="col-sm-12 col-lg-6 form">
                                <CardBody>
                                    <Form className="w-100">
                                        <InputGroup>
                                            <FormGroup>
                                                <Input size="" onChange={(e) => handleChange(e)}
                                                    value={theEvent.title} id="title" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input size="" onChange={(e) => handleChange(e)}
                                                    value={theEvent.details} id="details" />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input type="date" size="sm" onChange={(e) => handleChange(e)}
                                                    value={theEvent.eventDateTime} id="eventDateTime" />
                                            </FormGroup>
                                        </InputGroup>
                                    </Form>
                                    <ButtonGroup size="">
                                        <Button onClick={updateEvent}>Save</Button>
                                        <Button outline color="danger" onClick={hideEdit}>
                                            Cancel
                </Button>
                                    </ButtonGroup>
                                </CardBody>
                            </Card>
                        ) : (
                                // If user is not editing
                                <>
                                    <Card>
                                        <CardBody>
                                            <a href={`/userprofile/details/${theEvent.userProfile.id}`}>
                                                {/* <Link to={`/userProfile/${user}`}> */}
                                                <img
                                                    src={theEvent.userProfile.profileImage}
                                                    alt={theEvent.userProfile.displayName}
                                                    className="park-details__avatar rounded-circle"
                                                />
                                            </a>
                                            <div>
                                                {theEvent.userProfile.displayName}
                                            </div>
                                            <br />
                                            <h2> {theEvent.title}</h2>
                                            <p>{theEvent.details}<br />
                                                {theEvent.eventDateTime == undefined ? null : formatDate(theEvent.eventDateTime)}<br />
                                            </p>

                                            {theEvent.isFavorited == true || theEvent.isFavorited == null ?
                                                <button className="secondary_button" color="E2BACD" onClick={(e) => deleteSavedEvent(theEvent.id)}>Remove from saved events</button> :
                                                <button className="primary_button" onClick={(e) => addSavedEvent(theEvent.id)} setEventSaved={true}>Save Event</button>
                                            }
                                            <br />
                                            <EditButton />

                                            <DeleteButton />
                                        </CardBody>
                                    </Card>                                </>
                            )}
                        <Modal isOpen={pendingDelete}>
                            <ModalHeader>Delete {theEvent.title}?</ModalHeader>
                            <ModalBody>
                                Are you sure you want to delete your event <strong>{theEvent.title}</strong>? This action cannot be
          undone.
        </ModalBody>
                            <ModalFooter>
                                <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                                <Button onClick={deleteEvent} className="btn btn-outline-danger">Yes, Delete</Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                    <div>
                        <CommentList />
                    </div>
                </div >
            </>
        )
    }
};
export default EventDetails;