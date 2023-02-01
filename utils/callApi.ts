import axios from "axios";

export const callApis = async (api: "davinci" | "web", body: any) => {
  const response = await axios.post("/" + api, body, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  const output = response;
  // const output = await response.json();
  return output.data[0];
};
