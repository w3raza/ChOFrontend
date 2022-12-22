import { Button, Box, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AddMovieForm from "./AddMovieForm";

const AddPage = () => {
  const navigate = useNavigate();
  return (
    <Box p={10} w="100vw" h="100vh">
      <Button
        colorScheme="facebook"
        alignItems="center"
        justifyContent="space-around"
        onClick={() => navigate("/")}
      >
        Wróć
      </Button>

      <Heading textAlign="center">Dodaj Film</Heading>
      <AddMovieForm />
    </Box>
  );
};

export default AddPage;
