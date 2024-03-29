import { useState } from "react";
import { TripCard } from "./components/TripCard";
import { Link } from "react-router-dom";

export function Trips(props) {
    const itineraryInfo = props.tripsData;

    let firstName = "user";
    if (props.currentUser != null) {
        const nameSpace = props.currentUser.displayName.indexOf(" ");
        firstName = props.currentUser.displayName.substring(0, nameSpace);
        if (firstName === "") {
            firstName = props.currentUser.displayName;
        }
    }

    let itineraryCards = [];
    if (itineraryInfo != null) {
        itineraryCards = itineraryInfo.map((itinerary) => {
            return (<TripCard itinerary={itinerary} key={itinerary.tripName}/>);
        }); 
    }

    const [itineraries, changeItineraries] = useState(itineraryCards);
    const [searchValue, onSearchValue] = useState("");

    // Search
    const searchTerm = (event) => {
        let newValue = event.target.value;
        onSearchValue(newValue);

        const newItineraryCards = itineraryCards.filter((itineraryComponent) => {
            const itineraryProps = itineraryComponent.props.itinerary;
            if ((itineraryProps.tripName).toLowerCase().indexOf(newValue.toLowerCase()) >= 0) {
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
                            <h1 className="pt-5 text-center mytrips-title">My Trips</h1>
                            {(props.currentUser == null) ? <p className="text-center mytrips-subtitle">You are currently not signed in! Any changes made to these trips will not be saved. Please <Link className="light-link" to="/login">sign in</Link>  to save your changes.</p> : <p className="text-center mytrips-subtitle">Welcome back {firstName}! Let's take a look at your itineraries.</p>}
                            {(itineraries.length === 0 && searchValue.length === 0) ? <><p className="pt-5 no-trips text-center mytrips-subtitle">You have no itineraries yet! <Link className="light-link" to="/plan">Plan with us.</Link></p></>: 
                            <div>                             
                                <div className="pt-4">
                                    <h2>Search Trips</h2>
                                    <input className="form-control mr-sm-2" type="search" placeholder="Dazzling Kyoto" aria-label="Search" value={searchValue} onChange={searchTerm} />
                                </div>
                                <div className="cards row d-flex flex-wrap">
                                    {itineraries}
                                </div>
                            </div>}
                        </div>
                    </div>
                </section>
            </main>
    )
}