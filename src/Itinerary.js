import { Link } from "react-router-dom" //ignore for now
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import { EventCard } from "./components/EventCard";

export function Itinerary(props) {
    let URLParam = useParams();
    const tripNameString = URLParam.tripName;
    const tripsData = props.tripsData;

    //sort all itinerary data first
    tripsData.forEach((trip) => {
        let sortedTripEvents = trip.events;
        if (sortedTripEvents != undefined) {
            sortedTripEvents.sort((eventA, eventB) => {
                const date1 = new Date(eventA.date + " " + eventA.startTime);
                const date2 = new Date(eventB.date + " " + eventB.startTime);
                return date1 - date2;
            });
        }
        trip.events = sortedTripEvents;
    })

    //create cariables for trips/startdate/enddate
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

    return (
        <main>
            <div className="itinerary-body">
                <div className="itinerary-body-content">
                    <div className="pb-4">
                        <Link to="/mytrips" role="button" aria-label="back">
                            <span className="material-icons icon-center">&#xE5C4;</span><p className="d-inline">My Trips</p>
                        </Link>
                    </div>
                    <section>
                        <div className="placeTime">
                            <h1>{tripNameString}</h1>
                            <h2>{(startDateObj == undefined || endDateObj == undefined) ? "No date inputted" : months[startDateObj.getUTCMonth()] + " " + startDateObj.getUTCDate() + ", " + startDateObj.getFullYear() + " - " + months[endDateObj.getUTCMonth()] + " " + endDateObj.getUTCDate() + ", " + endDateObj.getFullYear()}</h2>
                            <div>
                                <Link to={"eventform"} role="button" aria-label="add new event" className="btn btn-add border-0">
                                    <span className="material-icons icon-center">&#xE145;</span>Add New Event
                                </Link>
                            </div>
                        </div>
                    </section>
                    {Object.keys(tripCards).length > 0 ? Object.values(tripCards) : <p>No events yet. Try to add an event!</p>}
                </div>
            </div>
        </main>
    )
}