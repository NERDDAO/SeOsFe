import { useEffect, useState } from "react";
import { useNetwork, useProvider } from "wagmi";

type GeneratedContractType = {
  address: string;
  abi: any[];
};

/**
 * @dev use this hook to get a deployed contract from `yarn deploy` generated files.
 * @param contractName - name of deployed contract
 * @returns {GeneratedContractType | undefined} object containing contract address and abi or undefined if contract is not found
 */
export const useDeployedContractInfo = ({ contractName }: { contractName: string | undefined | null }) => {
  const { chain } = useNetwork();
  const [deployedContractData, setDeployedContractData] = useState<undefined | GeneratedContractType>(undefined);
  const provider = useProvider();

  useEffect(() => {
    const getDeployedContractInfo = async () => {
      let ContractData;
      try {
        ContractData = require("~~/contracts/hardhat_contracts.json");
        const contractsAtChain = ContractData[chain?.id as keyof typeof ContractData];
        const contractsData = contractsAtChain?.[0]?.contracts;
        const deployedContractData = contractsData?.[contractName as keyof typeof contractsData];

        if (!deployedContractData) return;

        const code = await provider.getCode(deployedContractData.address);
        // If contract code is `0x` => no contract deployed on that address
        if (code === "0x") {
          setDeployedContractData(undefined);
          return;
        }
        setDeployedContractData(contractsData?.[contractName as keyof typeof contractsData]);
      } catch (e) {
        // Contract not deployed or file doesn't exist.
        setDeployedContractData(undefined);
        return;
      }
    };

    if (chain && contractName && provider) {
      getDeployedContractInfo();
    }
  }, [chain, contractName, provider]);

  return deployedContractData;
};
