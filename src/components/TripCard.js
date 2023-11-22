import { Link } from "react-router-dom";

export function TripCard(props) {
    const itinerary = props.itinerary;

    let eventLength = 0;
    if (itinerary.events != undefined) {
        eventLength = itinerary.events.length;
    }

    return (
        <div className="col col-12 col-md-6 col-lg-3 d-flex justify-content-center">
        <div className="card">
            <img className="card-img-top" src={(itinerary.photo == "") ? "/img/travel-back-filler.jpg" : itinerary.photo} alt="itinerary card title" />
            <div className="card-body">
                <h3 className="card-title">{itinerary.tripName}</h3>
                <p className="card-text">{(eventLength != 0) ? "Events: " + itinerary.events[0].eventName + "..." : "No planned events yet!"}</p>
                <Link to={"/mytrips/" + itinerary.tripName} className="btn btn-primary">Open</Link>
            </div>
        </div>
        </div>
    )
}
