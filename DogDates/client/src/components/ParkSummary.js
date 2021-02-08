import React, { useEffect, useState, useContext } from "react";
import { Card, Button, CardImg, CardBody, CardTitle, CardText } from "reactstrap";
import "./ParkSummary.css"
import { Link } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";


const ParkSummary = ({ park }) => {


    //Get the parks
    //Check if favorite
    //If favorite, display unfavorite button
    //If not, dispaly favorite button

    const [parks, setParks] = useState([]);
    const [favorite, setFavorite] = useState([]);
    const { getCurrentUser, getToken } = useContext(UserProfileContext);

    useEffect(() => {
        fetch(`/api/park`)
            .then((res) => res.json())
            .then((parks) => {
                setParks(parks);
            });
    }, []);
    const addFavorite = (park) => {
        getToken().then((token) =>
            fetch(`api/parkfavorites/addfavorite`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(favorite),
            }).then(parks)
        );
    };
    const deleteFavorite = (favorite) => {
        const favToDelete = { id: favorite.id }
        getToken().then((token) =>
            fetch(`api/parkfavorites/${favorite.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(favorite),
            }
            )
        ).then(parks);
    };
    const checkFavorite = () => {
        const user = getCurrentUser();

        if (user.id == favorite.userProfileId) {
            return <button className="secondary_button" color="E2BACD" onClick={(e) => deleteFavorite()}>Remove from favorites</button>
        }
        else {
            return <button className="primary_button" onClick={(e) => addFavorite()}>Favorite</button>
        }
    }

    return (
        <Card className="summary_card">
            <CardImg top width="100%" src={`${park.parkImage})`} alt="Park Image" />
            <CardBody>
                <CardTitle tag="h5" link to={`/park/${park.id}`}>
                    {park.name}
                </CardTitle>
                <CardText>
                    <p>{park.city}, {park.state}</p>
                </CardText>
                <CardText>
                    <small className="text-muted"> {checkFavorite()}</small>
                </CardText>

            </CardBody>
        </Card >
    )
};
export default ParkSummary;



//If current user id does not match park favorite user profile id, then show fav button
//if current user id does match park favorite user profile id, then show remove button