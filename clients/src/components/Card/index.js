import { Box, Button, Image } from "@chakra-ui/react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
import { useAuth } from "../../contexts/AuthContext";
function Card({ item }) {
  const { loggedIn } = useAuth();
  const { addToBasket, items } = useBasket();
  const findBasketItem = items.find((product) => product._id === item._id);

  return (
    <Box borderWidth={"1px"} borderRadius={"lg"} overflow={"hidden"} p={"3"}>
      <Link to={`/product/${item._id}`}>
        <Image src={item.photos[0]} loading="lazy" />
        <Box p={"6"}>
          <Box display={"flex"} alignItems={"baseline"}>
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </Box>
          <Box mt={"4"} fontWeight={"semibold"} lineHeight={"normal"} as={"h4"}>
            {item.title}
          </Box>
          <Box>{item.price} TL</Box>
        </Box>
      </Link>
      {loggedIn && (
        <>
          
          <Button
            onClick={() => addToBasket(item, findBasketItem)}
            colorScheme={findBasketItem ? "orange" : "green"}
          >
            {findBasketItem ? "Remove from basket" : "Add to basket"}
          </Button>
        </>
      )}
    </Box>
  );
}

export default Card;
