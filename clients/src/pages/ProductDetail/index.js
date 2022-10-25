import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../../api";
import { useParams } from "react-router-dom";
import { Box, Text, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import moment from "moment";
import { useBasket } from "../../contexts/BasketContext";
import { useAuth } from "../../contexts/AuthContext";
function ProductDetail() {
  const { loggedIn } = useAuth();
  const { productId } = useParams();
  const { addToBasket, items } = useBasket();

  const { isLoading, isError, data } = useQuery(["product", productId], () =>
    fetchProduct(productId)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error {isError.message}</div>;

  const findBasketItem = items.find((item) => item._id === productId);
  const images = data.photos.map((url) => ({ original: url }));

  return (
    <Box>
      <Text as={"h4"} fontWeight="bold" fontSize={"2xl"}>
        {data.title}
      </Text>
      <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
      <Text>{data.description}</Text>
      <Box m={10}>
        <ImageGallery items={images} />
      </Box>
      {loggedIn && (
      <Button
        colorScheme={findBasketItem ? "orange" : "green"}
        m="10"
        onClick={() => addToBasket(data, findBasketItem)}
      >
        {findBasketItem ? "Remove from basket" : "Add to basket"}
      </Button>)}
    </Box>
  );
}

export default ProductDetail;
