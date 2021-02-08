import React from "react";
import ParkSummary from "./ParkSummary";
import "./ParkList.css"

const ParkList = (props) => {
    return (
        <div>
            {props.parks.map((park) => (
                <div key={park.id}>
                    <ParkSummary setParkAdded={props.setParkAdded} parkAdded={props.parkAdded} park={park} />
                </div>
            ))}
        </div>
    );
};
export default ParkList;