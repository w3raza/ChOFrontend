import {
  Button,
  Flex,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { DeleteModal } from "./DeleteModal";

const Director = ({ name, born, description }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const showToast = useToast();

  const deleteItem = async () => {
    await fetch(`https://cho.azurewebsites.net/cast/delete/${name}`, {
      method: "DELETE",
    });

    showToast({
      title: name,
      description: `${name} został usunięty`,
      status: "success",
      isClosable: true,
    });

    onClose();
  };

  return (
    <Flex
      position="relative"
      flexDir="column"
      p={10}
      w="40%"
      bg="white"
      rounded={14}
      boxShadow="xl"
      pb={20}
      mb={5}
    >
      <Heading color="black">{name}</Heading>
      <Flex mt={5}>
        <Text mr={5} color="black">
          Data urodzenia:{" "}
        </Text>
        <Text color="black">{born}</Text>
      </Flex>
      <Flex mt={3}>
        <Text mr={5} color="black">
          Opis:{" "}
        </Text>
        <Text color="black">{description}</Text>
      </Flex>
      <Button
        onClick={onOpen}
        colorScheme="facebook"
        position="absolute"
        bottom={5}
        right={5}
      >
        Usuń
      </Button>
      <DeleteModal
        onClose={onClose}
        isOpen={isOpen}
        title={name}
        deleteItem={deleteItem}
      />
    </Flex>
  );
};

export default Director;
