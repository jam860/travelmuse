import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Trips } from './Trips';
import { Plan } from './Plan';
import { Homescreen } from './Homescreen';
import { Itinerary } from './Itinerary';
import { User } from './User';

function App() {
  return (
    <>
      <Navbar />
        <Routes>
        <Route path="plan" element={<Plan />} />
        <Route path="mytrips" element={<Trips />} />
        <Route path="mytrips/itinerary" element={<Itinerary />} /> {/* This is hard-coded, but you get the idea. Change later */}
        <Route index element={<Homescreen />} />  
        </Routes>
      <Footer />
    </>
  );
}

export default App;
