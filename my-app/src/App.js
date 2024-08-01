import { Routes, Route } from 'react-router-dom';
import Home from './components/Pages/Home';
import Cart from './components/Pages/Cart';
import NavBar from './components/NavBar/NavBar';
import CartTile from './components/Pages/CartTile';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart/:id' element={<Cart />} />
        <Route path='/cart/allproducts' element={<CartTile />} />
      </Routes>
    </div>
  );
}

export default App;
