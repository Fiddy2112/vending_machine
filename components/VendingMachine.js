import { walletContext } from "@/context/WalletProvider";
import { convertAmount, numberFormat } from "@/utils/Features";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const VendingMachine = ({ contract, account }) => {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState("0");
  const [isDisabled, setDisabled] = useState(false);
  const [balance, setBalance] = useState(numberFormat(1000 / 0));

  const ins = (e) => {
    setCount((prevCount) => prevCount + 1);
    setInputValue((prevCount) => (parseInt(prevCount, 10) + 1).toString()); // add one and set it as string
    e.preventDefault();
  };

  console.log(contract);

  const dec = (e) => {
    if (count > 0) {
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

  const handlePurchase = (e) => {
    e.preventDefault();
    if (account) {
    }
  };

  useEffect(() => {
    if (account) {
      async function getBalnc() {
        try {
          // we assume that `contract` is the instance of your contract
          const getBlc = await contract.getBalance();
          setBalance(ethers.utils.parseEther(getBlc.toString()));
          return getBlc;
        } catch (error) {
          console.error("An error occurred!", error);
          return null; // or throw error
        }
      }

      // Call the function and log the result
      getBalnc().then((result) => console.log(result));
    }
  }, [balance, setBalance]);

  return (
    <div className="flex items-center justify-center flex-col w-80 lg:w-96 mx-auto p-4 bg-[#bdc3c7] mt-20">
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
      </div>
    </div>
  );
};

export default VendingMachine;
