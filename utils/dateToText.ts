import React from "react";

export type FirebaseDateType = {
  seconds: number;
  nanoseconds: number;
};

export const dateToText = (createdAt: FirebaseDateType) => {
  const ca = (createdAt as any).toDate();

  return (
    ca.getFullYear() +
    ". " +
    ((ca.getMonth() as number) + 1) +
    "/" +
    ca.getDate() +
    " " +
    ca.getHours() +
    ": " +
    ca.getMinutes() +
    ""
  );
};
