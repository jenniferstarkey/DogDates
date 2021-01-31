import React, { useEffect, useState } from "react";
import ParkList from "../components/ParkList";

const Explore = () => {
    const [parks, setParks] = useState([]);

    useEffect(() => {
        fetch("/api/park")
            .then((res) => res.json())
            .then((posts) => {
                setParks(posts);
            });
    }, []);

    return (
        <div className="row">
            <ParkList parks={parks} />
        </div>
    )
};
export default Explore;