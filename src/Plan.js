import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { v4 } from 'uuid';

export function Plan(props) {
    const [errorDate, setErrorDate] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [tripName, setTripName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate]  = useState('');
    const [destination, setDestination] = useState('');
    const [notes, setNotes] = useState('');
    const [destinationPhoto, setDestinationPhoto] = useState('');
    const navigate = useNavigate();

    function handleTripChange(event) {
        let newValue = event.target.value;
        if (Array.from(newValue)[0] === "#" ) {
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
        if (newValue <= startDate) {
            setErrorDate(true);
        } else {
            setErrorDate(false);
            setEndDate(newValue);
        }
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
        const storage = getStorage();
        const imageRef = ref(storage, `trip-images/${destinationPhoto.name + v4()}`);
        uploadBytes(imageRef, destinationPhoto).then(() => {
            alert("Form Submitted!");
            return getDownloadURL(imageRef);
        }).then((downloadURL) => {
            const newTrip = {tripName: tripName, startDate: startDate, endDate: endDate, destination: destination, notes: notes, photo: downloadURL};
            props.addTrip(newTrip);
            navigate("/mytrips");
        })
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
                            <input type="text" onChange={handleTripChange} value={tripName} className="form-control" id="trip-name" placeholder="Dazzling Kyoto" required/>
                            {errorName && <div className="error-message"> Trip name cannot start with "#"! </div>}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="startDate" className="form-label">Start Date</label>
                            <input type="date" onChange={handleStartDateChange} value={startDate} className="form-control" id="startDate" required/>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="endDate" className="form-label">End Date</label>
                            <input type="date" onChange={handleEndDateChange} value={endDate} className="form-control" id="endDate" required/>
                            {errorDate && <div className="error-message"> End date cannot be later than start date! </div>}
                        </div>
                        <div className="col-12">
                            <label htmlFor="inputDestination" className="form-label">Destination</label>
                            <input type="text" onChange={handleDestinationChange} value={destination} className="form-control" id="inputDestination" placeholder="Kyoto, Japan" required/>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="inputNotes" className="form-label">Notes</label>
                            <textarea type="text" onChange={handleNotesChange} value={notes} className="form-control" id="inputNotes" placeholder="Sleep early before flight!"></textarea>
                        </div>
                        <div className="col-12">
                            <label htmlFor="fileUpload" className="form-label">Destination Photo</label>
                            <input type="file" onChange={handleDestinationPhotoChange}className="form-control" id="fileUpload" accept="image/*"/>
                        </div>
                        <div className="col-12">
                            <input type="submit" value="Save" className="input-submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    )
}