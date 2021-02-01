import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";



const ParkDetails = () => {
    const { parkId } = useParams();
    const [park, setPark] = useState([]);

    useEffect(() => {
        fetch(`/api/park/${parkId}`)
            .then((res) => {
                if (res.status === 404) {
                    toast.error("Whoops, we can't find that park");
                    return;
                }
                return res.json();
            })
            .then((data) => {
                setPark(data.park);
            });
    }, []);
}