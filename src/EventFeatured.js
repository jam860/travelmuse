import { Link } from "react-router-dom" //ignore for now
import { useParams } from "react-router-dom";

export function EventFeatured(props) {
    const URLParams = useParams();
    const tripsData = props.featuredTrips;
    const tripName = URLParams.featuredTripName;
    const eventName = URLParams.eventName;

    // How we're process data using props: 
    // 1. Loop over the tripsData variable (which is an array of objects) and find the correct trip with "tripName" (this is an object). 
    // 2. Within that trip object, access the "events" key. The values of the "events" key are an array of objects. 
    // 3. Loop over the "events" key's values, and find the correct event using "eventName". 
    // 4. Store that event (an object) into a new variable, and use the data from the event variable to create the events page.
    // Refer to userData.json to visualize how we're looping/processing the data
    let tripEvent;
    tripsData.forEach((trip) => {
        if (trip.tripName == tripName) {
            trip.events.forEach(((event) => {
                if (event.eventName == eventName) {
                    tripEvent = event;
                }
            }))
        }
    });

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let dateObj = new Date(tripEvent.date);
    
    //use "TripEvent" to fill in data by accessing it's properties! Refer to userData.json, or console.log(tripEvent).
    //Also use date object to format it correctly.
    return (
        <main>
            <div className="event-content-wrapper">
                <div className="event-overview-container">
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to={"/" + tripName} role="button" aria-label="back" className="btn btn-back border-0">
                            <span className="material-icons icon-center">&#xE5C4;</span>{tripName}
                        </Link>
                    </div>
                </div>
                <div className="event-content-container d-flex">
                    <div className="overview-content">
                        <h1>{eventName}</h1>
                        <h2>{tripEvent.eventType}</h2>
                    </div>
                    <div className="event-image">
                        <img src={tripEvent.img} alt="a white Nijo castle by a water stream"/>
                    </div>
                </div>
            </div>
                <div className="event-details-container">
                    <div className="event-details-content">
                        <h3>Date:</h3>
                        <p><time>{days[dateObj.getUTCDay()] + ", " + months[dateObj.getUTCMonth()] + " " + dateObj.getDate()}</time></p>
                        <h3>Time:</h3>
                        <p>{tripEvent.startTime + " - " + tripEvent.endTime}</p>
                        <h3>Address:</h3>
                        <p>{tripEvent.address}</p>
                        <h3>Notes:</h3>
                        <p>{tripEvent.notes}</p>
                    </div>
                </div>
            </div>
        </main>
    )
}