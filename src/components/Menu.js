import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Button onClick={() => navigate("/")} colorScheme="facebook">
        Strona główna
      </Button>
      <Button onClick={() => navigate("/dodaj")} colorScheme="facebook">
        Dodaj film
      </Button>
    </Flex>
  );
};

export default Menu;
