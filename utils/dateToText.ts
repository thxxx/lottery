import React from "react";

export type FirebaseDateType = {
  seconds: number;
  nanoseconds: number;
};

export const dateToText = (createdAt: number) => {
  const ca = new Date(createdAt);

  return (
    ((ca.getMonth() as number) + 1 < 10
      ? "0" + String((ca.getMonth() as number) + 1)
      : String((ca.getMonth() as number) + 1)) +
    "/" +
    ca.getDate() +
    "/" +
    String(ca.getFullYear()).slice(2) +
    " " +
    ca.getHours() +
    ":" +
    ca.getMinutes() +
    ""
  );
};
