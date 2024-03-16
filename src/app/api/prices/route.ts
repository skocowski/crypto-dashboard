
const url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&locale=en";

export async function GET(request: Request) {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const data = await res.json();



    // Convert response object to JSON string
    const responseBody = JSON.stringify(data);

    // Return response with JSON content type
    return new Response(responseBody, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching token prices:", error);
    return null;
  }
}

