import Home from "./Home";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import NewProduct from "./Products/new";
import Orders from "./Orders";
import { Link, Switch, useRouteMatch, Route } from "react-router-dom";
import "./style.css";
function Admin() {
  const { url, path } = useRouteMatch();

  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to={`${url}`}>Home</Link>
          </li>
          <li>
            <Link to={`${url}/products`}>Products</Link>
          </li>
          <li>
            <Link to={`${url}/orders`}>Orders</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path={`${path}`} component={Home} />
        <Route path={`${path}/orders`} component={Orders} />
        <Route exact path={`${path}/products`} component={Products} />
        <Route exact path={`${path}/products/new`} component={NewProduct} />
        <Route
          path={`${path}/products/:product_id`}
          component={ProductDetail}
        />
      </Switch>
    </div>
  );
}

export default Admin;
