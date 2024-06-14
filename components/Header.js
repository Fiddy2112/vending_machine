import { walletContext } from "@/context/WalletProvider";
import { ethers } from "ethers";
import React from "react";
import { showAddress } from "@/utils/Features";

const Header = ({ account, connectWallet, disconnectWallet }) => {
  return (
    <div>
      <div className="flex items-center justify-between p-2">
        <h1 className="font-mono font-bold text-2xl">Vending Machine</h1>

        <button
          onClick={account ? disconnectWallet : connectWallet}
          className="p-2 dark:bg-slate-800 rounded-sm font-sans font-bold "
        >
          {account ? showAddress(account) : "Connect wallet"}
        </button>
      </div>
    </div>
  );
};

export default Header;
