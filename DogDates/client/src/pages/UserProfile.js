import React from "react";
import { useParams } from "react-router-dom";

const { userId } = useParams();

const viewUser = () => {
    const id = user.id
    fetch(`api/userProfile/${userId}`, {
        method: "GET",
    }).then((res) => {
        if (res === 404) {
            toast.error("Looks like we can't find that user right now");
            return;
        }
        return res.json();
    })
}
const user = viewUser.id;