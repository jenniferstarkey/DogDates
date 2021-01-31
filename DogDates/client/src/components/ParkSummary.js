import React from "react";
import { Card } from "reactstrap";
import "./ParkSummary.css"

const ParkSummary = ({ park }) => {
    return (
        <Card className="park_card">

            <div className="park_img"
                style={{ backgroundImage: `url(${park.parkImage})` }}
            >
                {park.parkImage}
            </div>
            <br />
            <div>
                <h2>{park.name}</h2>
                <p>{park.city}, {park.state}</p>

            </div>
        </Card>
    )
};
export default ParkSummary;