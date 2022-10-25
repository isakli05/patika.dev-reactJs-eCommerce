import {
  Box,
  Alert,
  AlertIcon,
  Text,
  Image,
  Button,
  Grid,
  Textarea,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  useDisclosure,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useBasket } from "../../contexts/BasketContext";
import { useRef, useState } from "react";
import { orderPost } from "../../api";

function Basket() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const [address, setAddress] = useState("");
  const { items, removeToBasket, emptyBasket } = useBasket();
  const total = items.reduce((acc, obj) => acc + obj.price, 0);

  const handleSubmit = async () => {
    const ordersIds = items.map((item) => item._id);

    const input = {
      address,
      items: JSON.stringify(ordersIds),
    };

    await orderPost(input);
    emptyBasket();
    onClose();
  };

  return (
    <Box>
      {items.length < 1 && (
        <Alert status="warning">
          <AlertIcon />
          You have not any items in your basket!!!
        </Alert>
      )}

      {items.length > 0 && (
        <>
          <Grid templateColumns="repeat(4, 1fr)">
            {items.map((item) => (
              <Box key={item._id}>
                <Link to={`/product/${item._id}`}>
                  <Text>{item.title}</Text>
                  <Image
                    loading="lazy"
                    htmlWidth={230}
                    src={item.photos[0]}
                    alt="basket item"
                  />
                </Link>

                <Button
                  _hover={{ bgColor: "pink" }}
                  mt={"2"}
                  size={"sm"}
                  onClick={() => removeToBasket(item._id)}
                >
                  Remove from Basket
                </Button>
              </Box>
            ))}
          </Grid>

          <Box mt={"16"}>
            <Text fontSize={"2xl"}>Total Price: {total} TL</Text>
          </Box>

          <Box mt={"2"}>
            <Button colorScheme={"green"} size={"sm"} onClick={onOpen}>
              Order
            </Button>
          </Box>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Enter Your Address</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Textarea
                    ref={initialRef}
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  onClick={() => handleSubmit()}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Box>
  );
}

export default Basket;
