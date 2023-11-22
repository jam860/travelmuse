import { Link } from "react-router-dom" //ignore for now
import { useParams } from "react-router-dom";


export function EventCardFeatured(props) {
    const eventDetails = props.event;
    const URLParams = useParams();
    const itineraryName = URLParams.featuredTripName;

    return (
        <div>
            <Link to={"/" + itineraryName + "/" + eventDetails.eventName}>
                <div className="event-container">
                    <div className="d-md-flex justify-content-between">
                        <div className="event-content">
                            <h4>{eventDetails.eventName}</h4>
                            <p>{"Start Time: " + eventDetails.startTime}</p>
                            <p>{"End Time: " + eventDetails.endTime}</p>
                            <p>{"Address: " + eventDetails.address}</p>
                            <p>{"Notes: " + eventDetails.notes}</p>
                        </div>
                        <div>
                            <img className="itinerary-event-image" src={(eventDetails.img === undefined) ? "/img/mountains.jpg" : eventDetails.img} width="300" alt="event representation" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}