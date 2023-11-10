import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export function TripCard(props) {
    const itinerary = props.itinerary;
    return (
        <div className="col col-12 col-md-6 col-lg-3 d-flex justify-content-center">
        <div className="card">
            <img className="card-img-top" src={itinerary.image} alt="itinerary card title" />
            <div className="card-body">
                <h3 className="card-title">{itinerary.title}</h3>
                <p className="card-text">{"Stops: " + itinerary.firstStop + "..."}</p>
                <Link to={"/mytrips/" + itinerary.title} className="btn btn-primary">Open</Link>
            </div>
        </div>
        </div>
    )
}
