import React, { useEffect, useState } from "react";
import { execute } from "../../.graphclient";
import { gql } from "graphql-tag";

import {
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import AddLiquidityForm from "~~/components/AddLiquidityForm";
import { useAppStore } from "~~/services/store/store";

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 500,
    margin: "20px auto",
    cursor: "pointer",
    padding: "20px",
    backgroundColor: "#f7f7f7",
  },
  header: {
    backgroundColor: "#3f51b5",
    color: "#fff",
    padding: "10px 20px",
    textAlign: "center",
  },
  content: {
    padding: "20px",
  },
  table: {
    margin: "10px auto",
  },
  tableCell: {
    padding: "10px",
  },
  tableHeader: {
    fontWeight: "bold",
  },
}));

interface SetupCardProps {
  account: string;
  web3: any;
  farmingContractAddress: string;
  children?: React.ReactNode;
}

const SetupCard: React.FC<SetupCardProps> = ({ account, web3, farmingContractAddress, children }) => {
  const { tempSlice } = useAppStore();
  const classes = useStyles();
  const router = useRouter();
  const contractName = "FarmMainRegularMinStakeABI";
  const functionName = "setup";
  const { pid } = router.query;
  const contract = useScaffoldContractRead(contractName, functionName, { args: [pid] });
  let data: any;
  if (contract.data) {
    data = contract.data as any[];
    data = data[0];
  }

  const myQuery = gql`
    query ExampleQuery($address: ID!) {
      user(id: $address) {
        id
        positions(first: 10) {
          id
        }
      }
    }
  `;

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await execute(myQuery, { address: tempSlice.address });
        console.log("result data", result.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [tempSlice.address]);

  const variableNames = {
    startBlock: "Start Block",
    rewardPerBlock: "Reward per Block",
    totalSupply: "Total Supply",
  };

  const handleClick = () => {
    console.log("I'm Clicked", data);
  };

  return (
    <Card className={classes.card} onClick={handleClick}>
      <CardHeader className={classes.header} title="Data" />
      <CardContent className={classes.content}>
        {data && (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeader}>Variable Name</TableCell>
                  <TableCell className={classes.tableHeader}>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(variableNames).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className={classes.tableCell} component="th" scope="row">
                      {value}
                    </TableCell>
                    <TableCell className={classes.tableCell}>{JSON.stringify(data[key])}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <Typography variant="body2" component="p">
          {children}
        </Typography>
      </CardContent>
      <AddLiquidityForm />
    </Card>
  );
};

export default SetupCard;
