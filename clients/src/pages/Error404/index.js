import { Box, Alert,AlertIcon } from "@chakra-ui/react";

function Error404() {
  return (
    <Box>
      <Alert status="error">
        <AlertIcon />
        This page not found
      </Alert>
    </Box>
  );
}

export default Error404;
