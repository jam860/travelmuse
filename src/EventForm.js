import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { storage } from ".";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';

// maybe create another state for image ref


export function EventForm(props) {
    const URLParams = useParams();
    const itineraryName = URLParams.tripName; 

    const [error, setError] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('Activity')
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [destinationPhoto, setDestinationPhoto] = useState('');
    const navigate = useNavigate();

    // converts military time to AM/PM
    // https://medium.com/front-end-weekly/how-to-convert-24-hours-format-to-12-hours-in-javascript-ca19dfd7419d
    function convertToAmPm(time) {
        let [hours, minutes] = time.split(":");
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12
        hours = hours ? hours : 12;
        let strTime = hours + ":" + minutes + " " + ampm;
        return strTime;
    }

    function handleEventNameChange(event) {
        let newValue = event.target.value;
        setEventName(newValue);
    }

    function handleEventTypeChange(event) {
        let newValue = event.target.value;
        setEventType(newValue);
    }

    function handleDateChange(event) {
        let newValue = event.target.value;
        setDate(newValue);
    }

    function handleStartTimeChange(event) {
        var newValue = event.target.value;
        var formatedTime = convertToAmPm(newValue);
        if (formatedTime >= endTime) {
            setError(true);
        } else {
            setError(false);
            setStartTime(formatedTime);
        };
    }

    function handleEndTimeChange(event) {
        let newValue = event.target.value;
        var formatedTime = convertToAmPm(newValue);
        if (formatedTime <= startTime) {
            setError(true);
        } else {
            setError(false);
            setEndTime(formatedTime);
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
        let newValue = event.target.files[0];
        setDestinationPhoto(newValue);
    }

    function handleOnSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (error) {
            event.preventDefault();
        } else {
            const newEvent = {eventName: eventName, eventType: eventType, date: date, startTime: startTime, endTime: endTime, address: address, notes: notes, photo: destinationPhoto};
            props.addEventToTrip(itineraryName, newEvent);
            const imageRef = ref(storage, `event-images/${destinationPhoto.name + v4()}`);
            // uploadBytes(imageRef, destinationPhoto).then(() => {
            //     alert("Image Uploaded");
            // });
            navigate(-1);
        }
    }

    return (
        <main>
            <div className="itinerary-form-container event-form-image">
                <div className="itinerary-form-content">
                    <button href="" aria-label="back" className="btn btn-back border-0 px-0" onClick={() => navigate(-1)}>
                        <span className="material-icons icon-center">&#xE5C4;</span>Back
                    </button>
                    <h1 className="text-center">Add an event to {itineraryName}</h1>
                    <form className="row g-3" onSubmit={handleOnSubmit}>
                        <div className="col-md-12">
                        <label htmlFor="event-name" className="form-label">Event Name</label>
                        <input type="text" onChange={handleEventNameChange} className="form-control" id="trip-name" placeholder="Nijo Castle" required />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="event-type">Event Type</label>
                            <select className="form-control" onChange={handleEventTypeChange} defaultValue="Activity" required>
                                <option>Activity</option>
                                <option>Flight</option>
                                <option>Lodging</option>
                                <option>Restaurant</option>
                                <option>Others</option>
                            </select>
                        </div>
                        <div className="col-md-12">
                        <label htmlFor="date" className="form-label">Start Date</label>
                        <input type="date" onChange={handleDateChange} className="form-control" id="date" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="startTime" className="form-label">Start Time</label>
                            <input type="time" onChange={handleStartTimeChange} className="form-control" id="startTime" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="endTime" className="form-label">End Time</label>
                            <input type="time" onChange={handleEndTimeChange} className="form-control" id="endTime" required />
                            {error && <div className="error-message"> End time cannot be later than start time! </div>}
                        </div>
                        <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input type="text" onChange={handleAddressChange} className="form-control" id="inputAddress" placeholder="541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan" />
                        </div>
                        <div className="col-md-12">
                        <label htmlFor="inputNotes" className="form-label">Notes</label>
                        <textarea type="text" onChange={handleNotesChange} className="form-control" id="inputNotes" placeholder="Open from 8:45AM to 5PM!"></textarea>
                        </div>
                        <div className="col-12">
                            <label htmlFor="fileUpload" className="form-label">Destination Photo</label>
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