import { Button } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { Dispatch, SetStateAction, useState } from "react";
import Sheet from "react-modal-sheet";

type BottomSheetProps = {
  isBottomOpen: boolean;
  setBottomOpen: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
};

const BottomSheet = ({
  isBottomOpen,
  setBottomOpen,
  children,
}: BottomSheetProps) => {
  return (
    <CustomSheet
      disableDrag={true}
      isOpen={isBottomOpen}
      onClose={() => setBottomOpen(false)}
      detent="content-height">
      <Sheet.Container>
        <Sheet.Content>
          <BottomModalContent>
            {children}
            <Button onClick={() => setBottomOpen(false)}>Close</Button>
          </BottomModalContent>
        </Sheet.Content>
      </Sheet.Container>
      <Sheet.Backdrop />
    </CustomSheet>
  );
};

export default React.memo(BottomSheet);

const CustomSheet = styled(Sheet)`
  display: flex;
  align-items: center;
  justify-content: center;
  .react-modal-sheet-drag-indicator {
    display: none;
  }
`;

const BottomModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  padding-top: 20px;

  .copy {
    width: 100%;
    text-align: left;
    font-weight: 700;
    padding: 10px 20px;
    span {
      margin-left: 10px;
    }
  }

  button {
    margin-top: 10px;
    width: 90%;
    background: white;
    border: 1px solid ${({ theme }) => theme.bgColor04};
  }
`;
