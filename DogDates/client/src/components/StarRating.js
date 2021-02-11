import StarRatings from 'react-star-ratings';
import React, { Component, useState, useEffect, useContext } from "react";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { useParams } from 'react-router-dom';
import { Form, Button, Input } from "reactstrap";


function getPaw(value) {
    switch (value) {
        case 0:
            return "/pawPrintOutline.png";
        case 100:
            return "/BlackPaw.png";
    }
}
function getPaws(value) {
    switch (value) {
        case 0.0:
            return [0, 0, 0, 0, 0];
        case 1.0:
            return [100, 0, 0, 0, 0];
        case 2.0:
            return [100, 100, 0, 0, 0];
        case 3.0:
            return [100, 100, 100, 0, 0];
        case 4.0:
            return [100, 100, 100, 100, 0];
        case 5.0:
            return [100, 100, 100, 100, 100];
    }
}
// const handleChange = (value) => {
//     onChange(value + 1);
// }

export default function Rating() {
    const [pawValue, setPawValue] = useState(0);
    const { getToken, getCurrentUser } = useContext(UserProfileContext);
    const { parkId } = useParams();
    const [reviewValue, setReviewValue] = useState("");
    const user = getCurrentUser();
    const [isAdding, setIsAdding] = useState(false);


    useEffect(() => {
        getToken().then((token) =>
            fetch(`/api/parkReview/${parkId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })).then((res) => res.json())
            .then((res) => {
                if (res[0] === undefined) {
                    setPawValue(0)
                }
                else {
                    let average = res[0].totalReview / res[0].reviewCount
                    average = Math.floor(average)
                    setPawValue(average)

                }

            })
    }, [])

    const addReview = () => {
        const newReview = {
            reviewValue: parseInt(reviewValue),
            parkId: parseInt(parkId),
        };
        getToken()
            .then((token) =>
                fetch(`/api/parkReview/addReview`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/JSON",
                    },
                    body: JSON.stringify(newReview)
                })
            )
        return (
            <Form>
                <Input>How many paws would you like to give this park?
                    </Input>
            </Form>
        )
    }
    const showAddReview = () => {
        setIsAdding(true);
    }
    const hideAdd = () => {
        setIsAdding(false);
    }

    return (
        <>{isAdding ? (
            <Form>
                <Input for="reviewValue" type="text" id="reviewValue" onChange={(e) => setReviewValue(e.target.value)}>
                    How many paws would you like to give this park? (1-5)
                </Input>
                <Button onClick={addReview, hideAdd} >Submit</Button>
                <Button onClick={hideAdd}>Cancel</Button>
            </Form>
        ) : (
                <div>
                    {getPaws(pawValue).map(value => (
                        <img src={getPaw(value)} width={30} />
                    ))}
                    <Button onClick={showAddReview}>Add Review</Button>
                </div>
            )
        }
        </>
    )
}






