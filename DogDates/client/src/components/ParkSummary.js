import React from "react";
import { Card } from "reactstrap";
import "./ParkSummary.css"
import { Link } from "react-router-dom";

const ParkSummary = ({ park }) => {
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