import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CardBody, Card } from "reactstrap";
import { toast } from "react-toastify";
import { UserProfileContext } from "../providers/UserProfileProvider";


const UserProfile = () => {
    const { userId } = useParams();
    const [theUser, setTheUser] = useState([]);
    const { getCurrentUser, getToken } = useContext(UserProfileContext);


    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/userProfile/details/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            })
                .then((res) => {
                    return res.json()
                }))
            .then((theUser) => {
                setTheUser(theUser);
            })
    }, []);

    return (
        <>
            <h2>user profile here</h2>
            <Card>
                <CardBody>
                    <h2>{theUser.displayName}</h2>
                </CardBody>
            </Card>
        </>
    )
};
export default UserProfile;