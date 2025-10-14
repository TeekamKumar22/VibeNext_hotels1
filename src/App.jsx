import Navbar from './components/Navbar';
import {Routes , Route} from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Homepage from './page/homepage';
import Hotels from './components/Dubai';
import Profile from './page/Profile';
import Room from './page/Rooms';
import Footer from './components/Footer';
function App( ) {

  return (
    <>
      <Navbar />
      <Routes>
        {/* Add other routes here */}
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/rooms/:slug' element={<Hotels/>} />
       <Route path='/room/:slug' element={<Room />} />
        <Route path='/profile' element={<Profile />} />
        {/* Add more routes as needed */}
        </Routes>
        <Footer />
    </>
  );
}

export default App
