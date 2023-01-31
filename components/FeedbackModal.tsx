import { Box, Input, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { dbService } from "../utils/fbase";
import styled from "@emotion/styled";
import { useToast } from "@chakra-ui/react";
import { CustomButton } from "./AppBar";

type FeedbackModelProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  problem?: string;
};

const FeedbackModal = ({
  isOpen,
  onOpen,
  onClose,
  problem = "main",
}: FeedbackModelProps) => {
  const [feedback, setFeedback] = useState("");
  const [mail, setMail] = useState("");
  const [job, setJob] = useState("");
  const toast = useToast();

  const sendFeedback = async () => {
    if (feedback.length < 3 || mail.length < 3) return;
    const body = {
      createdAt: new Date(),
      content: feedback,
      problemId: problem,
      job: job,
      mail: mail,
    };
    await dbService.collection("feedback").add(body);
    setFeedback("");
    setJob("");
    setMail("");
    toast({ description: "Thank you for feedback." });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <CustomModalContent>
        <ModalHeader>Thank you for Feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={0}>
          <Label>Content</Label>
          <Textarea
            placeholder="Ex. the link is not working"
            value={feedback}
            rows={4}
            onChange={(e) => setFeedback(e.currentTarget.value)}
          />
          <Label>Job</Label>
          <Input
            value={job}
            onChange={(e) => setJob(e.currentTarget.value)}
            placeholder="ex) student / developer ..."
          />
          <Label>Email</Label>
          <Input
            value={mail}
            onChange={(e) => setMail(e.currentTarget.value)}
            placeholder="contact@diceyai.com"
          />
        </ModalBody>
        <ModalFooter>
          <CustomButton onClick={() => sendFeedback()}>Send</CustomButton>
        </ModalFooter>
      </CustomModalContent>
    </Modal>
  );
};

export default React.memo(FeedbackModal);

const Label = styled.p`
  margin-top: 10px;
  margin-left: 3px;
  padding: 3px 0px;
  font-weight: 700;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.9);
`;

const CustomModalContent = styled(ModalContent)`
  border: 2px solid rgba(0, 0, 0, 0.8);
  font-size: 1.1em;
  color: rgba(0, 0, 0, 0.9);

  input {
    padding: 10px;
  }

  @media (max-width: 500px) {
    font-size: 14px;
    width: 90%;
  }
`;
