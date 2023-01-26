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
  const options = [1, 2, 3, 4, 5];
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(1);
  const toast = useToast();

  const sendFeedback = () => {
    if (feedback.length < 3) return;
    const body = {
      createdAt: new Date(),
      rating: rating,
      content: feedback,
      problemId: problem,
    };
    dbService.collection("feedback").add(body);
    setRating(1);
    setFeedback("");
    toast({ description: "Thank you for feedback." });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <CustomModalContent>
        <ModalHeader>Thank you for Feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Rating : How was your experience?</p>
          <RadioBox>
            {options.map((value) => {
              return (
                <Radio
                  className="radio"
                  key={value}
                  onClick={() => setRating(value)}
                  isClicked={rating === value}>
                  {value}
                </Radio>
              );
            })}
          </RadioBox>

          <Textarea
            placeholder="Ex. the link is not working"
            value={feedback}
            mt={5}
            rows={4}
            onChange={(e) => setFeedback(e.currentTarget.value)}
            resize="none"
          />
          <Label>If you want to get reply, let us know you email.</Label>
          <Input placeholder="contact@diceyai.com" />
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => sendFeedback()}>Send</Button>
        </ModalFooter>
      </CustomModalContent>
    </Modal>
  );
};

export default React.memo(FeedbackModal);

const Label = styled.p`
  margin-top: 5px;
  padding: 15px 0px;
`;

const CustomModalContent = styled(ModalContent)`
  border: 2px solid rgba(0, 0, 0, 0.8);
  font-size: 1.1em;
  color: rgba(0, 0, 0, 0.9);

  @media (max-width: 500px) {
    font-size: 14px;
    width: 90%;
  }
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  width: 100%;
`;

const Radio = styled.button<{ isClicked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border: 1px solid ${({ theme }) => theme.grey};
  background: ${({ isClicked, theme }) =>
    isClicked ? theme.blue01 + "aa" : "white"};

  &:focus {
    outline: 2.5px solid ${({ theme }) => theme.darkGrey + "44"};
  }
`;
