import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Trips } from './Trips';
import { Plan } from './Plan';
import { Homescreen } from './Homescreen';
import { Itinerary } from './Itinerary';
import { User } from './User';
import { EventForm } from './EventForm.js';
import { Event } from './Event.js';
import SAMPLE_TRIPS from "./data/featuredData.json";
import USER_TRIPS from "./data/userData.json";

function App() {
  let sampleData = SAMPLE_TRIPS; //use featuredData.json for home page;
  let tripsData = USER_TRIPS; //for itinerary page

  function addTrip(trip) {
    tripsData.unshift(trip);
    console.log(tripsData);

  }

  function addEventToTrip(tripName, event) {
    const trip = tripsData.find((trip) => { 
      return trip.tripName === tripName
    });
    if (trip) {
      trip.events.push(event);
    }
  }


  return (
    <>
      <Navbar />
        <Routes>
        <Route index element={<Homescreen />} /> 
        <Route path="plan" element={<Plan addTrip={addTrip}/>} />
        <Route path="mytrips" element={<Trips tripsData={tripsData}/> } />
        <Route path="/mytrips/:tripName" element={<Itinerary tripsData={tripsData}/>} />
        <Route path="/mytrips/:tripName/:eventName" element={<Event tripsData={tripsData}/> } />
        <Route path="eventform" element={<EventForm />} />
        <Route path="/mytrips/:tripName/eventform" element={<EventForm addEventToTrip={addEventToTrip} tripsData={tripsData}/>} />
        <Route path="eventPage" element={<Event tripsData={tripsData}/>} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
