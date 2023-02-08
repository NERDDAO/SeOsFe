import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { useAppStore } from "../../services/store/store";
import { TExampleStuff } from "../../services/store/slices/tempSlice";

const Setup = (): JSX.Element => {
  const router = useRouter();
  const { pid } = router.query;

  const { tempSlice } = useAppStore();
  console.log("tempSlice", tempSlice);

  return (
    <>
      <Head>
        <title>Scaffold-eth App</title>
      </Head>
      <div>
        <h1>Setup</h1>
        <h2>pid: {pid}</h2>
      </div>
    </>
  );
};

export default Setup;
