import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Jumbotron } from "reactstrap";



const ParkDetails = () => {
    const { parkId } = useParams();
    const [park, setPark] = useState([]);

    useEffect(() => {
        fetch(`/api/Park/${parkId}`)
            .then((res) => {
                if (res.status === 404) {
                    toast.error("Whoops, we can't find that park");
                    return;
                }
                return res.json();
            }).then((res) => {
                setPark(res);
            })
    }, []);
    return (
        <div>
            <Jumbotron style={{ backgroundImage: `url('${park.parkImage}')` }}>
            </Jumbotron>
            <div className="container">
                <h1>{park.name}</h1>
                <p>{park.street} {park.city}, {park.state} {park.zipCode}</p>
            </div>
        </div>
    );
};
export default ParkDetails;