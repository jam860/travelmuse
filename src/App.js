import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Trips } from './Trips';
import { Plan } from './Plan';
import { Homescreen } from './Homescreen';
import { Itinerary } from './Itinerary';
import { User } from './User';
import { EventForm } from './EventForm.js';
import { Event } from './Event.js';
import { ItineraryFeatured } from './ItineraryFeatured.js';
import { EventFeatured } from './EventFeatured.js';

import SAMPLE_TRIPS from "./data/featuredData.json";
import USER_TRIPS from "./data/userData.json";

function App() {
  let sampleData = SAMPLE_TRIPS; //use featuredData.json for home page;
  let [tripsData, setTripsData] = useState(USER_TRIPS);

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

  function deleteEvent(tripName, eventName) {
    const newTripsData = tripsData.map((trip) => {
      if (trip.tripName === tripName) {
        trip.events = trip.events.filter((event) => event.eventName !== eventName);
      }
      return trip;
    });
    setTripsData(newTripsData);
    console.log(tripsData);
  }

  function deleteItinerary(tripName) {
    const newTripsData = tripsData.filter((trip) => {
      if (trip.tripName !== tripName) {
        return trip;
      }
    });
    setTripsData(newTripsData);
    console.log(tripsData);
  }


  return (
    <>
      <Navbar />
        <Routes>
        <Route index element={<Homescreen featuredTrips={sampleData}/>} /> 
        <Route path=":featuredTripName" element={<ItineraryFeatured featuredTrips={sampleData}/>} />
        <Route path=":featuredTripName/:eventName" element={<EventFeatured featuredTrips={sampleData}/>} />
        <Route path="plan" element={<Plan addTrip={addTrip}/>} />
        <Route path="mytrips" element={<Trips tripsData={tripsData}/> } />
        <Route path="/mytrips/:tripName" element={<Itinerary deleteItinerary={deleteItinerary} tripsData={tripsData}/>} />
        <Route path="/mytrips/:tripName/:eventName" element={<Event deleteEvent={deleteEvent} tripsData={tripsData}/> } />
        <Route path="eventform" element={<EventForm />} />
        <Route path="/mytrips/:tripName/eventform" element={<EventForm addEventToTrip={addEventToTrip} tripsData={tripsData}/>} />
        <Route path="eventPage" element={<Event tripsData={tripsData}/>} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
