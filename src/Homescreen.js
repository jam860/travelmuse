import { Link } from "react-router-dom" //ignore for now
import { TripCardFeatured } from "./components/TripCardFeatured";

export function Homescreen(props) {
    const itineraryInfo = props.featuredTrips;

    const itineraryCards = itineraryInfo.map((itinerary) => {
        return (<TripCardFeatured featuredTrip={itinerary} key={itinerary.tripName}/>);
    });


    return (
        <main>
            <section>
            <div className="intro-container">
                <div className="intro-content">
                    <h1 className="intro-title">Ready to plan your next adventure?</h1>
                    <a href="plan.html">
                        <p className="btn btn-primary" role="button">Plan with us.</p>
                    </a>
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