import { Link } from "react-router-dom"; //ignore for now
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export function EventForm(props) {
    const URLParams = useParams();
    const itineraryName = URLParams.tripName; 
    // [DONE] Use itineraryName to change "Add an event to ..."
    // [] Extract data from the form, and create a callback function (in App.js) to add the event to the correct trip's events. Need to find a way to save this data.
    // [DONE] I added a temporary "go back to easily go back... but you probably need to use the useNavigate hook to go back when people press the save button.

    const [error, setError] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('Activity')
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [destinationPhoto, setDestinationPhoto] = useState('');
    const navigate = useNavigate();

    function handleEventNameChange(event) {
        let newValue = event.target.value;
        setEventName(newValue);
    }

    function handleEventTypeChange(event) {
        let newValue = event.target.value;
        setEventType(newValue);
    }

    function handleStartDateChange(event) {
        let newValue = event.target.value;
        setStartDate(newValue);
    }

    function handleStartTimeChange(event) {
        let newValue = event.target.value;
        setStartTime(newValue);
    }

    function handleEndTimeChange(event) {
        let newValue = event.target.value;
        if (newValue <= startTime) {
            setError(true);
        } else {
            setError(false);
            setEndTime(newValue);
        }
    }

    function handleAddressChange(event) {
        let newValue = event.target.value;
        setAddress(newValue);
    }

    function handleNotesChange(event) {
        let newValue = event.target.value;
        setNotes(newValue);
    }

    function handleDestinationPhotoChange(event) {
        let newValue = event.target.value;
        setDestinationPhoto(newValue);
    }

    function handleOnSubmit(event) {
        if (error) {
            event.preventDefault();
        } else {
            event.preventDefault();
            event.stopPropagation()
            const newEvent = {EventName: eventName, EventType: eventType, StartDate: startDate, StartTime: startTime, EndTime: endTime, address: address, notes: notes, photo: destinationPhoto};
            // props.addTrip(newEvent);
            // navigate("/mytrips");
            navigate(-1);
        }
    }

    return (
        <main>
            {/* <Link to={"/mytrips/" + itineraryName}>GO BACK</Link>  */}
            <div className="itinerary-form-container event-form-image">
                <div className="itinerary-form-content">
                    <h1 className="text-center">Add an event to {itineraryName}</h1>
                    <form className="row g-3" onSubmit={handleOnSubmit}>
                        <div className="col-md-12">
                        <label for="event-name" className="form-label">Event Name</label>
                        <input type="text" onChange={handleEventNameChange} className="form-control" id="trip-name" placeholder="Nijo Castle" required />
                        </div>
                        <div className="col-md-12">
                            <label for="event-type">Event Type</label>
                            <select className="form-control" onChange={handleEventTypeChange} defaultValue="Activity" required>
                                <option>Activity</option>
                                <option>Flight</option>
                                <option>Lodging</option>
                                <option>Restaurant</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                        <label for="startDate" className="form-label">Start Date</label>
                        <input type="date" onChange={handleStartDateChange} className="form-control" id="startDate" required />
                        </div>
                        <div className="col-md-6">
                            <label for="startTime" className="form-label">Start Time</label>
                            <input type="time" onChange={handleStartTimeChange} className="form-control" id="startTime" required />
                        </div>
                        <div className="col-md-6">
                            <label for="endTime" className="form-label">End Time</label>
                            <input type="time" onChange={handleEndTimeChange} className="form-control" id="endTime" required />
                            {error && <div className="error-message"> End time cannot be later than start time! </div>}
                        </div>
                        <div className="col-12">
                        <label for="inputAddress" className="form-label">Address</label>
                        <input type="text" onChange={handleAddressChange} className="form-control" id="inputAddress" placeholder="541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan" />
                        </div>
                        <div className="col-md-12">
                        <label for="inputNotes" className="form-label">Notes</label>
                        <textarea type="text" onChange={handleNotesChange} className="form-control" id="inputNotes" placeholder="Open from 8:45AM to 5PM!"></textarea>
                        </div>
                        <div className="col-12">
                            <label for="fileUpload" className="form-label">Destination Photo</label>
                            <input type="file" onChange={handleDestinationPhotoChange} className="form-control" id="fileUpload" accept="image/*" />
                        </div>
                        <div className="col-12">
                            <input type="submit" value="Save" className="input-submit" />
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}