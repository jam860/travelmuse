import { Link, useNavigate } from "react-router-dom" //ignore for now
import { useParams, Navigate } from "react-router-dom";
import { EventCard } from "./components/EventCard";

export function Itinerary(props) {
    let URLParam = useParams();
    const tripNameString = URLParam.tripName;
    const tripsData = props.tripsData;
    const navigate = useNavigate();

    //sort all itinerary data first
    if (tripsData !== null) {
        tripsData.forEach((trip) => {
            let sortedTripEvents = trip.events;
            if (sortedTripEvents !== undefined) {
                sortedTripEvents.sort((eventA, eventB) => {
                    const date1 = new Date(eventA.date + " " + eventA.startTime);
                    const date2 = new Date(eventB.date + " " + eventB.startTime);
                    return date1 - date2;
                });
            }
            trip.events = sortedTripEvents;
        })
    }

    //create variables for trips/startdate/enddate
    let tripCards = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let startDateObj;
    let endDateObj;
    let tripPhoto;

    //find all itinerary data that matches url and pair it up with dates
    if (tripsData !== null) {
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
    }

    function deleteClick() {
        navigate(-1);
        props.deleteItinerary(tripNameString);
    }

    if (startDateObj === undefined) {
        return <Navigate to={"/mytrips"} />
    }

    return (
        <main>
            <div className="itinerary-body">
                <div className="itinerary-body-content">
                    <section>
                        <div className="placeTime">
                            <div>
                                <div className="pb-4">
                                    <Link to="/mytrips" role="button" aria-label="back">
                                        <span className="material-icons icon-center">&#xE5C4;</span><p className="d-inline">My Trips</p>
                                    </Link>
                                </div>
                                <h1 className="itinerary-title">{tripNameString}</h1>
                                <h2>{(startDateObj === undefined || endDateObj === undefined) ? "No date inputted" : months[startDateObj.getUTCMonth()] + " " + startDateObj.getUTCDate() + ", " + startDateObj.getFullYear() + " - " + months[endDateObj.getUTCMonth()] + " " + endDateObj.getUTCDate() + ", " + endDateObj.getFullYear()}</h2>
                                <div>
                                    <Link to={"eventform"} role="button" aria-label="add new event" className="btn btn-add border-0 ml-0">
                                        <span className="material-icons icon-center">&#xE145;</span>Add New Event
                                    </Link>
                                    <button onClick={deleteClick} aria-label="delete event" className="btn btn-add border-0 ml-0">
                                        <span className="material-icons icon-center">&#xE872;</span>Delete Trip
                                    </button>
                                </div>
                            </div>
                            <div>
                                <img className="trip-image" src={(tripPhoto === undefined) ? "/img/travel-back-filler.jpg" : tripPhoto} alt="itinerary card title" />
                            </div>
                        </div>
                    </section>
                    {Object.keys(tripCards).length > 0 ? Object.values(tripCards) : <p>No events yet. Try to <Link to={"eventform"} className="dark-link">add an event!</Link></p>}
                </div>
            </div>
        </main>
    )
}