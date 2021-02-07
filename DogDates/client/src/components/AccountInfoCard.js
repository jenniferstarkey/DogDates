import React, { useContext, useState, useEffect } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";


const AccountInfo = () => {
    const { getCurrentUser, getToken } = useContext(UserProfileContext);
    const [userProfile, setUserProfile] = useState();


    return (
        <>
            <h2>My Account</h2>
            {/* <p>{userProfile.displayName}</p> */}
        </>
    )

}
export default AccountInfo;