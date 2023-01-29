import styled from "@emotion/styled";
import React from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import Latex from "react-latex-next";

const TextAnswer = ({ text }: { text: string }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: text
          .replace(/```([\s\S]*?)```/g, "")
          .replace(/\n/g, "<br />")
          .replace(/<bold>(.*?)<\/bold>/g, "<strong>$1</strong>"),
      }}></div>
  );
};

export default React.memo(TextAnswer);
