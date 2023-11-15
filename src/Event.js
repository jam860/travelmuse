import { Link } from "react-router-dom" //ignore for now
import { useParams } from "react-router-dom";

export function Event(props) {
    const URLParams = useParams();
    const tripsData = props.tripsData;
    const tripName = URLParams.tripName;
    const eventName = URLParams.eventName;

    // Copy code starting from <main> to </main> from "sampleEvent.html" in "old-files". 
    // How to process data using props: 
    // 1. Loop over the tripsData variable (which is an array of objects) and find the correct trip with "tripName" (this is an object). 
    // 2. Within that trip object, access the "events" key. The values of the "events" key are an array of objects. 
    // 3. Loop over the "events" key's values, and find the correct event using "eventName". 
    // 4. Store that event (an object) into a new variable, and use the data from the event variable to create the events page.
    // Refer to App.js's variable "tripsData" to visualize how we're looping/processing the data
    
    return (
        <main>
             <div className="event-content-wrapper">
            <div className="event-overview-container">
                <div className="d-flex justify-content-between">
                    <div>
                        <a href="itinerary.html" role="button" aria-label="back" className="btn btn-back border-0">
                            <span className="material-icons icon-center">&#xE5C4;</span>Trip Summary
                        </a>
                    </div>
                    <div>
                        <a href="eventForm.html" role="button" aria-label="add new event" className="btn btn-add border-0">
                            <span className="material-icons icon-center">&#xE145;</span>Add New Event
                        </a>
                    </div>
                </div>
                <div className="event-content-container d-flex">
                    <div className="overview-content">
                        <h1>Nijo Castle</h1>
                        <h2>Activity</h2>
                    </div>
                    <div className="event-image">
                        <img src="img/nijo-castle.jpg" alt="a white Nijo castle by a water stream"/>
                    </div>
                </div>
            </div>
            <div className="event-details-container">
                <div className="event-details-content">
                    <h3>Date:</h3>
                    <p><time datetime="2023-10-16 17:20">June 1st, 2024 | 10:00AM to 11:00AM</time></p>
                    <h3>Address:</h3>
                    <p>541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan</p>
                    <h3>Notes:</h3>
                    <p>Open from 8:45AM to 5PM!</p>
                </div>
            </div>
        </div>
        </main>
    )
}