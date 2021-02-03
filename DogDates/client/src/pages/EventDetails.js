import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import EventCard from "../components/EventCard";
import { UserProfileContext } from "../providers/UserProfileProvider";
import formatDate from "../utils/dateFormatter";
import {
    Button,
    Form, Input,
    InputGroup, ButtonGroup,
    Modal, ModalBody,
    ModalFooter, ModalHeader
} from "reactstrap";

const EventDetails = (event) => {
    const { getCurrentUser, getToken } = useContext(UserProfileContext);
    const [theEvent, setTheEvent] = useState([]);
    const { eventId } = useParams();
    const [pendingDelete, setPendingDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const history = useHistory();



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
        getToken()
            .then((token) =>
                fetch(`/api/event/${eventId}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(theEvent)
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
        const user = getCurrentUser()
        if (user.id === theEvent.userProfileId) {
            return <Button
                className="mt-5  mr-3 px-1"
                color="info"
                onClick={showEdit}

            >Edit Event
                    </Button>
        }
        else {
            return null;
        }
    }
    const DeleteButton = () => {
        const user = getCurrentUser()
        if (user.id === theEvent.userProfileId) {
            return <Button
                className="mt-5  mr-3 px-1"
                color="info"
                onClick={(e) => setPendingDelete(true)}
            >Delete Event
                    </Button>
        }
        else {
            return null;
        }
    }

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                {/* If user is editing */}
                {isEditing ? (
                    <Form className="w-100">
                        <InputGroup>
                            <Input size="sm" onChange={(e) => handleChange(e)}
                                value={theEvent.title} id="title" />
                            <Input size="sm" onChange={(e) => handleChange(e)}
                                value={theEvent.details} id="details" />
                            <Input type="date" size="sm" onChange={(e) => handleChange(e)}
                                value={theEvent.eventDateTime} id="eventDateTime" />
                            <ButtonGroup size="sm">
                                <Button onClick={updateEvent}>Save</Button>
                                <Button outline color="danger" onClick={hideEdit}>
                                    Cancel
                </Button>
                            </ButtonGroup>
                        </InputGroup>
                    </Form>
                ) : (
                        // If user is not editing
                        <><div>
                            <h2> {theEvent.title}</h2>
                            <p>{theEvent.details}<br />
                                {formatDate(theEvent.eventDateTime)}<br />
                            </p>
                            <div>
                                {/* {theEvent.userProfile.displayName} */}
                            </div>
                            <EditButton />
                            <DeleteButton />
                        </div>
                        </>
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
        </div>
    )
};
export default EventDetails;