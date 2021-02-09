import React from "react"
import EventFavoriteList from "../components/EventFavorites";
import ParkFavoriteList from "../components/ParkFavorites"

const Home = () => {
    return (
        <>
            <ParkFavoriteList />
            <EventFavoriteList />
        </>
    )
}
export default Home;