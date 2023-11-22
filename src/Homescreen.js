import { TripCardFeatured } from "./components/TripCardFeatured";
import { Link } from "react-router-dom";

export function Homescreen(props) {
    const itineraryInfo = props.featuredTrips;

    const itineraryCards = itineraryInfo.map((itinerary) => {
        return (<TripCardFeatured featuredTrip={itinerary} key={itinerary.tripName}/>);
    });

    let firstName;
    if (props.currentUser != null) {
        const nameSpace = props.currentUser.displayName.indexOf(" ");
        firstName = props.currentUser.displayName.substring(0, nameSpace);
    }

    return (
        <main>
            <section>
            <div className="intro-container">
                <div className="intro-content">
                    <h1 className="intro-title">{props.currentUser && "Welcome " + firstName + ". "}Ready to plan your next adventure?</h1>
                    <Link to="/plan">
                        <p className="btn btn-primary" role="button">Plan with us.</p>
                    </Link>
                </div>
            </div>
            </section>
            <section>
                <div className="recommend-itinerary-container">
                    <div className="container">
                        <h2 className="pt-5 text-center">Featured Itineraries</h2>
                        <div className="cards row d-flex flex-wrap">
                            {itineraryCards}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}