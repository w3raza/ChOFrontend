import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  List,
  ListItem,
  Link,
} from "@chakra-ui/react";
import Menu from "../components/Menu";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [value, setValue] = useState("");
  const [films, setFilms] = useState([]);
  const navigate = useNavigate();

  const fetchFilms = useCallback(async () => {
    await fetch(`https://movieappwz.azurewebsites.net/movies/${value}`)
      .then((response) => response.json())
      .then((data) => setFilms(data));
  }, [value]);

  useEffect(() => {
    fetchFilms();
  }, [fetchFilms]);

  return (
    <Box p={10}>
      <Menu />
      <Flex mt={50} justifyContent="center">
        <Link
          href="https://docs.google.com/document/d/1hnbPQaHGLd7E8qWwuOyIvSX-TZnDaRCS2sQSREHy7Ic/edit?usp=sharing"
          color="blue"
          target="_blank"
        >
          Link
        </Link>
        : do dokumentacji (zapomniałam dodać do zip-a)
      </Flex>
      <Flex mt={50} justifyContent="center">
        <Input
          w="50%"
          value={value}
          placeholder="Spiderman"
          onChange={(e) => setValue(e.target.value)}
        />
        <Button colorScheme="blackAlpha" ml={5} onClick={() => fetchFilms()}>
          Szukaj
        </Button>
      </Flex>
      <List mt={50} spacing={5} justifyContent="center">
        {films?.map((film, index) => {
          console.log(film);
          return (
            <ListItem
              bg="#314E89"
              w="60%"
              margin="0 auto"
              key={index}
              color="white"
              p={5}
              rounded={14}
              _hover={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => {
                navigate("/movie", { state: { film } });
              }}
            >
              {film.title}
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default HomePage;
