import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './components/Screen/HomeScreen';
import ProductScreen from './components/Screen/ProductScreen';
function App() {
  return (
    <div>
      <header>
        <Link to="/">Amazon</Link>
      </header>
      <main>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/" element={<HomeScreen />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
