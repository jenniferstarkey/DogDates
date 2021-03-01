import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardBody, Card } from "reactstrap";
import { toast } from "react-toastify";

const UserProfile = () => {
    const { userId } = useParams();
    const [theUser, setTheUser] = useState([]);

    useEffect(() => {

        fetch(`api/userProfile/details/${userId}`, {
            method: "GET",
        }).then((res) => {
            if (res === 404) {
                toast.error("Looks like we can't find that user right now");
                return;
            }
            return res.json();
        }).then((theUser) => {
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
}
export default UserProfile;