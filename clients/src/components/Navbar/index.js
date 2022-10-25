import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import style from "./styles.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { useBasket } from "../../contexts/BasketContext";
function Nav() {
  const { loggedIn, user } = useAuth();
  const { items } = useBasket();
  return (
    <nav className={style.nav}>
      <div className={style.left}>
        <div className={style.logo}>
          <Link to="/">eCommerce</Link>
        </div>

        <ul className={style.menu}>
          <li>
            <Link to="/">Products</Link>
          </li>
        </ul>
      </div>
      <div className={style.right}>
        {!loggedIn && (
          <>
            <Link to="/signin">
              <Button colorScheme="pink">Login</Button>
            </Link>
            <Link to="/signup">
              <Button colorScheme="pink">Register</Button>
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {items.length > 0 && (
              <Link to="basket">
                <Button color="green" variant="outline">
                  Basket {items.length}
                </Button>
              </Link>
            )}

            {user?.role === "admin" && (
              <Link to="/admin">
                <Button mr={"1"} colorScheme={"linkedin"} variant="ghost">
                  Admin
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button>Profile</Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
