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

  // const sendRequest = async () => {
  //   const uuid = localStorage.getItem(LOCAL_ID);
  //   const body = {
  //     who: who,
  //     feedback: feedback,
  //     email: email,
  //     uid: uuid,
  //   };
  //   await dbService.collection("request").add(body);
  //   setWho("");
  //   setFeedback("");
  //   setEmail("");
  //   onClose();
  // };

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
          <Button width="100%" onClick={() => sendRequest()}>
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
`;

const CustomModalBody = styled(ModalBody)`
  .label {
    padding: 10px 0px;
    margin-top: 5px;
  }
  p {
    margin-bottom: 5px;
    font-weight: 700;
  }
`;

// <p>You can use only 5 times.</p>
// <p>
//   If you want more, please tell us! We will let you use in 5 minutes.
// </p>
// <p className="label">Who are you?</p>
// <Input
//   value={who}
//   onChange={(e) => setWho(e.currentTarget.value)}
//   placeholder="Ex. Software developer"
// />
// <p className="label">
//   What do you like or dislike the most of Solomon?
// </p>
// <Input
//   value={feedback}
//   onChange={(e) => setFeedback(e.currentTarget.value)}
//   placeholder="Ex. I want more specific solution"
// />
// <p className="label">We will let you know after take action.</p>
// <Input
//   value={email}
//   onChange={(e) => setEmail(e.currentTarget.value)}
//   placeholder="Ex. contact@diceyai.com"
// />
