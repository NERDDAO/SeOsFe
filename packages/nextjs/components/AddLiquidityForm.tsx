import React, { useState, useEffect } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import BigNumber from "bignumber.js";
import { fetchPool } from "~~/utils/scaffold-eth/fetchPool";
import { useAccount, useProvider } from "wagmi";
import { Contract } from "ethers";
import { useAccountBalance } from "~~/hooks/scaffold-eth/useAccountBalance";

const AddLiquidityForm = () => {
	const [positionId, setPositionId] = useState("");
	const [setupIndex, setSetupIndex] = useState("");
	const [amount0, setAmount0] = useState("");
	const [amount1, setAmount1] = useState("");
	const [positionOwner, setPositionOwner] = useState("");
	const [amount0Min, setAmount0Min] = useState("");
	const [amount1Min, setAmount1Min] = useState("");
	const [error, setError] = useState("");

	const contractName = "FarmMainRegularMinStakeABI";
	const functionName = "addLiquidity";
	const account = useAccount();
	const { balance, price, isError, onToggleBalance, isEthBalance } =
		useAccountBalance(account.address);

	const inputTokenAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // DAI token address
	const outputTokenAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH token address
	const inputTokenDecimals = 18;
	const outputTokenDecimals = 18;

	const provider = useProvider();

	//This part is what lets us update the front end numbers for the farm.
	//TODO: make this but for the other tuple data.
	useEffect(() => {
		async function fetchData() {
			try {
				const price = await fetchPool(
					provider,
					inputTokenAddress,
					outputTokenAddress,
					inputTokenDecimals,
					outputTokenDecimals
				);
				console.log(`The price of 1 WETH in DAI is: ${price}`);

				const amount0Value = new BigNumber(amount0);
				const amount1Value = new BigNumber(amount1);

				if (amount0Value.isGreaterThan(0) && price) {
					const correspondingAmount1 = amount0Value.dividedBy(price);
					setAmount1(correspondingAmount1.toString());
				} else if (amount1Value.isGreaterThan(0) && price) {
					const correspondingAmount0 = amount1Value.multipliedBy(price);
					setAmount0(correspondingAmount0.toString());
				}
			} catch (e) {
				console.error(e);
			}
		}
		fetchData();
	}, [amount0, amount1]);

	const { isLoading, writeAsync } = useScaffoldContractWrite(
		contractName,
		functionName,
		[
			{
				name: "positionId",
				type: "bytes32",
				value: positionId,
			},
			{
				name: "setupData",
				type: "tuple",
				components: [
					{
						name: "setupIndex",
						type: "uint256",
						value: new BigNumber(setupIndex),
					},
					{
						name: "amount0",
						type: "uint256",
						value: new BigNumber(amount0),
					},
					{
						name: "amount1",
						type: "uint256",
						value: new BigNumber(amount1),
					},
					{ name: "positionOwner", type: "address", value: positionOwner },
					{
						name: "amount0Min",
						type: "uint256",
						value: new BigNumber(amount0Min),
					},
					{
						name: "amount1Min",
						type: "uint256",
						value: new BigNumber(amount1Min),
					},
				],
			},
		]
	);

	return (
		<Grid container direction="column" alignItems="center">
			<Typography variant="h6" style={{ marginTop: "20px" }}>
				Add Liquidity
			</Typography>
			<form onSubmit={writeAsync}>
				<TextField
					label="Position Id"
					variant="outlined"
					type="number"
					value={positionId}
					onChange={(e) => setPositionId(e.target.value)}
					style={{ margin: "20px 0" }}
				/>
				<TextField
					label="Setup Index"
					variant="outlined"
					type="number"
					value={setupIndex}
					onChange={(e) => setSetupIndex(e.target.value)}
					style={{ margin: "20px 0" }}
				/>
				<TextField
					label="Amount 0"
					variant="outlined"
					type="number"
					value={amount0}
					onChange={(e) => setAmount0(e.target.value)}
					style={{ margin: "20px 0" }}
				/>
				<TextField
					label="Amount 1"
					variant="outlined"
					type="number"
					value={amount1}
					onChange={(e) => setAmount1(e.target.value)}
					style={{ margin: "20px 0" }}
				/>
				<TextField
					label="Position Owner"
					variant="outlined"
					type="text"
					value={positionOwner}
					onChange={(e) => setPositionOwner(e.target.value)}
					style={{ margin: "20px 0" }}
				/>
				<TextField
					label="Amount 0 Minimum"
					variant="outlined"
					type="number"
					value={amount0Min}
					onChange={(e) => setAmount0Min(e.target.value)}
					style={{ margin: "20px 0" }}
				/>
				<TextField
					label="Amount 1 Minimum"
					variant="outlined"
					type="number"
					value={amount1Min}
					onChange={(e) => setAmount1Min(e.target.value)}
					style={{ margin: "20px 0" }}
				/>
				{error && <Typography color="error">{error}</Typography>}
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={isLoading}
					style={{ marginTop: "20px" }}
				>
					Add Liquidity
				</Button>

				<div>
					<div>Balance: {balance}</div>
					<div>Price: {price}</div>
					<div>Error: {isError ? "true" : "false"}</div>
					<div>Loading: {isLoading ? "true" : "false"}</div>
					<button onClick={onToggleBalance}>Toggle Balance Display</button>
					<div>Displaying balance in {isEthBalance ? "ETH" : "Token"}</div>
				</div>
			</form>
		</Grid>
	);
};

export default AddLiquidityForm;
