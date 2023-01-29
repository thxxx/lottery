// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("api 호출");

  const response = await axios.post(
    "https://z0ssobbdqh.execute-api.us-west-1.amazonaws.com/v1/bing",
    req.body,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  console.log("api 응답");

  res.status(200).json(response.data);
  // res.status(200).json({ data: "response.da" });
}
