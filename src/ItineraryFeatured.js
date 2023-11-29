import { Link } from "react-router-dom";
import { useParams, Navigate } from "react-router-dom";
import { EventCardFeatured } from "./components/EventCardFeatured";

export function ItineraryFeatured(props) {
    let URLParam = useParams();
    const tripNameString = URLParam.featuredTripName;
    const tripsData = props.featuredTrips;
    // Reference Itinerary.js for example

    let tripCards = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let startDateObj;
    let endDateObj;
    let tripPhoto;

    //find all itinerary data that matches url and pair it up with dates
    tripsData.forEach((trip) => {
        if (trip.tripName === tripNameString) {
            tripPhoto = trip.photo;
            startDateObj = new Date(trip.startDate);
            endDateObj = new Date(trip.endDate);
            if (trip.events !== undefined) {
                let dateCounter = 1;
                trip.events.forEach((event) => {
                    // if date exists, push eventcard under that date. Otherwise, make date and push eventcard under that date. eg. {2024-06-02: eventCards, 2024-06-02: eventCards}
                    if (tripCards[event.date] !== undefined) {
                        const previousCards = tripCards[event.date];
                        tripCards[event.date] = ([...previousCards, <EventCardFeatured event={event} key={event.eventName} />]);
                    } else {
                        const eventDateObj = new Date(event.date);
                        tripCards[event.date] = [<h2 key={"DAY " + dateCounter}>{"DAY " + dateCounter + ": " + days[eventDateObj.getUTCDay()] + ", " + months[eventDateObj.getUTCMonth()] + " " + eventDateObj.getUTCDate()}</h2>, <EventCardFeatured event={event} key={event.eventName} />];
                        dateCounter++;
                    }
                });
            }
        }
    });
    
    if (Object.keys(tripCards).length === 0) {
        return <Navigate to={"/"} />;
    }

    return (
        <main>
            <div className="itinerary-body">
                <div className="itinerary-body-content">
                    <div className="pb-4">
                        <Link to="/" role="button" aria-label="Home">
                            <span className="material-icons icon-center">&#xE5C4;</span><p className="d-inline">Home</p>
                        </Link>
                    </div>
                    <section>
                        <div className="placeTime">
                            <div>
                                <h1>{tripNameString}</h1>
                                <h2>{(startDateObj === undefined || endDateObj === undefined) ? "No date inputted" : months[startDateObj.getUTCMonth()] + " " + startDateObj.getUTCDate() + ", " + startDateObj.getFullYear() + " - " + months[endDateObj.getUTCMonth()] + " " + endDateObj.getUTCDate() + ", " + endDateObj.getFullYear()}</h2>
                            </div>
                            <div>
                            <img className="trip-image" src={tripPhoto} alt="itinerary card title" />
                            </div>
                        </div>
                    </section>
                    {Object.values(tripCards)}
                </div>
            </div>
        </main>
    )
}
