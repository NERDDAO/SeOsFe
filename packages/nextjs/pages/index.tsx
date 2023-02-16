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
import React, { useState } from "react";
import ethers from "ethers";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth/useScaffoldContractRead";
import { execute } from "../.graphclient";
import { gql } from "graphql-tag";
import { useAccount } from "wagmi";

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
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  link: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const Home = () => {
  const classes = useStyles();
  const router = useRouter();
  const { address, isConnected } = useAccount();
  console.log("account", address, isConnected);
  const contractName = "FarmMainRegularMinStakeABI";
  const functionName = "setups";
  let data: any;
  const contract = useScaffoldContractRead(contractName, functionName);
  if (contract.data) {
    data = contract.data;
  }

  const myQuery = gql`
    query ExampleQuery {
      setupTokens(first: 5) {
        id
        mainToken
        involvedToken
        blockNumber
      }
      rewardTokens(first: 5) {
        id
        rewardTokenAddress
        blockNumber
        blockTimestamp
      }
      users(first: 5) {
        positions {
          id
        }
      }
    }
  `;

  async function main() {
    const result = await execute(myQuery, {});
    console.log("QueryResult", result);
  }

  main();
  const handleClick = (setupId: string) => {
    router.push(`/setup/${setupId}`);
  };
  console.log("data", data);
  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>
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
