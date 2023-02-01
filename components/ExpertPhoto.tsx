import styled from "@emotion/styled";
import React from "react";
import { DOMAINS, DomainOne } from "../utils/persona";

type ExpertPhotoProps = { src?: string; domain?: DomainOne };

const ExpertPhoto = ({ src, domain }: ExpertPhotoProps) => {
  if (src) return <ProfilePhoto src={src} />;
  else
    return (
      <ProfilePhotoSpan>
        {DOMAINS.find((doc) => doc.domain === domain)?.icon}
      </ProfilePhotoSpan>
    );
};

export default React.memo(ExpertPhoto);

const ProfilePhoto = styled.img`
  border-radius: 300px;
  background: white;
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  color: white;

  @media (max-width: 1100px) {
    width: 30px;
    height: 30px;
  }
`;

const ProfilePhotoSpan = styled.span`
  border-radius: 300px;
  background: brown;
  display: flex;
  flex-direction: row;
  aligm-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  color: white;

  @media (max-width: 1100px) {
    width: 30px;
    height: 30px;
  }
`;
