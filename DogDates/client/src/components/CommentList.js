import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";

const CommentList = () => {
    const { eventId } = useParams();
    const [comment, setComments] = useState([]);


    useEffect(() => {
        fetch(`/api/comment/${eventId}`)
            .then((res) => res.json())
            .then((comment) => {
                setComments(comment);
            });
    }, []);

    return (
        <div>
            {comment.map((comment) => (
                <div className="m-4" key={comment.id}>
                    <CommentCard comment={comment} />
                </div>
            ))}
        </div>
    );
};
export default CommentList;