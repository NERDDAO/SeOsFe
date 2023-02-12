import React, { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import BigNumber from "bignumber.js";

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

	const { isLoading, writeAsync } = useScaffoldContractWrite(
		contractName,
		functionName,
		[
			{
				inputs: [
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
				],
			},
		]
	);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const result = await writeAsync();
			console.log(result);
		} catch (error: any) {
			setError(error.message);
		}
	};

	return (
		<Grid container direction="column" alignItems="center">
			<Typography variant="h6" style={{ marginTop: "20px" }}>
				Add Liquidity
			</Typography>
			<form onSubmit={handleSubmit}>
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
			</form>
		</Grid>
	);
};

export default AddLiquidityForm;
