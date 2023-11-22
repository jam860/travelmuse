import { Link } from "react-router-dom";

export function TripCardFeatured(props) {
    const featuredTrip = props.featuredTrip;

    return (
        <div className="col col-12 col-md-6 col-lg-3 d-flex justify-content-center">
        <div className="card">
            <img className="card-img-top" src={(featuredTrip.photo === "") ? "/img/travel-back-filler.jpg" : featuredTrip.photo} alt="itinerary card title" />
            <div className="card-body">
                <h3 className="card-title">{featuredTrip.tripName}</h3>
                <p className="card-text">{featuredTrip.events.length !== 0 ? "Events: " + featuredTrip.events[0].eventName + "..." : "No planned events yet!"}</p>
                <Link to={"/" + featuredTrip.tripName} className="btn btn-primary">Open</Link>
            </div>
        </div>
        </div>
    )
}
