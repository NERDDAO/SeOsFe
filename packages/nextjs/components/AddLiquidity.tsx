import React, { useState } from "react";
import { utils } from "ethers";

const AddLiquidity = () => {
	const [positionId, setPositionId] = useState("");
	const [setupIndex, setSetupIndex] = useState("");
	const [amount0, setAmount0] = useState("");
	const [amount1, setAmount1] = useState("");
	const [positionOwner, setPositionOwner] = useState("");
	const [amount0Min, setAmount0Min] = useState("");
	const [amount1Min, setAmount1Min] = useState("");
	const [error, setError] = useState("");

	const handleAddLiquidity = async () => {
		setError("");

		if (!positionId) {
			setError("Please enter a position ID");
			return;
		}

		if (!setupIndex) {
			setError("Please enter a setup index");
			return;
		}

		if (!amount0) {
			setError("Please enter an amount for token 0");
			return;
		}

		if (!amount1) {
			setError("Please enter an amount for token 1");
			return;
		}

		if (!positionOwner) {
			setError("Please enter a position owner");
			return;
		}

		if (!amount0Min) {
			setError("Please enter a minimum amount for token 0");
			return;
		}

		if (!amount1Min) {
			setError("Please enter a minimum amount for token 1");
			return;
		}

		const parsedAmount0 = utils.parseUnits(amount0, 18);
		const parsedAmount1 = utils.parseUnits(amount1, 18);
		const parsedAmount0Min = utils.parseUnits(amount0Min, 18);
		const parsedAmount1Min = utils.parseUnits(amount1Min, 18);

		console.log(
			"Adding liquidity:",
			parseInt(positionId),
			parseInt(setupIndex),
			parsedAmount0,
			parsedAmount1,
			positionOwner,
			parsedAmount0Min,
			parsedAmount1Min
		);
	};

	return (
		<div>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<input
				type="text"
				value={positionId}
				onChange={(event) => setPositionId(event.target.value)}
				placeholder="Position ID"
			/>
			<input
				type="text"
				value={setupIndex}
				onChange={(event) => setSetupIndex(event.target.value)}
				placeholder="Setup Index"
			/>
			<input
				type="text"
				value={amount0}
				onChange={(event) => setAmount0(event.target.value)}
				placeholder="Amount for Token 0"
			/>
			<input
				type="text"
				value={amount1}
				onChange={(event) => setAmount1(event.target.value)}
				placeholder="Amount for Token 1"
			/>
			<input
				type="text"
				value={positionOwner}
				onChange={(event) => setPositionOwner(event.target.value)}
				placeholder="Position Owner"
			/>
			<input
				type="text"
				value={amount0Min}
				onChange={(event) => setAmount0Min(event.target.value)}
				placeholder="Minimum Amount for Token 0"
			/>
			<input
				type="text"
				value={amount1Min}
				onChange={(event) => setAmount1Min(event.target.value)}
				placeholder="Minimum Amount for Token 1"
			/>
			<button onClick={handleAddLiquidity}>Add Liquidity</button>
		</div>
	);
};

export default AddLiquidity;
