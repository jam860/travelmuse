import { Link } from "react-router-dom"; //ignore for now
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export function EventForm(props) {
    const URLParams = useParams();
    const itineraryName = URLParams.tripName; 
    // Use itineraryName to change "Add an event to ..."
    // Extract data from the form, and create a callback function (in App.js) to add the event to the correct trip's events
    // I added a temporary "go back to easily go back... but you probably need to use the useNavigate hook to go back when people press the save button.

    
    return (
        <main>
            <Link to={"/mytrips/" + itineraryName}>GO BACK</Link> 
            <div className="itinerary-form-container event-form-image">
            <div className="itinerary-form-content">
                <h1 className="text-center">Add an event to Dazzling Kyoto!</h1>
                <form className="row g-3">
                    <div className="col-md-12">
                    <label for="event-name" className="form-label">Event Name</label>
                    <input type="text" className="form-control" id="trip-name" placeholder="Nijo Castle" required />
                    </div>
                    <div className="col-md-12">
                        <label for="event-type" placeholder="Activity">Event Type</label>
                        <select className="form-control">
                            <option>Activity</option>
                            <option>Flight</option>
                            <option>Lodging</option>
                            <option>Restaurant</option>
                            <option>Others</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                    <label for="startDate" className="form-label">Start Date</label>
                    <input type="date" className="form-control" id="startDate" required />
                    </div>
                    <div className="col-md-6">
                    <label for="endDate" className="form-label">End Date</label>
                    <input type="date" className="form-control" id="endDate" required />
                    </div>
                    <div className="col-md-6">
                        <label for="startTime" className="form-label">Start Time</label>
                        <input type="time" className="form-control" id="startTime" required />
                    </div>
                    <div className="col-md-6">
                        <label for="endTime" className="form-label">End Time</label>
                        <input type="time" className="form-control" id="endTime" required />
                    </div>
                    <div className="col-12">
                    <label for="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress" placeholder="541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan" />
                    </div>
                    <div className="col-md-12">
                    <label for="inputNotes" className="form-label">Notes</label>
                    <textarea type="text" className="form-control" id="inputNotes" placeholder="Open from 8:45AM to 5PM!"></textarea>
                    </div>
                    <div className="col-12">
                        <label for="fileUpload" className="form-label">Destination Photo</label>
                        <input type="file" className="form-control" id="fileUpload" accept="image/*" />
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