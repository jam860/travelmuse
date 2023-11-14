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

function App() {
  //deleting this soon, dont use this
  const itinerariesData = [
    {title: "Dazzling Kyoto", firstStop: "Nijo Castle", image: "/img/kyoto-3.jpg"},
    {title: "GirlsinCanada", firstStop: "Green Clover Canada", image: "/img/canada.jpeg"},
    {title: "Wine in Italy", firstStop: "Frutti & Gelato", image: "/img/italy.jpeg"},
    {title: "Clubbing in Korea", firstStop: "The Weekend Hongdae Club", image: "/img/korea.jpg"}
  ];

  //use this data
  let tripsData = [
    {
        tripName: "Dazzling Kyoto", startDate: "2024-06-01", endDate: "2024-06-02", destination: "Japan", notes: "", photo: "/img/kyoto-3.jpg",
        events: [{ eventName: "Leave Kyoto", date: "2024-06-02", startTime: "08:00", endTime: "10:00", address: "541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan", eventType: "Activity", img: "/img/airport-kyoto.jpg", notes: "" },
        { eventName: "Land in Kyoto", date: "2024-06-01", startTime: "08:00", endTime: "10:00", address: "1 Senshukukokita, Izumisano, Osaka 549-0001, Japan", eventType: "Activity", img: "/img/airport-kyoto.jpg", notes: "" },
        { eventName: "Nijo Castle", date: "2024-06-01", startTime: "10:00", endTime: "11:00", address: "541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan", eventType: "Activity", img: "/img/nijo-castle.jpg", notes: "" },
        { eventName: "Lunch", date: "2024-06-01", startTime: "12:00", endTime: "14:00", address: "902 Higashishiokojicho, Shimogyo Ward, 600-8216, Japan", eventType: "Activity", img: "/img/ramen.jpg", notes: "" },
        { eventName: "Dinner", date: "2024-06-01", startTime: "18:00", endTime: "20:00", address: "541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan", eventType: "Activity", img: "/img/ramen.jpg", notes: "" },
        { eventName: "Eat at Kyoto Airport", date: "2024-06-02", startTime: "07:00", endTime: "08:00", address: "541 Nijōjōchō, Nakagyo Ward, Kyoto, 604-8301, Japan", eventType: "Activity", img: "/img/airport-kyoto.jpg", notes: "" }]
    },
    { tripName: "GirlsinCanada",
      startDate: "2024-07-01",
      endDate: "2024-07-02",
      destination: "Canada",
      notes: "",
      photo: "/img/canada.jpeg",
      events: []
    },
    {
      tripName: "Wine in Italy", 
      startDate: "2024-08-01",
      endDate: "2024-08-02",
      destination: "Italy", 
      notes: "",
      photo: "/img/italy.jpeg",
      events: []
    },
    { tripName: "Clubbing in Korea",
      startDate: "2024-09-01",
      endDate: "2024-09-02",
      destination: "South Korea",
      notes: "",
      photo: "/img/korea.jpg",
      events: []
    }

    //create more external data using chatgpt potentially
  ];

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
        {/* <Route path="/mytrips/:tripName/eventform" element={<EventForm tripsData={tripsData}/>} />  */}
        <Route path="/mytrips/:tripName/:eventName" element={<Event tripsData={tripsData}/> } />
        {/* testing event form... */}
        <Route path="eventform" element={<EventForm />} />
        <Route path="/mytrips/:tripName/eventform" element={<EventForm addEventToTrip={addEventToTrip} tripsData={tripsData}/>} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
