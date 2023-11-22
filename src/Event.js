import { Link } from "react-router-dom" //ignore for now
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Event(props) {
    const URLParams = useParams();
    const tripsData = props.tripsData;
    const tripName = URLParams.tripName;
    const eventName = URLParams.eventName;
    const navigate = useNavigate();

    const trip = tripsData.find((trip) => {
        return trip.tripName === tripName;
    }
    )
    let event;
    if (trip) {
        event = trip.events.find(event => event.eventName === eventName)
    }

    function handleClick() {
        props.deleteEvent(tripName, eventName);
        navigate(-1);
    }
    // How we're process data using props: 
    // 1. Loop over the tripsData variable (which is an array of objects) and find the correct trip with "tripName" (this is an object). 
    // 2. Within that trip object, access the "events" key. The values of the "events" key are an array of objects. 
    // 3. Loop over the "events" key's values, and find the correct event using "eventName". 
    // 4. Store that event (an object) into a new variable, and use the data from the event variable to create the events page.
    // Refer to userData.json to visualize how we're looping/processing the data
    let tripEvent;
    let dateObj;
    tripsData.forEach((trip) => {
        if (trip.tripName == tripName) {
            trip.events.forEach(((event) => {
                if (event.eventName == eventName) {
                    tripEvent = event;
                    dateObj = new Date(tripEvent.date);
                }
            }))
        }
    });
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //use "tripEvent" to fill in data by accessing it's properties! "tripEvent" is an object with different properties from events. Refer to featuredData.json or console.log(tripEvent).
    //Also use "dateObj" to format it correctly.
    
    return (
        <main>
             <div className="event-content-wrapper">
            <div className="event-overview-container">
                <div className="d-flex justify-content-between">
                    <div>
                        <Link to={"/mytrips/" + tripName} role="button" aria-label="back" className="btn btn-back border-0">
                            <span className="material-icons icon-center">&#xE5C4;</span>{tripName}
                        </Link>
                    </div>
                    <div>
                        <button role="button" onClick={handleClick} aria-label="delete event" className="btn btn-add border-0">
                            <span className="material-icons icon-center">&#xE872;</span>Delete Event
                        </button>
                    </div>
                </div>
                <div className="event-content-container d-flex">
                    <div className="overview-content">
                        <h1>{eventName}</h1>
                        <h2>{tripEvent.eventType}</h2>
                    </div>
                    <div className="event-image">
                        <img src={tripEvent.img} alt="event location representation"/>
                    </div>
                </div>
            </div>
            <div className="event-details-container">
                <div className="event-details-content">
                    <h3>Date:</h3>
                    <p><time>{days[dateObj.getUTCDay()] + ", " + months[dateObj.getUTCMonth()] + " " + dateObj.getDate()}</time></p>
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