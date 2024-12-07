import prepperLogo from "/hot-dog.png";
import "./App.css";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { prepareTX } from "./tx-prepper/tx-prepper";
import { TX } from "./tx-prepper/tx";
// import { useAccount, useWriteContract } from "wagmi";
import { useAccount } from "wagmi";

const DAO_ID = "0x33279f5046ca54365eb047f0758ceacdb85099e1";
const DAO_SAFE = "0x1f673135006f3c96dff1adc984d184548dd66d43";
const DAO_CHAIN = "0xaa36a7";

function App() {
  const [txData, setTxData] = useState<unknown | null>();
  const { isConnected } = useAccount();

  // const {
  //   writeContract,
  //   data: hash,
  //   error: sendTxError,
  //   isError: isSendTxError,
  //   isPending: isSendTxPending,
  // } = useWriteContract();

  const prepTx = async () => {
    const wholeState = {
      formValues: {
        title: "proposal title",
        description: "proposal description",
        link: "",
      },
      chainId: DAO_CHAIN,
      safeId: DAO_SAFE,
      daoId: DAO_ID,
      localABIs: {},
    };

    const txPrep = await prepareTX({
      tx: TX.POST_SIGNAL,
      chainId: DAO_CHAIN,
      safeId: DAO_SAFE,
      appState: wholeState,
      argCallbackRecord: {},
      localABIs: {},
    });

    console.log("txPrep", txPrep);

    if (!txPrep) return;
    setTxData(txPrep);

    // writeContract({
    //   abi: txPrep.abi,
    //   address: txPrep.address,
    //   functionName: txPrep.functionName,
    //   args: txPrep.args,
    // });
  };
  return (
    <>
      <div>
        <img src={prepperLogo} className="logo" alt="logo" />
      </div>
      <h1 className="title">tx prepper</h1>
      {isConnected && <button onClick={prepTx}>prep tx</button>}
      {txData && (
        <pre className="txData">{JSON.stringify(txData, null, 1)}</pre>
      )}
      <div className="connect">
        <ConnectKitButton />
      </div>
    </>
  );
}

export default App;
