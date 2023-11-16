import { Link } from "react-router-dom";

export function ItineraryFeatured(props) {
    let URLParam = useParams();
    const tripNameString = URLParam.tripName;
    const tripsData = props.featuredTrips;
    // Reference Itinerary.js for example

    let tripCards = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let startDateObj;
    let endDateObj;

    //find all itinerary data that matches url and pair it up with dates
    tripsData.forEach((trip) => {
        if (trip.tripName == tripNameString) {
            startDateObj = new Date(trip.startDate);
            endDateObj = new Date(trip.endDate);
            if (trip.events != undefined) {
                let dateCounter = 1;
                trip.events.forEach((event) => {
                    // if date exists, push eventcard under that date. Otherwise, make date and push eventcard under that date. eg. {2024-06-02: eventCards, 2024-06-02: eventCards}
                    if (tripCards[event.date] != undefined) {
                        const previousCards = tripCards[event.date];
                        tripCards[event.date] = ([...previousCards, <EventCard event={event} key={event.eventName} />]);
                    } else {
                        const eventDateObj = new Date(event.date);
                        tripCards[event.date] = [<h2 key={"DAY " + dateCounter}>{"DAY " + dateCounter + ": " + days[eventDateObj.getUTCDay()] + ", " + months[eventDateObj.getUTCMonth()] + " " + eventDateObj.getUTCDate()}</h2>, <EventCard event={event} key={event.eventName} />];
                        dateCounter++;
                    }
                });
            }
        }
    });

    //Make sure to copy from Itinerary, but change variables. Please pay attention to how things Link
    return (
        <div>
            
        </div>
    )
}
