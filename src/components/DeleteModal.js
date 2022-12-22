import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

export function DeleteModal({ isOpen, onClose, deleteItem, title }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Czy na pewno chcesz usunąć ten element?</Text>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={onClose}>
              Nie
            </Button>
            <Button
              colorScheme="facebook"
              ml={3}
              onClick={() => {
                deleteItem();
                onClose();
              }}
            >
              Tak
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
