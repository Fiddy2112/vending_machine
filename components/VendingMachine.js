import { walletContext } from "@/context/WalletProvider";
import { convertAmount, numberFormat } from "@/utils/Features";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const VendingMachine = ({ contract, account }) => {
  const [count, setCount] = useState(0);
  const [restock, setRestock] = useState(0);
  const [inputValue, setInputValue] = useState("0");
  const [inputValueStock, setInputValueStock] = useState("0");
  const [owner, setOwner] = useState(null);
  const [isDisabled, setDisabled] = useState(false);
  const [balance, setBalance] = useState(numberFormat(1000 / 0));

  // form stock
  const insRestock = (e) => {
    setRestock((prevCount) => prevCount + 1);
    setInputValueStock((prevCount) => (parseInt(prevCount, 10) + 1).toString()); // add one and set it as string
    e.preventDefault();
  };

  // form stock
  const decRestock = (e) => {
    if (restock > 0) {
      setCount((prevCount) => prevCount - 1);
      setRestock((prevCount) => prevCount - 1);
      setInputValueStock((prevCount) =>
        (parseInt(prevCount, 10) - 1).toString()
      );
    } else if (restock <= 0) {
      setDisabled(true);
    }
    setDisabled(false);
    e.preventDefault();
  };

  const ins = (e) => {
    setCount((prevCount) => prevCount + 1);
    setInputValue((prevCount) => (parseInt(prevCount, 10) + 1).toString()); // add one and set it as string
    e.preventDefault();
  };

  const dec = (e) => {
    if (restock > 0) {
      setCount((prevCount) => prevCount - 1);
      setInputValue((prevCount) => (parseInt(prevCount, 10) - 1).toString());
    } else if (count <= 0) {
      setDisabled(true);
    }
    setDisabled(false);
    e.preventDefault();
  };

  const handleOnchange = (e) => {
    // regexp number match
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setInputValue(e.target.value);
      const newValue = parseInt(e.target.value, 10);
      setCount(isNaN(newValue) ? 0 : newValue);
    }
  };

  const handleOnchangeStock = (e) => {
    // regexp number match
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setInputValueStock(e.target.value);
      const newValue = parseInt(e.target.value, 10);
      setRestock(isNaN(newValue) ? 0 : newValue);
    }
  };

  const handlePurchase = async (e) => {
    e.preventDefault();
    if (account && contract) {
      const convertAmount = ethers.utils.parseEther(count.toString());
      const transaction = await contract.purchase({
        value: convertAmount,
      });
      await transaction.wait();
      console.log("Transaction is Successfully");
      toast.success("Transaction is Successfully");
      window.location.reload();
    }
  };

  useEffect(() => {
    if (account) {
      async function getContractBalance() {
        try {
          const blc = await contract.getBalance();
          setBalance(blc.toNumber());

          // get owner
          const onlyOwner = await contract.owner();
          setOwner(onlyOwner);
        } catch (error) {
          console.error("An error occurred!", error);
        }
      }

      // Call the function and log the result
      getContractBalance();
    }
  }, [account, balance, setBalance]);

  return (
    <div className="flex items-center justify-center flex-col w-80 lg:w-96 mx-auto p-4 bg-[#bdc3c7] mt-20">
      <h2 className="text-[#c0392b] mb-1">
        Buy Pizza with 1 eth <strong>Sepolia Network</strong>
      </h2>
      <div className="dark:bg-slate-700 flex items-center justify-center h-[200px] w-full">
        <p className="text-[#dbdbdb] font-mono text-sm lg:text-xl">
          {" "}
          <strong>Total Pizza:</strong> {balance}/each
        </p>
      </div>
      <div className="mt-2 mb-2 w-full">
        <form
          className="flex justify-between items-center"
          onSubmit={handlePurchase}
        >
          <div>
            <div className="flex items-center max-w-[8rem]">
              <button
                disabled={isDisabled}
                onClick={dec}
                type="button"
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h16"
                  />
                </svg>
              </button>
              <input
                type="text"
                className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm  block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                placeholder="999"
                required
                value={count}
                onChange={handleOnchange}
              />
              <button
                onClick={ins}
                type="button"
                className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11  focus:outline-none"
              >
                <svg
                  className="w-3 h-3 text-gray-900 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 1v16M1 9h16"
                  />
                </svg>
              </button>
            </div>
          </div>

          <button className="bg-[#e74c3c] p-3 h-11 rounded-md" type="submit">
            Purchase
          </button>
        </form>
        {/* fix owner restock soon !*/}
        {owner == account ? (
          <form
            className="flex justify-between items-center"
            onSubmit={handlePurchase}
          >
            <div>
              <div className="flex items-center max-w-[8rem]">
                <button
                  disabled={isDisabled}
                  onClick={decRestock}
                  type="button"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 2"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 1h16"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm  block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                  placeholder="999"
                  required
                  value={restock}
                  onChange={handleOnchangeStock}
                />
                <button
                  onClick={insRestock}
                  type="button"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11  focus:outline-none"
                >
                  <svg
                    className="w-3 h-3 text-gray-900 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 18"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 1v16M1 9h16"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <button className="bg-[#e74c3c] p-3 h-11 rounded-md" type="submit">
              Restock
            </button>
          </form>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default VendingMachine;
