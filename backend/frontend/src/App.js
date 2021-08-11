import NavigationBar from "./components/NavigationBar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import Store from "./components/Store";
import Cart from "./components/Cart";
import SearchResults from "./components/SearchResults";
import { ProvideAuth } from "./components/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProductDetail from "./components/ProductDetail";
import Home from "./components/Home";
import { ProvideCart } from "./components/CartContext";

const App = () => {
  return (
    <Router>
      <ProvideAuth>
        <ProvideCart>
          <NavigationBar />
          <Container fluid className="sc-body">
            <Row>
              <Col>
                <Container className="sc-content">
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/sign-in" component={SignIn} />
                    <Route path="/products-filter/" component={SearchResults} />
                    <Route path="/products/:id" component={ProductDetail} />
                    <PrivateRoute path="/profile" component={Profile} />
                    <PrivateRoute path="/store" component={Store} />
                    <PrivateRoute path="/cart" component={Cart} />
                  </Switch>
                </Container>
              </Col>
            </Row>
          </Container>
        </ProvideCart>
      </ProvideAuth>
    </Router>
  );
};

export default App;
