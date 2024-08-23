import { Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Cart from './components/Pages/Cart';
import NavBar from './components/NavBar/NavBar';
import CartTile from './components/Pages/CartTile';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart/:id' element={<Cart />} />
        <Route path='/cart/allproducts' element={<CartTile />} />
        <Route path='/admin' element={<AdminPanel />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
