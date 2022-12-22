import React from "react";
import {
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Flex,
  useToast,
  Text,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const schema = yup.object().shape({
  title: yup.string().required("tytuł jest wymagany"),
  description: yup.string().required("opis jest wymagany"),
  genre: yup.string().required("gatunek jest wymagany"),
  year: yup.string().required("rok produkcji jest wymagany"),
});

const AddMovieForm = () => {
  const showToast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    await fetch("https://cho.azurewebsites.net/movies/create", {
      crossDomain: true,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        description: data.description,
        year: data.year,
        genre: data.genre,
      }),
    }).catch((err) => {
      console.log(err);
    });

    showToast({
      title: "Film",
      description: "Film został stworzony",
      status: "success",
      isClosable: true,
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex flexDir="column" margin="0 auto" w="50%" mt={10}>
        <FormLabel htmlFor="title">Tytuł</FormLabel>
        <Input alignSelf="self-start" {...register("title")} type="text" />
        <Text color="red" fontSize={14}>
          {errors.title?.message}
        </Text>

        <FormLabel mt={3} textAlign="start" htmlFor="description">
          Opis
        </FormLabel>
        <Textarea id="description" {...register("description")} />
        <Text color="red" fontSize={14}>
          {errors.description?.message}
        </Text>

        <FormLabel mt={3} htmlFor="year">
          Rok produkcji
        </FormLabel>
        <Input id="year" {...register("year")} type="text" />
        <Text color="red" fontSize={14}>
          {errors.year?.message}
        </Text>
        <FormLabel mt={3} htmlFor="genre">
          Gatunek
        </FormLabel>
        <Select id="genre" {...register("genre")}>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Thriller">Thriller</option>
          <option value="Romance">Romance</option>
        </Select>
        <Button w="100%" type="submit" mt={4} colorScheme="facebook">
          Dodaj
        </Button>
      </Flex>
    </form>
  );
};

export default AddMovieForm;
