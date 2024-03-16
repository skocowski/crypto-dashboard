import { TokenPrice } from "./interfaces";

export  const fetcherPrices = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const result = await res.json();

  const prices: Record<string, number> = result.reduce(
    (acc: Record<string, number>, { symbol, current_price }: TokenPrice) => {
      acc[symbol] = current_price;
      return acc;
    },
    {}
  );
  return prices;
};