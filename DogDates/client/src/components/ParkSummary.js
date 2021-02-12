import React, { useEffect, useState, useContext } from "react";
import { Card, Button, CardImg, CardBody, CardTitle, CardText, Row, Col, Container } from "reactstrap";
import "./ParkSummary.css"
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";


const ParkSummary = ({ park, setParkAdded, parkAdded, deletedPark, setDeletedPark }) => {


    //Get the parks
    //Check if favorite
    //If favorite, display unfavorite button
    //If not, dispaly favorite button

    const [parks, setParks] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const { getCurrentUser, getToken } = useContext(UserProfileContext);



    const addFavorite = (favoritePark) => {
        const user = JSON.parse(localStorage.getItem("userProfile"))
        const favToAdd = { parkId: favoritePark, userProfileId: user.id };

        getToken().then((token) =>

            fetch(`api/parkfavorites/addfavorite`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(favToAdd),
            }).then((parks) => setParkAdded(!parkAdded))
        );

    };
    const deleteFavorite = (favorite) => {
        const user = JSON.parse(localStorage.getItem("userProfile"))
        const favToDelete = { parkId: favorite, userProfileId: user.id };
        getToken().then((token) =>
            fetch(`api/parkfavorites/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(favToDelete),
            }

            ).then((parks) => setDeletedPark(!deletedPark))

        );
    };


    return (
        <Card className="summary_card">
            <CardImg top width="100%" src={`${park.parkImage})`} alt="Park Image" />
            <CardBody>
                <CardTitle tag="h5"> <Link to={`/park/${park.id}`}>
                    {park.name}
                </Link>
                </CardTitle>
                <CardText>
                    <p>{park.city}, {park.state}</p>
                </CardText>
                <CardText>
                    {park.isFavorited == true || park.isFavorited == null ?
                        <button className="secondary_button" color="E2BACD" onClick={(e) => deleteFavorite(park.id)}>Remove from favorites</button> :
                        <button className="primary_button" onClick={(e) => addFavorite(park.id)}>Favorite</button>
                    }
                </CardText>
            </CardBody>

        </Card >

    )
};
export default ParkSummary;



//If current user id does not match park favorite user profile id, then show fav button
//if current user id does match park favorite user profile id, then show remove button