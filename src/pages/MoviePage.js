import {
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddModal } from "../components/AddModal";
import { DeleteModal } from "../components/DeleteModal";
import Director from "../components/Director";

const MoviePage = () => {
  const {
    state: { film },
  } = useLocation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isAddActorOpen,
    onOpen: onAddActorOpen,
    onClose: onAddActorClose,
  } = useDisclosure();
  const {
    isOpen: isAddDirectorOpen,
    onOpen: onAddDirectorOpen,
    onClose: onAddDirectorClose,
  } = useDisclosure();
  const showToast = useToast();

  const deleteFilm = async () => {
    await fetch(
      `https://movieappwz.azurewebsites.net/movies/delete/${film.title}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    showToast({
      title: "Film",
      description: "Film został usunięty",
      status: "success",
      isClosable: true,
    });
    navigate(-1);
  };

  return (
    <Flex flexDir="column" p={10} minH="100vH" bg="#314E89" boxShadow="xl">
      <Heading color="white">{film.title}</Heading>
      <Flex mt={5}>
        <Text mr={5} color="white">
          Opis:{" "}
        </Text>
        <Text color="white">{film.description}</Text>
      </Flex>
      <Flex mt={3}>
        <Text mr={5} color="white">
          Gatunek:{" "}
        </Text>
        <Text color="white">{film.genre}</Text>
      </Flex>
      <Flex mt={3}>
        <Text mr={5} color="white">
          Rok produkcji:{" "}
        </Text>
        <Text color="white">{film.year}</Text>
      </Flex>
      <Heading mb={10} color="white" textAlign="center">
        Aktorzy
        <Button
          position="absolute"
          color="black"
          right={10}
          onClick={onAddActorOpen}
        >
          Dodaj Aktora
        </Button>
      </Heading>
      <Flex w="100%" flexWrap="wrap" justifyContent="space-between">
        {film?.actors.map(({ name, description, born }, index) => (
          <Director
            key={index}
            name={name}
            description={description}
            born={born}
          />
        ))}
      </Flex>
      <Heading my={10} color="white" textAlign="center">
        Twórcy
        <Button
          position="absolute"
          color="black"
          right={10}
          onClick={onAddDirectorOpen}
        >
          Dodaj Twórcę
        </Button>
      </Heading>
      <Flex w="100%" flexWrap="wrap" justifyContent="space-between">
        {film?.directors.map(({ name, description, born }, index) => (
          <Director
            key={index}
            name={name}
            description={description}
            born={born}
          />
        ))}
      </Flex>
      <Flex position="absolute" right={10}>
        <Button onClick={() => navigate(-1)}>Wróć</Button>
        <Button ml={5} onClick={onOpen}>
          Usuń film
        </Button>
      </Flex>
      <DeleteModal
        title={film.title}
        isOpen={isOpen}
        onClose={onClose}
        deleteItem={deleteFilm}
      />
      <AddModal
        isOpen={isAddActorOpen}
        onClose={onAddActorClose}
        title={"Aktor"}
        endpoint={`actor/${film.title}`}
      />
      <AddModal
        isOpen={isAddDirectorOpen}
        onClose={onAddDirectorClose}
        title={"Twórca"}
        endpoint={`director/${film.title}`}
      />
    </Flex>
  );
};

export default MoviePage;
