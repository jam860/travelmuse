import { Link } from "react-router-dom" //ignore for now
import { useParams } from "react-router-dom";


export function EventCard(props) {
    const eventDetails = props.event;
    const URLParams = useParams();
    const itineraryName = URLParams.tripName; 

    return (
        <div>
            <Link to={"/mytrips/" + itineraryName + "/" + eventDetails.eventName}>
                <div class="event-container">
                    <div class="d-md-flex justify-content-between">
                        <div class="event-content">
                            <h4>{eventDetails.eventName}</h4>
                            <p>{"Time: " + eventDetails.time}</p>
                            <p>{"Address: " + eventDetails.address}</p>
                            <p>{"Notes: " + eventDetails.notes}</p>
                        </div>
                        <div>
                            <img class="itinerary-event-image" src={eventDetails.img} width="300" alt="event representation" />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}