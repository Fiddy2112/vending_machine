import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import VendingMachine from "@/components/VendingMachine";
import { useContext } from "react";
import { walletContext } from "@/context/WalletProvider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { account, connectWallet, disconnectWallet, contract, provider } =
    useContext(walletContext);
  return (
    <div>
      <Header
        account={account}
        connectWallet={connectWallet}
        disconnectWallet={disconnectWallet}
      />
      <VendingMachine account={account} contract={contract} />
    </div>
  );
}
