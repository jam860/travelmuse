import { Link } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Event(props) {
    const URLParams = useParams();
    const tripsData = props.tripsData;
    const tripName = URLParams.tripName;
    const eventName = URLParams.eventName;
    const navigate = useNavigate();

    function handleClick() {
        navigate(-1);
        props.deleteEvent(tripName, eventName);
    }

    let tripEvent;
    let dateObj;

    console.log(tripsData);
    if (tripsData !== undefined) {
        if (tripsData === null) {
            return;
        }
        tripsData.forEach((trip) => {
            if (trip.tripName === tripName && trip.events !== undefined) {
                trip.events.forEach(((event) => {
                    if (event.eventName === eventName) {
                        tripEvent = event;
                        dateObj = new Date(tripEvent.date);
                    }
                }))
            }
        });
    }
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (tripEvent === undefined) {
        return <p>"you did something wrong"</p>;
    } else {
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
                            <button onClick={handleClick} aria-label="delete event" className="btn btn-add border-0">
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
                            <img src={(tripEvent.img === undefined ? "/img/mountains.jpg" : tripEvent.img)} alt="event location representation"/>
                        </div>
                    </div>
                </div>
                <div className="event-details-container">
                    <div className="event-details-content">
                        <h3>Date:</h3>
                        <p><time>{(days[dateObj.getUTCDay()] + ", " + months[dateObj.getUTCMonth()] + " " + dateObj.getDate())}</time></p>
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
}