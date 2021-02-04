import React, { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import {
    Button, Card, CardBody, FormGroup, Form,
    Label, InputGroup, Input, Row, Col
} from "reactstrap";
const CommentForm = (props) => {
    const { eventId } = useParams();
    const { getToken } = useContext(UserProfileContext);
    const history = useHistory();
    const [content, setContent] = useState("");

    const createComment = () => {
        const comment = {
            content,
            eventId: eventId
        };
        getToken().then((token) =>
            fetch("/api/event/addComment", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            }).then(() => {
                props.setAddComplete(!props.addComplete)
                history.push(`/event/${eventId}`);
            })
        );
    };
    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <h2>Add a New Comment</h2>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label for="content">New Comment</Label>
                                <Input
                                    id="content"
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </FormGroup>
                        </Form>
                        <Row>
                            <Col></Col>
                            <Button
                                className="mr-4"
                                style={{ width: 150, height: 50 }}
                                color="success"
                                onClick={(e) => {
                                    e.preventDefault();
                                    createComment();
                                }}
                            >
                                SUBMIT
                            </Button>
                            <Button
                                style={{ width: 150, height: 50 }}
                                color="danger"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push(`/event/${eventId}`);
                                }}
                            >Cancel
                            </Button>
                            <Col></Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}

export default CommentForm;