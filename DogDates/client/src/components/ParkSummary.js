import React, { useEffect, useState } from "react";
import { Card } from "reactstrap";
import "./ParkSummary.css"
import { Link } from "react-router-dom";


const ParkSummary = ({ park }) => {


    //Get the parks
    //Check if favorite
    //If favorite, display unfavorite button
    //If not, dispaly favorite button

    const [parks, setParks] = useState([]);
    const [favorite, setFavorite] = useState([])

    useEffect(() => {
        fetch("/api/park")
            .then((res) => res.json())
            .then((posts) => {
                setParks(posts);
            });
    }, []);



    return (
        <Card className="park_card">
            <Link to={`/park/${park.id}`}>
                <div className="park_img"
                    style={{ backgroundImage: `url(${park.parkImage})` }}
                >
                    {park.parkImage}
                </div>
            </Link>
            <br />
            <div>
                <h2>{park.name}</h2>
                <p>{park.city}, {park.state}</p>

            </div>
        </Card>
    )
};
export default ParkSummary;