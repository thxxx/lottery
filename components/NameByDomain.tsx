import React from "react";
import { DOMAINS, DomainOne } from "../utils/persona";

type NameByDomainProps = {
  domain: DomainOne | undefined;
};

const NameByDomain = ({ domain }: NameByDomainProps) => {
  return (
    <p className="name">
      {DOMAINS.filter((doc) => doc.domain === domain)[0].name}{" "}
      <span>@{domain?.toLowerCase()}</span>
    </p>
  );
};

export default NameByDomain;
