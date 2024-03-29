import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Trips } from './Trips';
import { PlanForm } from './PlanForm.js';
import { Homescreen } from './Homescreen';
import { Itinerary } from './Itinerary';
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
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  const db = getDatabase();

  // Switching Users
  useEffect(() => {
    onAuthStateChanged(getAuth(), function(firebaseUser) {
      if (firebaseUser) {
        firebaseUser.userId = firebaseUser.uid;
        setCurrentUser(firebaseUser);
        navigate("/");
      } else {
        setCurrentUser(null);
        setTripsData(USER_TRIPS);
      }
    });

  }, []);

  //https://stackoverflow.com/questions/36415904/is-there-a-way-to-use-map-on-an-array-in-reverse-order-with-javascript
  // Updating user changes
  useEffect(() => {
    if (currentUser != null && currentUser.userId != null) {
      const userDataRef = ref(db, currentUser.userId);
      onValue(userDataRef, (snapshot) => {
        const tripObjects = snapshot.val();
        if (tripObjects != null) {
          const tripObjectsKeys = Object.keys(tripObjects);
          const tripsArray = tripObjectsKeys.slice(0).reverse().map((key) => {
            const tripCopy = {...tripObjects[key]};
            tripCopy.key = key;
            if (tripCopy.events !== undefined) {
              const tripEventKeys = Object.keys(tripCopy.events);
              const tripCopyEvents = tripEventKeys.map((key) => {
                return {...tripCopy.events[key]};
              });
              tripCopy.events = tripCopyEvents;
            }
            return tripCopy;
          });
          setTripsData([...tripsArray]);
        } else {
          setTripsData(null);
        }
      });
    }
  }, [currentUser]);


  function addTrip(trip) {
    if (tripsData === null) {
      setTripsData([trip]);
      if (currentUser !== null) {
        const firebaseUserRef = ref(db, currentUser.userId);
        firebasePush(firebaseUserRef, trip)
        .then()
        .catch((err) => {
          return <p>Something went wrong! Please reload the page to try again.</p>;
        });
      }
    } else {
      setTripsData([trip, ...tripsData]);
        if (currentUser !== null) {
          const firebaseUserRef = ref(db, currentUser.userId);
          firebasePush(firebaseUserRef, trip) 
          .then()
          .catch((err) => {
            return <p>Something went wrong! Please reload the page to try again.</p>;
          });
        }
    }
  }

  function addEventToTrip(tripName, event) {
    let getKey = "";
    const trip = tripsData.find((trip) => {
      getKey = trip.key;
      return trip.tripName === tripName;
    });
    if (trip.events === undefined) {
      trip.events = [event];
    } else {
      trip.events.push(event);
    }
    if (currentUser !== null) {
      const firebaseUserRef = ref(db, currentUser.userId + "/" + getKey + "/events");
      firebasePush(firebaseUserRef, event)
      .then()
      .catch((err) => {
        return <p>Something went wrong! Please reload the page to try again.</p>;
      });
    }
  }

  // https://www.geeksforgeeks.org/remove-array-element-based-on-object-property-in-javascript/
  // could be more efficient
  function deleteEvent(tripName, eventName) {
    let getKey = "";
    let tripFilteredCopy;
    const newTripsData = tripsData.map((trip) => {
      if (trip.tripName === tripName) {
        getKey = trip.key;
        trip.events = trip.events.filter((event) => event.eventName !== eventName);
        tripFilteredCopy = trip.events;
      }
      return trip;
    });
    setTripsData(newTripsData);
    if (currentUser !== null) {
      const firebaseUserRef = ref(db, currentUser.userId + "/" + getKey + "/events");
      firebaseSet(firebaseUserRef, tripFilteredCopy)
      .then()
      .catch((err) => {
        return <p>Something went wrong! Please reload the page to try again.</p>;
      });
    }
  }

  function deleteItinerary(tripName) {
    let getKey = "";
    const newTripsData = tripsData.filter((trip) => {
      if (trip.tripName === tripName) {
        getKey = trip.key;
      }
      return trip.tripName !== tripName;
    });
    setTripsData(newTripsData);

    if (currentUser !== null) {
      const firebaseUserRef = ref(db, currentUser.userId + "/" + getKey);
      firebaseSet(firebaseUserRef, null)
      .then()
      .catch((err) => {
        return <p>Something went wrong! Please reload the page to try again.</p>;
      });
    }
  }  

  return (
    <>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route index element={<Homescreen featuredTrips={sampleData} currentUser={currentUser}/>} />
        <Route path=":featuredTripName" element={<ItineraryFeatured featuredTrips={sampleData} />} />
        <Route path=":featuredTripName/:eventName" element={<EventFeatured featuredTrips={sampleData} />} />
        <Route path="login" element={<SignIn />} />
        <Route path="plan" element={<PlanForm addTrip={addTrip} tripsData={tripsData} currentUser={currentUser}/>} />
        <Route path="mytrips" element={<Trips tripsData={tripsData} currentUser={currentUser} />} />
        <Route path="/mytrips/:tripName" element={<Itinerary deleteItinerary={deleteItinerary} tripsData={tripsData} />} />
        <Route path="/mytrips/:tripName/:eventName" element={<Event deleteEvent={deleteEvent} tripsData={tripsData} />} />
        <Route path="eventform" element={<EventForm tripsData={tripsData} />} />
        <Route path="/mytrips/:tripName/eventform" element={<EventForm addEventToTrip={addEventToTrip} tripsData={tripsData} />} />
        <Route path="eventPage" element={<Event tripsData={tripsData} />} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
      <Footer currentUser={currentUser}/>
    </>
  );
}

export default App;
