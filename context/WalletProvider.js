import { ethers } from "ethers";
import React, { createContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import VendingABI from "../utils/Vending.json";

export const walletContext = createContext();

function WalletProvider({ children }) {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);

  const connectWallet = async () => {
    let contractAddress = "0x47bd80d36b603DA3109c7Ed7456155Bd51feDD2F";
    let contractABI = VendingABI.abi;
    try {
      if (!window.ethereum) {
        console.log("Install Metamask!");
        return toast.error("Please Install Metamask!");
      }
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if (provider) {
        await provider.send("eth_requestAccounts", []);

        window.ethereum.on("accountChanged", () => {
          window.location.reload();
        });
      }

      const signer = provider.getSigner();

      const address = await signer.getAddress();

      setAccount(address);

      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );
      setContract(contract);
      setProvider(signer);
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = () => {
    setAccount("");
    setContract(null);
    setProvider(null);
  };

  return (
    <walletContext.Provider
      value={{ account, contract, provider, connectWallet, disconnectWallet }}
    >
      {children}
    </walletContext.Provider>
  );
}

export default WalletProvider;
