import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import AppBar from "../components/AppBar";
import { MainContainer } from "./chat/style";

const MyPage: NextPage = () => {
  const [radio, setRadio] = useState<string>("found");
  const [saves, setSaves] = useState();

  useEffect(() => {}, []);

  return (
    <>
      <AppBar page="my" onClick={setRadio} />
      <MainContainer>{radio}</MainContainer>
    </>
  );
};

export default MyPage;
