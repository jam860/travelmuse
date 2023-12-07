import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { v4 } from 'uuid';

export function PlanForm(props) {
    const [errorDate, setErrorDate] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorSameName, setErrorSameName] = useState(false);
    const [errorSetYear, setErrorYear] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [destination, setDestination] = useState('');
    const [notes, setNotes] = useState('');
    const [destinationPhoto, setDestinationPhoto] = useState(undefined);
    const navigate = useNavigate();


    // Checking for same trip name
    const trips = props.tripsData;
    let allTripNames = new Set();
    if (trips !== null) {
        trips.forEach((trip) => {
            allTripNames.add(trip.tripName);
        });
    }

    function handleTripChange(event) {
        let newValue = event.target.value;
        if (newValue.indexOf("?") >= 0 || newValue.indexOf("/") >= 0 || newValue.indexOf("#") >= 0 || newValue.indexOf("\\") >= 0) {
            setErrorName(true);
        } else {
            setTripName(newValue);
            setErrorName(false);
        }
    }

    function handleStartDateChange(event) {
        let newValue = event.target.value;
        setStartDate(newValue);
    }


    function handleEndDateChange(event) {
        let newValue = event.target.value;
        setEndDate(newValue);
    }


    function handleDestinationChange(event) {
        let newValue = event.target.value;
        setDestination(newValue);
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
        event.stopPropagation()
        let endDateObject = new Date(endDate);
        let startDateObject = new Date(startDate);
        let endDateYear = endDateObject.getUTCFullYear();
        let startDateYear = startDateObject.getUTCFullYear();
        setErrorSameName(false);
        if (allTripNames.has(tripName)) {
            setErrorSameName(true);
        } else if (endDateObject < startDateObject) {
            setErrorDate(true);
        } else if (endDateYear - startDateYear > 100) {
            setErrorYear(true);
        } 
        else if (errorName) {
            event.preventDefault();
        } else {
            setIsSubmitting(true);
            setErrorSameName(false);
            const storage = getStorage();
            if (destinationPhoto !== undefined) {
                const imageRef = ref(storage, `trip-images/${destinationPhoto.name + v4()}`);
                uploadBytes(imageRef, destinationPhoto).then(() => {
                    return getDownloadURL(imageRef);
                }).then((downloadURL) => {
                    setErrorSameName(false);
                    const newTrip = { tripName: tripName.trim(), startDate: startDate, endDate: endDate, destination: destination, notes: notes, photo: downloadURL, photoURL: downloadURL };
                    props.addTrip(newTrip);
                    navigate("/mytrips");
                })
            } else {
                setErrorSameName(false);
                const newTrip = { tripName: tripName.trim(), startDate: startDate, endDate: endDate, destination: destination, notes: notes };
                props.addTrip(newTrip);
                navigate("/mytrips");
            }
        }
    }

    return (
        <main>
            <div className="itinerary-form-container">
                <div className="itinerary-form-content">
                    <h1 className="text-center">Your New Itinerary Adventure!</h1>
                    {props.currentUser === null && (<p className="text-center">This itinerary will not be saved! Please <Link className="dark-link" to="/login">sign in</Link> to save your itinerary.</p>)}
                    <form className="row g-3" onSubmit={handleOnSubmit}>
                        <div className="col-md-12">
                            <label htmlFor="trip-name" className="form-label">Trip Name</label>
                            <input type="text" maxlength="50" onChange={handleTripChange} value={tripName} className="form-control" id="trip-name" placeholder="Dazzling Kyoto" required />
                            {errorName && <div className="error-message"> Trip name cannot contain "?", "#", "/" or "\"! </div>}
                            {errorSameName && <div className="error-message"> Trip name cannot have the same name as other trips! </div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="startDate" className="form-label">Start Date</label>
                            <input type="date" onChange={handleStartDateChange} value={startDate} className="form-control" id="startDate" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="endDate" className="form-label">End Date</label>
                            <input type="date" onChange={handleEndDateChange} value={endDate} className="form-control" id="endDate" required />
                            {errorDate && <div className="error-message"> End date cannot be earlier than start date! </div>}
                            {errorSetYear && <div className="error-message"> Date range should be within 100 years! </div>}
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputDestination" className="form-label">Destination</label>
                            <input type="text" onChange={handleDestinationChange} value={destination} className="form-control" id="inputDestination" placeholder="Kyoto, Japan" required />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputNotes" className="form-label">Notes</label>
                            <textarea type="text" onChange={handleNotesChange} value={notes} className="form-control" id="inputNotes" placeholder="Sleep early before flight!"></textarea>
                        </div>
                        <div className="col-12">
                            <label htmlFor="fileUpload" className="form-label">Destination Photo</label>
                            <input type="file" onChange={handleDestinationPhotoChange} className="form-control" id="fileUpload" accept="image/*" />
                        </div>
                        <div className="col-12">
                            <input type="submit" value="Save" className="input-submit" disabled={isSubmitting}/>
                            {isSubmitting && <p>Preparing your new adventure... please wait!</p>}
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}