import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "../../../api";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
function Orders() {
  const { isLoading, isError, data, error } = useQuery(
    ["admin:order"],
    fetchOrders
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error {error.message}</div>;

  return (
    <div>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>Orders</TableCaption>
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Address</Th>
              <Th isNumeric>Items</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item._id}>
                <Td>{item.user.email}</Td>
                <Td>{item.adress}</Td>
                <Td isNumeric>{item.items.length}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Orders;
