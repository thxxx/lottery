import styled from "@emotion/styled";
import React from "react";
import { DOMAINS } from "../../utils/persona";
import { useChatStore } from "../../utils/store";

const DomainDesc = () => {
  const { job } = useChatStore();

  return (
    <DomainDescContainer>
      <div>{DOMAINS.filter((doc) => doc.domain === job)[0]?.icon}</div>
      <p className="name">
        {DOMAINS.filter((doc) => doc.domain === job)[0]?.name}
      </p>
      <p className="domain">
        @{DOMAINS.filter((doc) => doc.domain === job)[0]?.domain.toLowerCase()}
      </p>
      <p
        className="desc"
        dangerouslySetInnerHTML={{
          __html: DOMAINS.filter((doc) => doc.domain === job)[0]?.desc,
        }}
      />
    </DomainDescContainer>
  );
};

export default DomainDesc;

export const DomainDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 2px;

  .name {
    margin-top: 3px;
    font-weight: 700;
  }
  .domain {
    color: rgba(0, 0, 0, 0.6);
  }
  .desc {
    margin-top: 5px;
  }

  @media (max-width: 800px) {
    padding: 0px 15px;
  }
`;
