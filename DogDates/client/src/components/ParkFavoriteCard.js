import React from "react";
import { Link } from "react-router-dom";

const FavoriteCard = ({ park }) => {







    return (
        <Link to={`/park/${park.id}`}>
            <h2>{park.name}</h2>
        </Link>
    );
};
export default FavoriteCard;