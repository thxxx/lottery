import React, { useCallback } from "react";
import { MathJaxContext, MathJax } from "better-react-mathjax";
import { Code, CodeBlock } from "@atlaskit/code";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import styled from "@emotion/styled";

const TextAnswer = ({ text }: { text: string }) => {
  const config = {
    loader: { load: ["input/asciimath"] },
  };

  const returnTableContent = useCallback((response: string) => {
    let q = 0;

    const tt = response
      .split(/\||\n/)
      .filter((doc) => doc.split("---")[0].length > 0)
      .map((item, i) => {
        const splited = item.split("---");
        if (splited.length > 1 && q === 0) q = i - 1;
        return splited;
      })
      .filter((doc) => doc.filter((dd) => dd.length > 2).length > 0);

    const returnTd = (data: "head" | "body", startIndex: number) => {
      const bodies = [];
      if (data === "head")
        for (let j = 0; j <= q; j++) {
          bodies.push(<th>{tt[startIndex + j][0].trim()}</th>);
        }
      else
        for (let j = 0; j <= q; j++) {
          bodies.push(
            <td>
              {tt[startIndex + j]?.filter((doc) => doc !== " ")[0].trim()}
            </td>
          );
        }
      return bodies;
    };

    const li = [];

    for (let i = 0; i < tt.length; i = i + q + 1) {
      if (i === 0) {
        li.push(
          <thead>
            <tr>{returnTd("head", i)}</tr>
          </thead>
        );
      } else {
        li.push(
          <tbody>
            <tr>{returnTd("body", i)}</tr>
          </tbody>
        );
      }
    }

    return li;
  }, []);

  return (
    <>
      {text && (
        <>
          <MathJaxContext config={config} version={3}>
            <MathJax>
              {text.includes("---") ? (
                <CustomTable>
                  {returnTableContent(text.replace(/<bold>|<(.*?)>/g, "")).map(
                    (item) => {
                      return item;
                    }
                  )}
                </CustomTable>
              ) : (
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
              )}
              {text.includes("```") ? (
                <CodeBlock
                  language="typescript"
                  showLineNumbers={false}
                  text={text
                    .replace(/^[\s\S]*?(?=```)/, "")
                    .replace(/```/g, "")}
                />
              ) : (
                <></>
              )}
            </MathJax>
          </MathJaxContext>
        </>
      )}
    </>
  );
};

export default React.memo(TextAnswer);

const CustomTable = styled.table`
  border: 1px solid ${({ theme }) => theme.bgColor03};
  border-radius: 6px;
  text-align: left;

  th {
    background-color: ${({ theme }) => theme.blue01 + "55"};
    padding: 8px 15px;
  }
  td {
    text-align: left;
    align-items: flex-start;
    justify-content: flex-start;
    border: 1px solid ${({ theme }) => theme.bgColor03};
    padding: 5px 15px;
  }
`;
