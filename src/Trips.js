import { useState } from "react";
import { TripCard } from "./components/TripCard";
import { Outlet } from "react-router-dom";

export function Trips() {
    const itineraryInfo = [
        {title: "Dazzling Kyoto", firstStop: "Nijo Castle", image: "img/kyoto-3.jpg"},
        {title: "#GirlsinCanada", firstStop: "Green Clover Canada", image: "img/canada.jpeg"},
        {title: "Wine in Italy", firstStop: "Frutti & Gelato", image: "img/italy.jpeg"},
        {title: "Clubbing in Korea", firstStop: "The Weekend Hongdae Club", image: "img/korea.jpg"}
    ];
    const itineraryCards = itineraryInfo.map((itinerary) => {
        return (<TripCard itinerary={itinerary} key={itinerary.title}/>);
    }); 
    const [itineraries, changeItineraries] = useState(itineraryCards);
    const [searchValue, onSearchValue] = useState("");

    const searchTerm = (event) => {
        let newValue = event.target.value;
        onSearchValue(newValue);

        const newItineraryCards = itineraryCards.filter((itineraryComponent) => {
            const itineraryProps = itineraryComponent.props.itinerary;
            if ((itineraryProps.title).toLowerCase().indexOf(newValue.toLowerCase()) >= 0) {
                return true;
            }
            return false;
        });
        changeItineraries(newItineraryCards);
    }

    return (
            <main>
                <section>
                    <div className="recommend-itinerary-container">
                        <div className="container">
                            <h1 className="pt-5 text-center">My Trips</h1>
                            <p className="text-center">Welcome back User! Let's take a look at some of your itineraries.</p>
                            <div className="pt-4">
                                <h2>Search Trips</h2>
                                <input className="form-control mr-sm-2" type="search" placeholder="Dazzling Kyoto" aria-label="Search" value={searchValue} onChange={searchTerm} />
                            </div>
                            <div className="cards row d-flex flex-wrap">
                                {itineraries}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
    )
}