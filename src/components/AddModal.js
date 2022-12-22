import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("imię jest wymagane"),
  description: yup.string().required("opis jest wymagany"),
  born: yup.string().required("rok urodzenia jest wymagany"),
});

export function AddModal({ isOpen, onClose, endpoint, title }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const showToast = useToast();

  const submitHandler = async (data) => {
    console.log(data);
    await fetch(`https://chomoviebackend.azurewebsites.net/cast/${endpoint}`, {
      crossDomain: true,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        description: data.description,
        born: data.born,
      }),
    });

    reset();
    onClose();
    showToast({
      title,
      description: `${title} został dodany`,
      status: "success",
      isClosable: true,
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={10}>
            <form onSubmit={handleSubmit(submitHandler)}>
              <FormLabel htmlFor="name">Imię Nazwisko</FormLabel>
              <Input alignSelf="self-start" {...register("name")} type="text" />
              <Text color="red" fontSize={14}>
                {errors.name?.message}
              </Text>

              <FormLabel mt={3} textAlign="start" htmlFor="description">
                Opis
              </FormLabel>
              <Textarea id="description" {...register("description")} />
              <Text color="red" fontSize={14}>
                {errors.description?.message}
              </Text>

              <FormLabel mt={3} htmlFor="born">
                Rok urodzenia
              </FormLabel>
              <Input
                placeholder="yyyy-mm-dd"
                id="born"
                {...register("born")}
                type="text"
              />
              <Text color="red" fontSize={14}>
                {errors.born?.message}
              </Text>
              <Button colorScheme="facebook" mt={3} w="100%" type="submit">
                Dodaj
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
