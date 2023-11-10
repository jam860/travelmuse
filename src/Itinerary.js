import { Link } from "react-router-dom" //ignore for now
import { useParams } from "react-router-dom";
import { EventCard } from "./components/EventCard";

export function Itinerary() {
    let URLParam = useParams();
    const tripNameString = URLParam.tripName;
    console.log(tripNameString);

    //pretend we loaded in external data... we would need to do a searching thing to make sure we have the right trip events.
    const tripsData = [
        {tripName: "Dazzling Kyoto", startDate:  "2022-06-01", endDate: "2022-06-02", destination: "Japan", notes: "", photo: "",
        events: [{eventName: "Land in Kyoto", date: "2022-06-01", time: "08:00", address: "1 Senshukukokita, Izumisano, Osaka 549-0001, Japan", img: "/img/airport-kyoto.jpg", notes: ""},
        {eventName: "Nijo Castle", date: "2022-06-01", time: "10:00", address: "541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan", img: "/img/nijo-castle.jpg", notes: ""},
        {eventName: "Lunch", date: "2022-06-01", time: "12:00", address: "902 Higashishiokojicho, Shimogyo Ward, 600-8216", img: "/img/ramen.jpg", notes: ""},
        {eventName: "Dinner", date: "2022-06-01", time: "18:00", address: "541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan", img: "/img/ramen.jpg", notes: ""},
        {eventName: "Leave Kyoto", date: "2022-06-02", time: "08:00", address: "541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan", img: "/img/airport-kyoto.jpg", notes: ""}]},
    ];

    

    //need to sort... do it before making event cards
    //may also need to data process time/date


    let tripCards = [];
    let [startDate, endDate] = ["", ""];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    tripsData.forEach((trip) => {
        if (trip.tripName == tripNameString) {
            startDate = trip.startDate;
            endDate = trip.endDate;
                trip.events.forEach((event) =>  {
                    tripCards.push(<EventCard event={event}/>); //if date exists, push eventcard under that date. Otherwise, make date and push eventcard under that date. eg. [{date: 2022-06-02, eventCards: [EventCard event={event}, etc, etc]}]
                }
            )
        }
    });

    const startDateLongForm = new Date(startDate);
    const endDateLongForm = new Date(endDate);


    return (
        <main>
            <div className="itinerary-body">
                <div className="itinerary-body-content">
                    <div class="pb-4">
                        <a href="myTrips.html" role="button" aria-label="back">
                            <span class="material-icons icon-center">&#xE5C4;</span><p class="d-inline">My Trips</p>
                        </a>
                    </div>
                    <section>
                        <div class="placeTime">
                            <h1>{tripNameString}</h1>
                            <h2>{months[startDateLongForm.getUTCMonth()] + " " + startDateLongForm.getUTCDate() + ", " + startDateLongForm.getFullYear() + " - " + months[endDateLongForm.getUTCMonth()] + " " + endDateLongForm.getUTCDate() + ", " + endDateLongForm.getFullYear()}</h2>

                            <div>
                                <a href="eventForm.html" role="button" aria-label="add new event" class="btn btn-add border-0">
                                    <span class="material-icons icon-center">&#xE145;</span>Add New Event
                                </a>
                            </div>
                        </div>
                    </section>
                    {tripCards}
                </div>
            </div>
        </main>
    )
}