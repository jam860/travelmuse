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
            <h1>This is the Event page. Replace with content.</h1>
        </main>
    )
}