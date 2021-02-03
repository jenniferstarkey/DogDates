import React from "react";
import { Link } from "react-router-dom";
import { Card } from "reactstrap";
import formatDate from "../utils/dateFormatter";

const CommentCard = ({ comment }) => {
    console.log(comment)
    return (
        <Card className="post-summary__card">
            <div className="row">
                <div className="col-lg-5 col-sm-12 py-3">
                    <div>
                        <h2>{comment.userProfile.displayName}</h2>
                        <p>
                            {comment.content}
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}
export default CommentCard;