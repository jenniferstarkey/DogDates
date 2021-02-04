import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { Button, ModalHeader, ModalFooter, ModalBody, Modal } from "reactstrap";
import CommentForm from "./CommentForm";


const CommentList = () => {
    const { eventId } = useParams();
    const [comment, setComments] = useState([]);
    const { getCurrentUser, getToken } = useContext(UserProfileContext);
    const [pendingDelete, setPendingDelete] = useState(false);
    const history = useHistory();
    const [isEditing, setIsEditing] = useState(false);
    const [addComplete, setAddComplete] = useState(false);
    const [deleteComplete, setDeleteComplete] = useState(false);
    const [editComplete, setEditComplete] = useState(false);


    useEffect(() => {
        fetch(`/api/comment/${eventId}`)
            .then((res) => res.json())
            .then((comment) => {
                setComments(comment);
            });
    }, [addComplete, deleteComplete]);

    return (
        <div>
            <CommentForm setAddComplete={setAddComplete} addComplete={addComplete} />
            <div>

            </div>
            <div></div>{comment.map((comment) => (
                <div className="m-4" key={comment.id}>
                    <CommentCard comment={comment} setPendingDelete={setPendingDelete} pendingDelete={pendingDelete}
                        setDeleteComplete={setDeleteComplete} deleteComplete={deleteComplete} setEditComplete={setEditComplete} editComplete={editComplete} />
                </div>
            ))}

        </div>
    );
};
export default CommentList;