import { Eth } from "web3-eth";
import { Web3Events, Contract } from "@rsksmart/web3-events";
import Web3 from "web3";

type Log = {
	blockNumber: number;
	transactionHash: string;
	address: string;
	topics: string[];
	data: string;
};

type LogFilter = {
	fromBlock?: number | string;
	toBlock?: number | string;
	address?: string;
	topics?: string[] | string[][];
};
const getLogs = async (
	abi: any,
	contractAddress: string,
	contractName: string,
	web3Provider: string,
	method: string,
	args: LogFilter
): Promise<Log[]> => {
	const eth = new Eth(web3Provider);
	const web3 = new Web3(new Web3.providers.HttpProvider(web3Provider));
	const contract = new Contract(abi, contractAddress, contractName);
	const web3Events = new Web3Events(eth, {});

	const getLogKey = (args: LogFilter) => {
		const key = { ...args };
		delete key.fromBlock;
		delete key.toBlock;
		return web3.utils.sha3(`log-${JSON.stringify(key)}`);
	};

	const ascending = (a: Log, b: Log) => a.blockNumber - b.blockNumber;

	const chainId = await web3.eth.getChainId();
	const interval = chainId === 10 ? 10000 : 45000;
	const latestBlock = await web3.eth.getBlockNumber();

	const firstBlock =
		typeof args.fromBlock === "string" ? 0 : args.fromBlock || 0;
	const lastBlock =
		typeof args.toBlock === "string"
			? latestBlock
			: args.toBlock || latestBlock;

	const logKey = getLogKey(args);
	const logs = await web3.eth.getPastLogs(args);

	return logs
		.filter((it) => it.blockNumber >= firstBlock && it.blockNumber <= lastBlock)
		.sort(ascending);
};

export { getLogs as default };
