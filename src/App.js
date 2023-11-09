import { Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { Trips } from './Trips';

function App() {
  return (
    <div>
      <Navbar />
        <Routes>
          <Route path="mytrips" element={<Trips />} />
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
