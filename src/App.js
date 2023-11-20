import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import { SignIn } from './SignIn.js';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set as firebaseSet, push as firebasePush, onValue } from 'firebase/database';

import SAMPLE_TRIPS from "./data/featuredData.json";
import USER_TRIPS from "./data/userData.json";

function App() {
  let sampleData = SAMPLE_TRIPS; //use featuredData.json for home page;
  let [tripsData, setTripsData] = useState(USER_TRIPS);
  let [tripsDataTest, setTripsTest] = useState(USER_TRIPS);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const db = getDatabase();

  useEffect(() => {
    onAuthStateChanged(getAuth(), function (firebaseUser) {
      if (firebaseUser) {
        console.log("logging in...")
        firebaseUser.userId = firebaseUser.uid;
        // navigate("/mytrips");
        setCurrentUser(firebaseUser);
        const firebaseUserRef = ref(db, firebaseUser.userId);
      } else {
        setCurrentUser(null);
        console.log("logging out...")
        setTripsData(USER_TRIPS);
      }
    });

  }, []);


  useEffect(() => {
    if (currentUser != null && currentUser.userId != null) {
      const userDataRef = ref(db, currentUser.userId);
      onValue(userDataRef, (snapshot) => {
        const tripObjects = snapshot.val();
        if (tripObjects != null) {
          const tripObjectsKeys = Object.keys(tripObjects);
          const tripsArray = tripObjectsKeys.map((key) => {
            return tripObjects[key];
          });
          // console.log(tripsArray);
          // setTripsTest(tripsArray);
          setTripsData([...tripsArray]);
          // console.log(tripsData);
        }
      });
    }
  }, [currentUser]);

  function addTrip(trip) {
    tripsData.unshift(trip);
  }

  function addEventToTrip(tripName, event) {
    const trip = tripsData.find((trip) => {
      return trip.tripName === tripName;
    });
    if (trip) {
      trip.events.push(event);
    }
  }

  // https://www.geeksforgeeks.org/remove-array-element-based-on-object-property-in-javascript/
  function deleteEvent(tripName, eventName) {
    const newTripsData = tripsData.map((trip) => {
      if (trip.tripName === tripName) {
        trip.events = trip.events.filter((event) => event.eventName !== eventName);
      }
      return trip;
    });
    setTripsData(newTripsData);
  }

  function deleteItinerary(tripName) {
    const newTripsData = tripsData.filter((trip) => {
      return trip.tripName !== tripName;
    });
    setTripsData(newTripsData);
  }


  return (
    <>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route index element={<Homescreen featuredTrips={sampleData} />} />
        <Route path=":featuredTripName" element={<ItineraryFeatured featuredTrips={sampleData} />} />
        <Route path=":featuredTripName/:eventName" element={<EventFeatured featuredTrips={sampleData} />} />
        <Route path="login" element={<SignIn />} />
        <Route path="plan" element={<Plan addTrip={addTrip} />} />
        <Route path="mytrips" element={<Trips tripsData={tripsData} currentUser={currentUser} />} />
        <Route path="/mytrips/:tripName" element={<Itinerary deleteItinerary={deleteItinerary} tripsData={tripsData} />} />
        <Route path="/mytrips/:tripName/:eventName" element={<Event deleteEvent={deleteEvent} tripsData={tripsData} />} />
        <Route path="eventform" element={<EventForm />} />
        <Route path="/mytrips/:tripName/eventform" element={<EventForm addEventToTrip={addEventToTrip} tripsData={tripsData} />} />
        <Route path="eventPage" element={<Event tripsData={tripsData} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
