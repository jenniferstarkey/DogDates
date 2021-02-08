import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Card, Row, Col, CardImg, CardText, Button, Form, Input, CardBody, ButtonGroup, FormGroup, Label } from "reactstrap";

import { UserProfileContext } from "../providers/UserProfileProvider";


const AccountInfo = (props) => {
    const { getCurrentUser, getToken } = useContext(UserProfileContext);
    const [userProfile, setUserProfile] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const user = getCurrentUser();

    const handleChange = (e) => {
        const stateToChange = { ...userProfile }
        stateToChange[e.target.id] = e.target.value;
        setUserProfile(stateToChange)
    }

    const showEdit = () => {
        setIsEditing(true);
        setUserProfile(userProfile);
    }
    const hideEdit = () => {
        setIsEditing(false);
        setUserProfile("");
    }
    const EditButton = () => {
        const user = getCurrentUser()
        if (user.id === user.id) {
            return <Button
                className="account-edit mt-5  mr-3 px-1"
                onClick={showEdit}

            >Edit Profile
                    </Button>
        }
        else {
            return null;
        }
    }
    const updateAccount = () => {
        const user = getCurrentUser();
        // const accountToEdit = { id: user.id }
        getToken()
            .then((token) =>
                fetch(`/api/userprofile/${user.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify()
                }))
            .then(() => {
                setIsEditing(false);
            })
    }

    return (
        <>
            <div className="container">
                <h1 className="text-center">My Account</h1>
                <div className="flex align-self-center w-75 mx-auto text-left">
                    <Card className=" border-0">
                        {isEditing ? (
                            <Card>
                                <CardBody>
                                    <Form className="w-100">
                                        <FormGroup>
                                            <Label for="profileImage">Profile Image</Label>
                                            <Input size="sm" onChange={(e) => handleChange(e)}
                                                defaultValue={user.profileImage} id="profileImage" value={userProfile.profileImage} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="displayName">Display Name</Label>
                                            <Input size="sm" onChange={(e) => handleChange(e)}
                                                defaultValue={user.displayName} id="displayName" value={userProfile.displayName} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="email">My Email</Label>
                                            <Input size="sm" onChange={(e) => handleChange(e)}
                                                defaultValue={user.email} id="email" value={userProfile.email} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="First Name">First Name</Label>
                                            <Input size="sm" onChange={(e) => handleChange(e)}
                                                defaultValue={user.firstName} id="FirstName" value={userProfile.firstName} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="lastName">Last Name</Label>
                                            <Input size="sm" onChange={(e) => handleChange(e)}
                                                defaultValue={user.lastName} id="lastName" value={userProfile.lastName} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="city">City</Label>
                                            <Input size="sm" onChange={(e) => handleChange(e)}
                                                defaultValue={user.city} id="city" value={userProfile.city} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="state">State</Label>
                                            <Input size="sm" onChange={(e) => handleChange(e)}
                                                defaultValue={user.state} id="state" value={userProfile.state} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="zipCode">Zip Code</Label>
                                            <Input size="sm" onChange={(e) => handleChange(e)}
                                                defaultValue={user.zipCode} id="zipCode" value={userProfile.zipCode} />
                                        </FormGroup>
                                        <FormGroup>
                                            <Label for="bio">Bio</Label>
                                            <Input size="sm" onChange={(e) => handleChange(e)}
                                                defaultValue={user.bio} id="bio" value={userProfile.bio} />
                                        </FormGroup>

                                        <ButtonGroup size="sm">
                                            <Button onClick={(e) => {
                                                updateAccount(userProfile);
                                            }}>Save</Button>
                                            <Button outline color="danger" onClick={hideEdit}>
                                                Cancel
                </Button>
                                        </ButtonGroup>
                                    </Form>

                                </CardBody>
                            </Card>


                        ) : (

                                <Row>
                                    <Col s="12" md="4">
                                        <CardImg src={user.profileImage} />
                                    </Col>
                                    <Col s="12" md="6" className="mt-5">
                                        <CardText>Username: {user.displayName}</CardText>
                                        <CardText>Email: {user.email}</CardText>
                                        <CardText>First Name: {user.firstName}</CardText>
                                        <CardText>Last Name: {user.lastName}</CardText>
                                        <CardText>City: {user.city}</CardText>
                                        <CardText>State: {user.state}</CardText>
                                        <CardText>Zip Code: {user.zipCode}</CardText>
                                        <CardText>Bio: {user.bio}</CardText>
                                        <EditButton />
                                    </Col>
                                </Row>
                            )}
                    </Card>
                </div>
            </div>
        </>
    )

}
export default AccountInfo;