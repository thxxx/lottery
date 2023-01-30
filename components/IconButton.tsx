import { Tooltip } from "@chakra-ui/react";
import styled from "@emotion/styled";
import React, { ReactNode } from "react";

type IconButtonProps = {
  icon?: ReactNode;
  tooltip?: string;
  text?: string;
  onClick: () => void;
};

const IconButton = ({ icon, tooltip, text, onClick }: IconButtonProps) => {
  return (
    <Tooltip label={tooltip} fontSize="md">
      <IconWrapper onClick={onClick}>{icon}</IconWrapper>
    </Tooltip>
  );
};

export default React.memo(IconButton);

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 100px;
  cursor: pointer;
  margin-right: 4px;

  img {
    width: 25px;
    height: 25px;
  }

  &:hover {
    background: ${({ theme }) => theme.hoverBlue};
  }

  @media (max-width: 800px) {
    width: 35px;
    height: 35px;

    img {
      width: 20px;
      height: 20px;
    }
  }
`;
