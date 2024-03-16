import { glpManagerABI } from "@/abi/glpManagerAbi";
import { arbitrumClient } from "../../viem";

export async function GET(request: Request) {
  try {
    const data = await arbitrumClient.readContract({
      address: "0x3963FfC9dff443c2A94f21b129D429891E32ec18",
      abi: glpManagerABI,
      functionName: "getPrice",
      args: [true],
    });

    const adjustedData = Number(data) / Math.pow(10, 30);
    const result = String(adjustedData);

    return new Response(result);
  } catch (error) {
    return new Response("Error occurred", { status: 500 });
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  console.log(body);

  return new Response("OK");
}
