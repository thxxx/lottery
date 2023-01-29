import styled from "@emotion/styled";
import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

const TextAnswer = ({ text }: { text: string }) => {
  const config = {
    loader: { load: ["input/asciimath"] },
  };

  return (
    <MathJaxContext config={config} version={3}>
      {/* <MathJax>{"`frac(10)(4x) approx 2^(12)`"}</MathJax> */}
      <MathJax>
        {text
          .replace(/```([\s\S]*?)```/g, "")
          .replace(/\$/g, "`")
          .replace(/\n/g, "<br />")
          .replace(/<bold>(.*?)<\/bold>/g, "<strong>$1</strong>")}
      </MathJax>
    </MathJaxContext>
  );
};

export default React.memo(TextAnswer);
