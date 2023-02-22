import { Fetcher, Route, Token, WETH } from "@uniswap/sdk";
import { Provider } from "@wagmi/core";

export async function fetchPool(
  provider: Provider,
  inputTokenAddress: string,
  outputTokenAddress: string,
  inputTokenDecimals: number,
  outputTokenDecimals: number,
): Promise<number> {
  try {
    const inputToken = new Token(1, inputTokenAddress, inputTokenDecimals);
    const outputToken = new Token(1, outputTokenAddress, outputTokenDecimals);

    if (outputTokenAddress === WETH[1].address) {
      const weth = WETH[1];
      const pair = await Fetcher.fetchPairData(inputToken, weth, provider);
      const route = new Route([pair], outputToken);
      const price = parseFloat(route.midPrice.toSignificant(6));
      return price;
    } else {
      const pair = await Fetcher.fetchPairData(inputToken, outputToken, provider);
      const route = new Route([pair], outputToken);
      const price = parseFloat(route.midPrice.toSignificant(6));
      return price;
    }
  } catch (error) {
    console.error("fetchPriceFromUniswap - Error fetching price from Uniswap: ", error);
    return 0;
  }
}
