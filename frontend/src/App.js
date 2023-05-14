import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import HomeScreen from './components/Screen/HomeScreen';
import ProductScreen from './components/Screen/ProductScreen';
import { Navbar, Container, Nav, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Store } from './components/Store';
import { useContext } from 'react';

function App() {
  const { state } = useContext(Store);

  // const { Cart } = state;
  console.log('state ', state.Cart);

  return (
    <div className="d-flex flex-column site-container">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Amazon</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className="nav-Link">
                Cart
                {/* <Badge pill bg="danger">
                  {Cart.CartItems.length}
                </Badge> */}
                {state.Cart.CartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {state.Cart.CartItems.length}
                  </Badge>
                )}
              </Link>
            </Nav>
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
