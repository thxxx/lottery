import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
} from "@chakra-ui/react";
import { LOCAL_ID } from "../pages/index";
import styled from "@emotion/styled";
import { authService, dbService, firebaseInstance } from "../utils/fbase";

type AskModelProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const AskModal = ({ isOpen, onClose, onOpen }: AskModelProps) => {
  const [who, setWho] = useState("");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  const sendRequest = async () => {
    let provider;
    provider = new firebaseInstance.auth.GoogleAuthProvider();

    await authService
      .signInWithPopup(provider)
      .then((res) => {
        console.log("Successfully Logged In!");
      })
      .catch((err) => {
        console.log("Err occured! ", err);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <CustomModalContent>
        <ModalHeader>Log In</ModalHeader>
        {/* <ModalCloseButton /> */}
        <CustomModalBody>
          <p>Thank you for visiting AID.</p>
          <p>Please Log in first!</p>
        </CustomModalBody>
        <ModalFooter>
          <Button mb={3} width="100%" onClick={() => sendRequest()}>
            Google LogIn
          </Button>
        </ModalFooter>
      </CustomModalContent>
    </Modal>
  );
};

export default React.memo(AskModal);

const CustomModalContent = styled(ModalContent)`
  border: 2px solid rgba(0, 0, 0, 0.8);
  font-size: 1.1em;
  color: rgba(0, 0, 0, 0.9);
  width: 90%;
`;

const CustomModalBody = styled(ModalBody)`
  padding: 15px 25px;
  font-weight: 500;

  .label {
    padding: 10px 0px;
    margin-top: 5px;
  }
  p {
    margin-bottom: 5px;
    font-weight: 500;
  }
`;
