import * as bip39 from "bip39";

import fs from "fs";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  Connection,
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
  Transaction,
  PublicKeyInitData,
  sendAndConfirmTransaction,
  ComputeBudgetProgram,
  MessageV0,
  TransactionExpiredBlockheightExceededError,
  BlockhashWithExpiryBlockHeight,
  VersionedTransactionResponse,
  Commitment,
} from "@solana/web3.js";
import bs58 from "bs58";
import { Buffer } from "buffer";
import * as ed25519 from "ed25519-hd-key";
import promiseRetry from "promise-retry";

import {
  getAssociatedTokenAddress,
  getAccount,
  Account,
} from "@solana/spl-token";

require("dotenv").config();

interface IAddress {
  address: string;
  index: number;
}

export type TransactionSenderAndConfirmationWaiterArgs = {
  connection: Connection;
  serializedTransaction: Buffer;
  blockhashWithExpiryBlockHeight: BlockhashWithExpiryBlockHeight;
};

export interface Chain {
  name: string;
  symbol: string;
  chainDecimals: string;
  explorer: string;
  http: string[];
  ws: string;
  nativeTokenProfitSpreed: string;
  chainTokenExplorer: string;
  isEvm: boolean;
  isDevnet: boolean;
}

const chain: Chain = {
  name: "SOON TESTNET",
  symbol: "SOON",
  chainDecimals: LAMPORTS_PER_SOL.toString(),
  explorer: "https://explorer.testnet.soo.network",
  http: ["https://rpc.testnet.soo.network/rpc"],
  ws: "",
  nativeTokenProfitSpreed: "0.04",
  chainTokenExplorer: "https://explorer.testnet.soo.network/",
  isEvm: false,
  isDevnet: true,
};
export class MasterSmartWalletClass {
  // Define the type for the config object
  chain: Chain;
  connection: Connection;
  masterKeyPair: { privateKey: Uint8Array; publicKey: string };
  isDevnet: boolean = false;
  seed: string;
  masterAddress: string;

  constructor(mnemonic: string, chain: Chain) {
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    this.seed = seed.toString("hex");
    this.chain = chain;
    const nn = Math.floor(Math.random() * this.chain.http.length);
    console.log("this.chain.http: ", this.chain.http[nn]);
    this.connection = new Connection(this.chain.http[nn], "confirmed");
    this.masterKeyPair = this.deriveChildPrivateKey(0);
    this.isDevnet = this.chain.isDevnet;
    this.masterAddress = this.masterKeyPair.publicKey;
  }
  static validateAddress(address: string) {
    try {
      new PublicKey(address);
      return true;
    } catch (error) {
      return false;
    }
  }

  validateAddress(address: string) {
    try {
      new PublicKey(address);
      return true;
    } catch (error) {
      return false;
    }
  }
  static async createSendConfirmRetryDeserializedTransaction(
    deserializedBuffer: Buffer,
    senderKeypairs: Keypair[],
    connection: Connection,
    latestBlockhash: Readonly<{
      blockhash: string;
      lastValidBlockHeight: number;
    }>,
    isDevnet: Boolean
  ) {
    let status = false;

    let transaction = VersionedTransaction.deserialize(deserializedBuffer);
    transaction.sign(senderKeypairs);
    let signature;

    let explorerUrl = "";

    console.log("sending transaction...");

    // We first simulate whether the transaction would be successful
    const { value: simulatedTransactionResponse } =
      await connection.simulateTransaction(transaction, {
        replaceRecentBlockhash: true,
        commitment: "processed",
      });
    const { err, logs } = simulatedTransactionResponse;

    if (err) {
      // Simulation error, we can check the logs for more details
      // If you are getting an invalid account error, make sure that you have the input mint account to actually swap from.
      console.error("Simulation Error:");
      console.error(err);

      console.error(logs);

      return { status, error: err };
    }

    // Execute the transaction

    const serializedTransaction = Buffer.from(transaction.serialize());
    const blockhash = transaction.message.recentBlockhash;
    console.log("blockhash: ", blockhash);

    const transactionResponse = await transactionSenderAndConfirmationWaiter({
      connection,
      serializedTransaction,
      blockhashWithExpiryBlockHeight: {
        blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      },
    });

    // If we are not getting a response back, the transaction has not confirmed.
    if (!transactionResponse) {
      console.error("Transaction not confirmed");
      //!WE SHOULD RETRY THE TRANSACTION AGAIN HERE

      throw new TransactionNotConfirmedError({});
    }

    if (transactionResponse.meta?.err) {
      console.error(transactionResponse.meta?.err);
    }
    transactionResponse.transaction.signatures;

    console.log("View transaction on explorer:", explorerUrl);
    status = true;
    return { status, signature: transactionResponse.transaction.signatures };
  }

  async createSendConfirmRetryDeserializedTransaction(
    deserializedBuffer: Buffer,
    senderKeypairs: Keypair[],
    connection: Connection,
    latestBlockhash: Readonly<{
      blockhash: string;
      lastValidBlockHeight: number;
    }>,
    isDevnet: Boolean
  ) {
    let status = false;

    let transaction = VersionedTransaction.deserialize(deserializedBuffer);
    transaction.sign(senderKeypairs);
    let signature;

    let explorerUrl = "";

    console.log("sending transaction...");

    // We first simulate whether the transaction would be successful
    const { value: simulatedTransactionResponse } =
      await connection.simulateTransaction(transaction, {
        replaceRecentBlockhash: true,
        commitment: "processed",
      });
    const { err, logs } = simulatedTransactionResponse;

    if (err) {
      // Simulation error, we can check the logs for more details
      // If you are getting an invalid account error, make sure that you have the input mint account to actually swap from.
      console.error("Simulation Error:");
      console.error(err);

      console.error(logs);

      return { status, error: err };
    }

    // Execute the transaction

    const serializedTransaction = Buffer.from(transaction.serialize());
    const blockhash = transaction.message.recentBlockhash;
    console.log("blockhash: ", blockhash);

    const transactionResponse = await transactionSenderAndConfirmationWaiter({
      connection,
      serializedTransaction,
      blockhashWithExpiryBlockHeight: {
        blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      },
    });

    // If we are not getting a response back, the transaction has not confirmed.
    if (!transactionResponse) {
      console.error("Transaction not confirmed");
      //!WE SHOULD RETRY THE TRANSACTION AGAIN HERE

      throw new TransactionNotConfirmedError({});
    }

    if (transactionResponse.meta?.err) {
      console.error(transactionResponse.meta?.err);
    }
    transactionResponse.transaction.signatures;

    explorerUrl = isDevnet
      ? `https://explorer.solana.com/tx/${transactionResponse.transaction.signatures}?cluster=devnet`
      : `https://solscan.io/tx/${transactionResponse.transaction.signatures}`;
    console.log("View transaction on explorer:", explorerUrl);
    status = true;
    return { signature: `${signature}`, status };
  }
  async sendTransaction(
    recipientAddress: string,
    amount: number,
    senderSecretKey: Uint8Array
  ) {
    const status = false;
    /**
     * internal method for sending sol transaction
     */
    const connection = this.connection;
    const senderKeypair = Keypair.fromSecretKey(senderSecretKey);

    try {
      new PublicKey(recipientAddress);
    } catch (error) {
      console.log(
        "the recipientAddress is not a valid public key",
        recipientAddress
      );
      throw new Error(error);
    }

    const senderBalance = await connection.getBalance(senderKeypair.publicKey);
    console.log("senderBalance: ", senderBalance);

    if (senderBalance < amount * LAMPORTS_PER_SOL) {
      console.log(
        "insufficient funds: sender balance is less than the amount to send"
      );
      throw new Error(
        "insufficient funds: sender balance is less than the amount to send"
      );
    }
    const amountPlusFees = amount * LAMPORTS_PER_SOL + 20045;

    if (senderBalance < amountPlusFees) {
      console.log(
        "insufficient funds + gass : sender balance is less than the amount  Plus gass to send"
      );
      throw new Error(
        "insufficient funds + gass : sender balance is less than the amount  Plus gass to send"
      );
    }
    // request a specific compute unit budget
    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
      units: 1500,
    });

    // set the desired priority fee
    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 30000,
    });
    const instructions: TransactionInstruction[] = [
      addPriorityFee,
      modifyComputeUnits,
      SystemProgram.transfer({
        fromPubkey: senderKeypair.publicKey,
        toPubkey: new PublicKey(recipientAddress),
        lamports: LAMPORTS_PER_SOL * amount,
      }),
    ];

    let latestBlockhash = await connection.getLatestBlockhash();

    const messageV0 = new TransactionMessage({
      payerKey: senderKeypair.publicKey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions,
    }).compileToV0Message();

    return await this.createSendConfirmRetryTransaction(
      messageV0,
      [senderKeypair],
      connection,
      latestBlockhash,
      this.isDevnet,
      senderKeypair,
      instructions
    );
  }
  async SendTransaction(recipientAddress: string, amount: number) {
    /**
     * master wallet sends a transaction to @param recipientAddress of @param amount
     */
    const masterKeyPair = this.masterKeyPair.privateKey;
    return await this.sendTransaction(recipientAddress, amount, masterKeyPair);
  }

  async getAddressWithBalance(addresses, connection: Connection) {
    const rentExemptionThreshold =
      await connection.getMinimumBalanceForRentExemption(0);
    const addressThatHasBalance: string[] = [];
    for (const address of addresses) {
      const senderBalance = await connection.getBalance(
        new PublicKey(address.address)
      );

      if (senderBalance > rentExemptionThreshold) {
        addressThatHasBalance.push(address as string);
      }
    }
    return addressThatHasBalance;
  }

  async sweepBatchTransaction(
    masterKeys: {
      privateKey: Uint8Array;
      publicKey: string;
    },
    sendersPrivateKeys: Uint8Array[]
  ) {
    let connection: Connection = this.connection;

    let recipientPublicKey: PublicKey;
    try {
      recipientPublicKey = new PublicKey(masterKeys.publicKey);
    } catch (error) {
      console.error(
        "The recipient address is not a valid public key:",
        masterKeys.publicKey
      );
      throw new Error(error.message);
    }

    const senderKeypairs: Keypair[] = [];

    for (const senderPrivateKey of sendersPrivateKeys) {
      const senderKeypair = Keypair.fromSecretKey(senderPrivateKey);
      senderKeypairs.push(senderKeypair);
    }

    // const GAS_FEE = 5000; // Adjusted gas fee  5005000
    const rentExemptionThreshold =
      await connection.getMinimumBalanceForRentExemption(0);

    // Request a specific compute unit budget
    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
      units: 1500,
    });
    // Set the desired priority fee
    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 30000, // Adjusted priority fee 10000000000
    });

    const initialInstructions: TransactionInstruction[] = [
      modifyComputeUnits,
      addPriorityFee,
    ];

    for (const senderKeypair of senderKeypairs) {
      const senderBalance = await connection.getBalance(
        senderKeypair.publicKey
      );
      const amountToSend = senderBalance - rentExemptionThreshold;

      if (amountToSend > 0) {
        const transferInstruction: TransactionInstruction =
          SystemProgram.transfer({
            fromPubkey: senderKeypair.publicKey,
            toPubkey: recipientPublicKey,
            lamports: amountToSend,
          });
        initialInstructions.push(transferInstruction);
      } else {
        console.log(
          `Skipping ${senderKeypair.publicKey.toBase58()} due to insufficient funds after rent exemption`
        );
      }
    }

    if (initialInstructions.length === 2) {
      throw new Error(
        "No valid transfer instructions. Ensure senders have sufficient balances."
      );
    }

    let latestBlockhash = await connection.getLatestBlockhash();

    const masterKeypair = Keypair.fromSecretKey(masterKeys.privateKey);
    senderKeypairs.push(masterKeypair);

    const messageV0 = new TransactionMessage({
      payerKey: masterKeypair.publicKey,
      recentBlockhash: latestBlockhash.blockhash,
      instructions: initialInstructions,
    }).compileToV0Message();

    //create, send, confirm,retry a new trasaction
    await this.createSendConfirmRetryTransaction(
      messageV0,
      senderKeypairs,
      connection,
      latestBlockhash,
      this.isDevnet,
      masterKeypair,
      initialInstructions
    );
  }
  async withdrawToMasterAddress(addresses: IAddress[]) {
    /**
     * @param addresses this is the list of All addresses that exist
     */

    let status = false;
    let addressThatHasBalance;
    try {
      addressThatHasBalance = await this.getAddressWithBalance(
        addresses,
        this.connection
      );
      console.log("addressThatHasBalance: ", addressThatHasBalance);
    } catch (error) {
      console.log("error:getAddressWithBalance ", error);
    }
    try {
      const privateKeysOfAddressThatHasBalance =
        this.solGetPrivateKeyFromAddressArray(addressThatHasBalance);
      this.sweepBatchTransaction(
        this.masterKeyPair,
        privateKeysOfAddressThatHasBalance
      );
    } catch (error) {
      console.log(
        "error:solGetPrivateKeyFromAddressArray orsweepBatchTransaction  ",
        error
      );
    }
  }
  async withdrawToSpecificAddress(addresses: IAddress[], address) {
    /**
     * @param addresses this is the list of All addresses that exist
     */

    let addr;
    try {
      addr = new PublicKey(address);
    } catch (error) {
      console.log("error: not a valid address ", error);
    }
    let status = false;
    let addressThatHasBalance;
    try {
      addressThatHasBalance = await this.getAddressWithBalance(
        addresses,
        this.connection
      );
      console.log("addressThatHasBalance: ", addressThatHasBalance);
    } catch (error) {
      console.log("error:getAddressWithBalance ", error);
    }
    try {
      const privateKeysOfAddressThatHasBalance =
        this.solGetPrivateKeyFromAddressArray(addressThatHasBalance);
      this.sweepBatchTransaction(addr, privateKeysOfAddressThatHasBalance);
    } catch (error) {
      console.log(
        "error:solGetPrivateKeyFromAddressArray orsweepBatchTransaction  ",
        error
      );
    }
  }

  async createSendConfirmRetryTransaction(
    messageV0: MessageV0,
    senderKeypairs: Keypair[],
    connection: Connection,
    latestBlockhash: Readonly<{
      blockhash: string;
      lastValidBlockHeight: number;
    }>,
    isDevnet: Boolean,
    feePayerKeypair: Keypair,
    initialInstructions: TransactionInstruction[]
  ) {
    const transaction = new VersionedTransaction(messageV0);
    transaction.sign(senderKeypairs);
    let signature;
    let retries = 5;
    let explorerUrl = "";

    while (retries > 0) {
      try {
        console.log("sending transaction...");
        signature = await connection.sendTransaction(transaction, {
          maxRetries: 3,
        });

        const confirmation = await connection.confirmTransaction({
          signature,
          blockhash: latestBlockhash.blockhash,
          lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
        });

        if (confirmation.value.err) {
          console.error("An error occurred:", confirmation.value.err);
        } else {
          explorerUrl = `${this.chain.explorer}/tx/${signature}`;
          console.log("View transaction on explorer:", explorerUrl);
        }
        return { status: true, signature: `${signature}`, explorerUrl };
        break; // If successful, exit the loop
      } catch (error) {
        if (error.message.includes("block height exceeded")) {
          retries -= 1;
          if (retries === 0) {
            console.error(
              "Failed to send transaction after multiple retries due to TransactionExpiredBlockheightExceededError:",
              error
            );
            throw error;
          } else {
            console.log(
              "Retrying transaction due to TransactionExpiredBlockheightExceededError: block height exceeded ..."
            );
            // Update latestBlockhash for retry
            latestBlockhash = await connection.getLatestBlockhash();
            const newMessageV0 = new TransactionMessage({
              payerKey: feePayerKeypair.publicKey,
              recentBlockhash: latestBlockhash.blockhash,
              instructions: initialInstructions,
            }).compileToV0Message();
            transaction.signatures = [];
            transaction.message = newMessageV0;
            transaction.sign(senderKeypairs);
          }
        } else {
          console.error("Failed to send transaction:", error);
          throw error;
        }
      }
    }
  }

  async sweepBatchTransactionV2(
    recipientAddress: PublicKeyInitData,
    sendersPrivateKeys: Uint8Array[]
  ) {
    const connection: Connection = this.connection;

    try {
      new PublicKey(recipientAddress);
    } catch (error) {
      console.log(
        "the recipientAddress is not a valid public key",
        recipientAddress
      );
      throw new Error(error);
    }
    const senderListLeyPair = [];

    const GAS_FEE = 5005000;
    // request a specific compute unit budget
    const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
      units: 500,
    });

    // set the desired priority fee
    const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
      microLamports: 10000000000,
    });

    const transaction = new Transaction()
      .add(addPriorityFee)
      .add(modifyComputeUnits);
    const AllSenderArrayKeypair: Keypair[] = [];
    for (const sender of sendersPrivateKeys) {
      const senderArrayKeypair = Keypair.fromSecretKey(sender);
      AllSenderArrayKeypair.push(senderArrayKeypair);
      const senderBalance = await connection.getBalance(
        new PublicKey(senderArrayKeypair.publicKey)
      );

      const amountToSend = senderBalance - GAS_FEE;
      console.log("amountToSend: ", amountToSend);
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: senderArrayKeypair.publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: amountToSend,
        })
      );
    }
    console.log("got heereee2");
    const estimatedfees = await transaction.getEstimatedFee(connection);
    console.log("estimatedfees: ", estimatedfees);
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    // Sign transaction, broadcast, and confirm
    const signature = await sendAndConfirmTransaction(
      connection,
      transaction,
      AllSenderArrayKeypair,
      {
        maxRetries: 5,
      }
    );
    console.log("SIGNATURE", signature);

    if (this.isDevnet) {
      console.log(
        "View tx on explorer:",
        `https://explorer.solana.com/tx/${signature}?cluster=devnet`
      );
    } else {
      console.log("View tx on explorer:", `https://solscan.io/tx/${signature}`);
    }
  }

  //INTERNAL
  solLoadAddresses(): IAddress[] {
    const addresses: IAddress[] = JSON.parse(
      fs.readFileSync(`Addresses-${this.addressFromSeed(0)}.json`, "utf8")
    );
    return addresses;
  }
  solGetMasterAddress(): string {
    return this.addressFromSeed(0);
  }
  solGetPrivateKeyFromAddressArray(AddressArray: IAddress[]) {
    const privateKeys = AddressArray.map((address: IAddress) => {
      const privateKey = this.solgetPrivateKeyFromSeed(address.index);
      return privateKey;
    });

    return privateKeys;
  }
  solCreateAddressAndAddToFIle(start: number, end: number) {
    const result = this.addressFromSeedMultiple(start, end);
    console.log("getMultiplePublicKeyFromSeed", result);
    fs.writeFileSync(
      `Addresses-${this.addressFromSeed(0)}.json`,
      JSON.stringify(result)
    );
  }

  //HELPERS
  solGetMultiplePublicKeyFromSeed(start: number, end: number) {
    let pubkeys: string[] = [];
    for (let i = start; i <= end; i++) {
      const publicKey = this.solGetPublicKeyFromSeed(i);
      pubkeys.push(publicKey);
    }
    return pubkeys;
  }
  addressFromSeedMultiple(start: number, end: number) {
    let addresses: IAddress[] = [];
    for (let i = start; i <= end; i++) {
      const _address = this.addressFromSeed(i);
      const address = {
        address: _address,
        index: i,
      };
      addresses.push(address);
    }
    return addresses;
  }
  addressFromSeed(index: number) {
    //address is same as public key
    return this.solGetPublicKeyFromSeed(index);
  }
  solGetPublicKeyFromSeed(index: number) {
    const keyPair = this.deriveChildPrivateKey(index);
    return keyPair.publicKey;
  }
  solgetPrivateKeyFromSeed(index: number) {
    const keyPair = this.deriveChildPrivateKey(index);
    return keyPair.privateKey;
  }
  GenerateNewSeed() {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const seedString = seed.toString("hex");
    console.log("seedString: ", seedString);
    return seedString;
  }
  solGetKeyPairFromSeed() {
    const restoredSeedBuffer = Buffer.from(this.seed, "hex").slice(0, 32);
    const seedPhraseKeypair = Keypair.fromSeed(restoredSeedBuffer);
    return seedPhraseKeypair;
  }
  deriveChildPrivateKey(index: number) {
    const derivedKeyPair = this.deriveChildKeypair(index);
    const privateKey = derivedKeyPair.secretKey;
    const publicKey = derivedKeyPair.publicKey.toBase58();
    return { privateKey, publicKey };
  }
  deriveChildKeypair(index: number) {
    const path = `m/44'/501'/0'/0'/${index}'`;
    // Derive a seed from the given path
    const derivedSeed = ed25519.derivePath(path, this.seed).key;
    const derivedKeyPair = Keypair.fromSeed(derivedSeed);
    return derivedKeyPair;
  }
  solConvertUint8ArrayToBase58(uint8Array: Uint8Array) {
    const base58String = bs58.encode(uint8Array);
    return base58String;
  }
}

export class SoonClass extends MasterSmartWalletClass {
  getNativeBalance = async (address: string) => {
    const connection = new Connection(
      this.chain.http[Math.floor(Math.random() * this.chain.http.length)]
    );
    try {
      const publicKey = new PublicKey(address);
      const bal = await connection.getBalance(publicKey);
      return bal;
    } catch (error) {
      console.log("error: ", error);
      console.log("error message: ", error.message);
      throw new Error(
        `the address passed is not a valid solana address : ${address}`
      );
    }
  };

  getTokenBalance = async (token: string) => {
    try {
      // Get the balance from the token account
      const tokenAccount = await this._getTokenAccountAccount(token);
      console.log("token: ", token);
      const tokenBalance = await this.connection.getTokenAccountBalance(
        tokenAccount.address
      );

      console.log(`User Token Balance: ${tokenBalance.value.uiAmount}`);
      //convert tokenBalance bigInt to decimal

      const tokenBalanceDecimal = tokenBalance.value.uiAmount;
      console.log("tokenBalanceDecimal: ", tokenBalanceDecimal);
      return tokenBalanceDecimal;
    } catch (error) {
      return 0;
    }
  };

  _getTokenAccountAccount = async (token: string): Promise<Account> => {
    try {
      // Create PublicKey objects for user and token mint
      const userPublicKeyObj = new PublicKey(this.masterAddress);
      const tokenMintAddressObj = new PublicKey(token);

      // Get the associated token account address for the user and the token mint
      const associatedTokenAccount = await getAssociatedTokenAddress(
        tokenMintAddressObj, // The token mint address
        userPublicKeyObj // The user's public key
      );

      // Fetch the token account information
      const tokenAccount = await getAccount(
        this.connection,
        associatedTokenAccount
      );

      return tokenAccount;
    } catch (error) {
      console.error("Error getting token balance:", error);
      throw error;
    }
  };
}

// const test = async () => {
//   const masterClass = new SoonClass();

//   const address = masterClass.solGetMasterAddress();
//   console.log("address: ", address);

//   const balance = await masterClass.getNativeBalance(address);
//   console.log("balance: ", balance);

//   //now to send transactions
//   const wallet1 = masterClass.addressFromSeed(1);
//   console.log("wallet1: ", wallet1);
//   // we will send sol from master to wallet1
//   const res = await masterClass.SendTransaction(wallet1, 0.001);
//   console.log("res: ", res);

//   //now for spl tokens
// };

export async function transactionSenderAndConfirmationWaiter({
  connection,
  serializedTransaction,
  blockhashWithExpiryBlockHeight,
}: TransactionSenderAndConfirmationWaiterArgs): Promise<VersionedTransactionResponse | null> {
  const txid = await connection.sendRawTransaction(
    serializedTransaction,
    SEND_OPTIONS
  );

  const controller = new AbortController();
  const abortSignal = controller.signal;

  const abortableResender = async () => {
    while (true) {
      await wait(2_000);
      if (abortSignal.aborted) return;
      try {
        await connection.sendRawTransaction(
          serializedTransaction,
          SEND_OPTIONS
        );
      } catch (e) {
        console.warn(`Failed to resend transaction: ${e}`);
      }
    }
  };

  try {
    abortableResender();
    const lastValidBlockHeight =
      blockhashWithExpiryBlockHeight.lastValidBlockHeight - 150;

    // this would throw TransactionExpiredBlockheightExceededError
    await Promise.race([
      connection.confirmTransaction(
        {
          ...blockhashWithExpiryBlockHeight,
          lastValidBlockHeight,
          signature: txid,
          abortSignal,
        },
        "confirmed"
      ),
      new Promise(async (resolve) => {
        // in case ws socket died
        while (!abortSignal.aborted) {
          await wait(2_000);
          const tx = await connection.getSignatureStatus(txid, {
            searchTransactionHistory: false,
          });
          if (tx?.value?.confirmationStatus === "confirmed") {
            resolve(tx);
          }
        }
      }),
    ]);
  } catch (e) {
    if (e instanceof TransactionExpiredBlockheightExceededError) {
      // we consume this error and getTransaction would return null
      return null;
    } else {
      // invalid state from web3.js
      throw e;
    }
  } finally {
    controller.abort();
  }

  // in case rpc is not synced yet, we add some retries
  const response = promiseRetry(
    async (retry) => {
      const response = await connection.getTransaction(txid, {
        commitment: "confirmed",
        maxSupportedTransactionVersion: 0,
      });
      if (!response) {
        retry(response);
      }
      return response;
    },
    {
      retries: 7,
      minTimeout: 1e3,
    }
  );

  return response;
}

export const wait = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

const SEND_OPTIONS = {
  skipPreflight: true,
  preflightCommitment: "processed" as Commitment,
};

export class TransactionNotConfirmedError extends Error {
  readonly id: string = APPLICATION_ERROR.TRANSACTION_NOT_CONFIRMED_ERROR;
  data: { [key: string]: string } | undefined;
  message = "Transaction not confirmed";
  name = `TransactionNotConfirmedError`;
  statusCode = 500;
  isOperational = true;

  // base constructor only accepts string message as an argument
  // we extend it here to accept an object, allowing us to pass other data
  constructor(data: { [key: string]: string }) {
    super(`Transaction not confirmed: ${JSON.stringify(data)}`);
    this.data = data; // this property is defined in parent
  }
}

export const APPLICATION_ERROR = {
  TRANSACTION_NOT_CONFIRMED_ERROR: "transaction_not_confirmed",
};
