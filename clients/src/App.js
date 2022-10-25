import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Nav from "./components/Navbar";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import Profile from './pages/Profile';
import Products from './pages/Products';
import Basket from './pages/Basket';
import Admin from './pages/Admin';
import ProductDetail from './pages/ProductDetail';
import ProtectedRoute from "./pages/ProtectedRoute";
import Error404 from "./pages/Error404";
function App() {
  return (        
    <Router>
      <div>
        <Nav />
        <div id="content">
          <Switch>
            <Route exact path="/" component={Products} />
            <Route path="/product/:productId" component={ProductDetail} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Route path="/basket" component={Basket} />
            <ProtectedRoute path="/profile" component={Profile} />
            <ProtectedRoute path="/admin" component={Admin} admin={true} />
            <Route path="*" component={Error404} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}



export default App;
