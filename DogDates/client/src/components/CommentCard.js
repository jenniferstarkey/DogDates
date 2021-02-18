import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
    Button, Card, ModalFooter, ModalBody, Modal, ModalHeader,
    Input, InputGroup, Form, ButtonGroup
} from "reactstrap";
import "../App.css"


const CommentCard = (props) => {
    const { getCurrentUser, getToken } = useContext(UserProfileContext);
    const [pendingDelete, setPendingDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");


    const showEdit = () => {
        setIsEditing(true);
        setContent(props.comment.content);
    }
    const hideEdit = () => {
        setIsEditing(false);
        setContent("");
    }

    const EditButton = () => {
        const user = getCurrentUser()
        if (user.id === props.comment.userProfileId) {
            return <button
                className="primary-button"
                color="info"
                onClick={showEdit}

            >🖊
            </button>
        }
        else {
            return null;
        }
    }
    const DeleteButton = () => {
        const user = getCurrentUser()
        if (user.id === props.comment.userProfileId) {
            return <button
                className="primary-button"
                color="info"
                onClick={(e) => setPendingDelete(true)}
            >✖
            </button>
        }
        else {
            return null;
        }
    }
    const deleteComment = () => {
        getToken().then((token) =>
            fetch(`/api/comment/${props.comment.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }).then(() => {
                setPendingDelete(false);
            }).then(() => {
                props.setDeleteComplete(!props.deleteComplete)

            }));

    };

    const updateComment = () => {
        const commentToEdit = { id: props.comment.id, content: content }
        getToken()
            .then((token) =>
                fetch(`/api/comment/${props.comment.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(commentToEdit)
                }))
            .then(() => {
                setIsEditing(false);
            }).then(() => {
                props.setDeleteComplete(!props.deleteComplete)
            }
            )
    }

    return (
        <>
            <Card className="post-summary__card">
                <div className="row">
                    <div className="col-lg-5 col-sm-12 py-3">
                        {isEditing ? (
                            <Form className="comment-edit-form">
                                <InputGroup>
                                    <Input onChange={(e) => setContent(e.target.value)}
                                        id="content" className="edit-input" value={content} />
                                    <br />
                                    <ButtonGroup className="comment-edit-buttons">
                                        <button
                                            className="primary-button"
                                            onClick={(e) => {
                                                updateComment(content);
                                            }}>✔</button>
                                        <button className="primary-button" onClick={hideEdit}>
                                            ✖
                                        </button>
                                    </ButtonGroup>
                                </InputGroup>
                            </Form>
                        ) : (
                                <>
                                    <div>
                                        <p className="h5">{props.comment.content}</p>
                                        <p>
                                            Posted By: {props.comment.userProfile.displayName}
                                        </p>
                                        <EditButton />
                                        <DeleteButton />
                                    </div>
                                </>
                            )}
                    </div>
                </div>
            </Card>
            <Modal isOpen={pendingDelete}>
                <ModalHeader>Delete?</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete your comment? This action cannot be
                    undone.
 </ModalBody>
                <ModalFooter>
                    <Button onClick={(e) => setPendingDelete(false)}>No, Cancel</Button>
                    <Button className="btn btn-outline-danger" onClick={deleteComment}>Yes, Delete</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default CommentCard;