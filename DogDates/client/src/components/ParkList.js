import React from "react";
import ParkSummary from "./ParkSummary";

const ParkList = ({ parks }) => {
    return (
        <div>
            {parks.map((park) => (
                <div key={park.id}>
                    <ParkSummary park={park} />
                </div>
            ))}
        </div>
    );
};
export default ParkList;