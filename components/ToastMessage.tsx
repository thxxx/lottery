import styled from "@emotion/styled";
import React from "react";

type ToastProps = {
  children: React.ReactNode;
};

const ToastMessage = ({ children }: ToastProps) => {
  return <ToastWrapper>{children}</ToastWrapper>;
};

export default ToastMessage;

const ToastWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 55px;
  border-radius: 6px;
`;
