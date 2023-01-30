import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <div className="logo">AID</div>
        <div className="middle">
          <span className="sentence">Get all answers you need</span>
          <span>contact@diceyai.com</span>
        </div>
        <div className="site">© 2023 Dice, Inc. All rights reserved.</div>
      </div>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  display: flex;
  flex: 1;
  padding: 2rem 0;
  border-top: 1px solid #eaeaea;
  padding: 40px 5vw;
  background: #121826;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 600;
  justify-content: center;
  align-items: center;

  position: absolute;
  width: 100%;
  left: 0px;
  bottom: 0px;

  @media (max-width: 600px) {
    font-size: 13px;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 700px;
    z-index: 1;

    @media (max-width: 900px) {
      width: 100%;
    }
  }

  .logo {
    width: 100%;
    text-align: left;
    font-size: 1.8em;
    font-weight: 700;
    color: white;
  }

  .middle {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 40px;
    border-bottom: 1px solid rgba(255, 255, 255, 1);
    padding: 10px 0px;

    .sentence {
      color: white;
    }
  }
  .site {
    padding-top: 15px;
    width: 100%;
    text-align: right;
    font-size: 0.9em;
  }
`;
