import axios from "axios";

export const callApis = async (api: "davinci" | "web", body: any) => {
  const response = await axios.post("/" + api, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  console.log("응답", response);
  const output = response;
  // const output = await response.json();
  console.log("문제 API 결과", output.data);
  return output.data[0];
};
