import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './components/Screen/HomeScreen';
import ProductScreen from './components/Screen/ProductScreen';
import { Navbar, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
function App() {
  return (
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Amazon</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
        {/* <Link to="/">Amazon</Link> */}
      </header>
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center">All Rights Reserved</div>
      </footer>
    </div>
  );
}

export default App;
