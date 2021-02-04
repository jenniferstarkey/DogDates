import React, { useContext, useEffect, useState } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
    Button, Card, ModalFooter, ModalBody, Modal, ModalHeader,
    Input, InputGroup, Form, ButtonGroup
} from "reactstrap";


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
            return <Button
                className="mt-5  mr-3 px-1"
                color="info"
                onClick={showEdit}

            >Edit Comment
                    </Button>
        }
        else {
            return null;
        }
    }
    const DeleteButton = () => {
        const user = getCurrentUser()
        if (user.id === props.comment.userProfileId) {
            return <Button
                className="mt-5  mr-3 px-1"
                color="info"
                onClick={(e) => setPendingDelete(true)}
            >Delete Comment
                    </Button>
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
                            <Form className="w-100">
                                <InputGroup>
                                    <Input size="sm" onChange={(e) => setContent(e.target.value)}
                                        id="content" value={content} />

                                    <ButtonGroup size="sm">
                                        <Button onClick={(e) => {
                                            updateComment(content);
                                        }}>Save</Button>
                                        <Button outline color="danger" onClick={hideEdit}>
                                            Cancel
                </Button>
                                    </ButtonGroup>
                                </InputGroup>
                            </Form>
                        ) : (
                                <>
                                    <div>
                                        <h2>{props.comment.userProfile.displayName}</h2>
                                        <p>
                                            {props.comment.content}
                                        </p>
                                        <DeleteButton />
                                        <EditButton />
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