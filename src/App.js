import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Trips } from './Trips';
import { Plan } from './Plan';
import { Homescreen } from './Homescreen';
import { Itinerary } from './Itinerary';
import { User } from './User';
import { EventForm } from './EventForm.js';

function App() {
  const itinerariesData = [
    {title: "Dazzling Kyoto", firstStop: "Nijo Castle", image: "/img/kyoto-3.jpg"},
    {title: "#GirlsinCanada", firstStop: "Green Clover Canada", image: "/img/canada.jpeg"},
    {title: "Wine in Italy", firstStop: "Frutti & Gelato", image: "/img/italy.jpeg"},
    {title: "Clubbing in Korea", firstStop: "The Weekend Hongdae Club", image: "/img/korea.jpg"}
  ];

  return (
    <>
      <Navbar />
        <Routes>
        <Route path="plan" element={<Plan />} />
        <Route path="mytrips" element={<User /> } >
          <Route index element={<Trips itineraries={itinerariesData}/>} />
          <Route path=":tripName" element={<Itinerary />} />
          {/* <Route path="mytrips/itinerary" element={<Itinerary />} />  This is hard-coded, but you get the idea. Change later */}
        </Route>
        <Route index element={<Homescreen />} />  
        <Route path="newEvent" element={<EventForm />}  />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
