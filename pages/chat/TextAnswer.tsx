import styled from "@emotion/styled";
import React from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";

const TextAnswer = ({ text }: { text: string }) => {
  const config = {
    loader: { load: ["input/asciimath"] },
  };

  // return (
  //   <MathJax>
  //   {/* <MathJaxContext config={config} version={3}> */}
  //     {/* <MathJax>{"`frac(10)(4x) approx 2^(12)`"}</MathJax> */}
  //       {text
  //         .replace(/```([\s\S]*?)```/g, "")
  //         .replace(/\$/g, "`")
  //         .replace(/\n/g, "<br />")
  //         .replace(/<bold>(.*?)<\/bold>/g, "<strong>$1</strong>")}
  //   {/* </MathJaxContext> */}
  //     </MathJax>
  // );

  return (
    <>
      {text && (
        <>
          <MathJaxContext config={config} version={3}>
            <MathJax>
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    text.replace(/\n/g, "<br />").slice(0, 6) === "<br />"
                      ? text
                          // .replace(/```([\s\S]*?)```/g, "")
                          .replace(/\$/g, "`")
                          .replace(/\n/g, "<br />")
                          .replace(
                            /<bold>(.*?)<\/bold>/g,
                            "<strong>$1</strong>"
                          )
                          .slice(6)
                      : text
                          // .replace(/```([\s\S]*?)```/g, "")
                          .replace(/\$/g, "`")
                          .replace(/\n/g, "<br />")
                          .replace(
                            /<bold>(.*?)<\/bold>/g,
                            "<strong>$1</strong>"
                          ),
                }}
              />
              {/* {text.replace(/```([\s\S]*?)```/g, "").replace(/\$/g, "`")} */}
            </MathJax>
          </MathJaxContext>
        </>
      )}
    </>
  );
};

export default React.memo(TextAnswer);
