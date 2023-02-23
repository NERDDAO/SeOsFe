import React, { useState, useEffect } from "react";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";
import { useAccount } from "wagmi";

import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Link,
  Popover,
  Typography,
  TableBody,
  Button,
} from "@material-ui/core";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAppStore } from "~~/services/store/store";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    margin: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
  },
}));

const Home = () => {
  const { tempSlice } = useAppStore();
  const { address, isConnected } = useAccount();
  const classes = useStyles();
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const contractName = "FarmMainRegularMinStakeABI";
  const functionName = "setups";
  let data: any;
  const contract = useScaffoldContractRead(contractName, functionName);
  if (contract.data) {
    data = contract.data;
  }

  useEffect(() => {
    if (address) {
      tempSlice.setAddress(address);
    }
  }, [address, tempSlice]);

  const handleClick = (setupId: string) => {
    tempSlice.setPID(setupId);
    router.push(`/setup/${setupId}`);
  };

  console.log("data", data, "userData", userData);
  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>
      <div>Your address is: {tempSlice.address}</div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
        {data?.map((setup: any, index: any) => (
          <Card key={index} className={classes.card} onClick={() => handleClick(index)}>
            <CardHeader title={`pid: ${index}`} />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>rewardPerBlock:</strong> {setup.rewardPerBlock?.toString()}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                <strong>endBlock:</strong> {setup.endBlock?.toNumber()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;
