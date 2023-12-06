import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { v4 } from 'uuid';

export function EventForm(props) {
    const URLParams = useParams();
    const itineraryName = URLParams.tripName; 

    const [errorName, setErrorName] = useState(false);
    const [errorSameName, setErrorSameName] = useState(false);
    const [errorTime, setErrorTime] = useState(false);
    const [errorYear, setErrorYear] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [eventName, setEventName] = useState('');
    const [eventType, setEventType] = useState('Activity')
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [unformattedStartTime, setUnformattedStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [unformattedEndTime, setUnformattedEndTime] = useState('');
    const [address, setAddress] = useState('');
    const [notes, setNotes] = useState('');
    const [destinationPhoto, setDestinationPhoto] = useState(undefined);
    const navigate = useNavigate();


    const trips = props.tripsData;
    let allEventNames = new Set();
    let tripVal;
    trips.forEach((trip) => {
        if (trip.tripName === itineraryName) {
            tripVal = trip;
            if (trip.events != null) {
                trip.events.forEach((event) => {
                    allEventNames.add(event.eventName);
                });
            }
        }
    });
    const tripStart = new Date(tripVal.startDate);
    const tripEnd = new Date(tripVal.endDate);
    const tripStartYear = tripStart.getUTCFullYear();
    const tripEndYear = tripEnd.getUTCFullYear();

    useEffect(() => {
        let formatedTime = convertToAmPm(unformattedEndTime);
        let formatedStartTime = convertToAmPm(unformattedStartTime);
        if (unformattedEndTime === "") {
            setErrorTime(false);
        } else if (unformattedEndTime <= unformattedStartTime) {
            setErrorTime(true);
        } else {
            setErrorTime(false);
            setEndTime(formatedTime);
            setStartTime(formatedStartTime);
        }
    }, [unformattedEndTime]);


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
        if (newValue.indexOf("?") >= 0 || newValue.indexOf("/") >= 0 || newValue.indexOf("#") >= 0 || newValue.indexOf("\\") >= 0) {
            setErrorName(true);
        } else {
            setEventName(newValue);
            setErrorName(false);
        }
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
        let newValue = event.target.value;
        setUnformattedStartTime(newValue);
    }

    function handleEndTimeChange(event) {
        let newValue = event.target.value;
        setUnformattedEndTime(newValue);
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
        const inputVal = new Date(date);
        const utcYear = inputVal.getUTCFullYear();
        if (allEventNames.has(eventName)) {
            setErrorSameName(true);
        } else if (tripEndYear - utcYear < 0 || tripStartYear - utcYear > 0) {
            console.log(tripEndYear - utcYear);
            console.log(tripStartYear - utcYear)
            setErrorYear(true);
        } else if (errorTime || errorName) {
            event.preventDefault();    
        } else {
            setIsSubmitting(true);
            setErrorSameName(false);
            const storage = getStorage();
            if (destinationPhoto != undefined) {
                const imageRef = ref(storage, `event-images/${destinationPhoto.name + v4()}`);
                uploadBytes(imageRef, destinationPhoto).then(() => {
                    // alert("Form Submitted!");
                    return getDownloadURL(imageRef);
                }).then((downloadURL) => {
                    const newEvent = {eventName: eventName.trim(), eventType: eventType, date: date, startTime: startTime, endTime: endTime, address: address, notes: notes, img: downloadURL};
                    props.addEventToTrip(itineraryName, newEvent);
                    navigate(-1);
                })
            } else {
                const newEvent = {eventName: eventName.trim(), eventType: eventType, date: date, startTime: startTime, endTime: endTime, address: address, notes: notes};
                props.addEventToTrip(itineraryName, newEvent);
                navigate(-1);
            }
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
                        <input type="text" maxlength="50" onChange={handleEventNameChange} value={eventName} className="form-control" id="trip-name" placeholder="Nijo Castle" required />
                        {errorName && <div className="error-message"> Event name cannot contain "?", "#", "/" or "\"! </div>}
                        {errorSameName && <div className="error-message"> Event name cannot be the same as other event names in the same trip! </div>}
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
                        <input type="date" onChange={handleDateChange} value={date} className="form-control" id="date" required />
                        {errorYear && <div className="error-message"> Date should be within the itinerary year range.</div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="startTime" className="form-label">Start Time</label>
                            <input type="time" onChange={handleStartTimeChange} value={unformattedStartTime} className="form-control" id="startTime" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="endTime" className="form-label">End Time</label>
                            <input type="time" onChange={handleEndTimeChange} value={unformattedEndTime} className="form-control" id="endTime" required />
                            {errorTime && <div className="error-message"> End time cannot be later than start time! </div>}
                        </div>
                        <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Address</label>
                        <input type="text" onChange={handleAddressChange} value={address} className="form-control" id="inputAddress" placeholder="541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan" />
                        </div>
                        <div className="col-md-12">
                        <label htmlFor="inputNotes" className="form-label">Notes</label>
                        <textarea type="text" onChange={handleNotesChange} value={notes} className="form-control" id="inputNotes" placeholder="Open from 8:45AM to 5PM!"></textarea>
                        </div>
                        <div className="col-12">
                            <label htmlFor="fileUpload" className="form-label">Destination Photo</label>
                            <input type="file" onChange={handleDestinationPhotoChange} className="form-control" id="fileUpload" accept="image/*" />
                        </div>
                        <div className="col-12">
                            <input type="submit" value="Save" className="input-submit" disabled={isSubmitting}/>
                            {isSubmitting && <p>Designing your new event... please wait!</p>}
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}