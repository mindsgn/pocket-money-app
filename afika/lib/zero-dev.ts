import { http, createPublicClient } from "viem";
import { baseSepolia } from "viem/chains";
import { createKernelAccount, createKernelAccountClient } from "@zerodev/sdk";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
// import { createSmartAccountClient } from "permissionless";
import { entryPoint07Address } from "viem/account-abstraction";

const ZERODEV_PROJECT_ID = process.env.EXPO_PUBLIC_ZERODEV_PROJECT_ID!;

const chain = baseSepolia;

const bundlerRpc = `https://rpc.zerodev.app/api/v3/${ZERODEV_PROJECT_ID}/chain/${chain.id}`;
const paymasterRpc = `https://rpc.zerodev.app/api/v3/${ZERODEV_PROJECT_ID}/chain/${chain.id}`;

export async function createZeroDevSmartAccount(owner: any) {
  const publicClient = createPublicClient({
    chain,
    transport: http(),
  });

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer: owner,
    entryPoint: {
      address: entryPoint07Address,
      version: "0.7",
    },
    kernelVersion: "0.3.1",
  });

  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint: {
      address: entryPoint07Address,
      version: "0.7",
    },
    kernelVersion: "0.3.1",
  });

  const kernelClient = createKernelAccountClient({
    account,
    chain,
    bundlerTransport: http(bundlerRpc),
    paymaster: {
      getPaymasterData: async (userOperation) => {
        const res = await fetch(paymasterRpc, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            id: 1,
            method: "pm_sponsorUserOperation",
            params: [userOperation, entryPoint07Address],
          }),
        });

        const json = await res.json();
        return json.result;
      },
    },
  });

  const smartAccountAddress = await account.getAddress();

  return {
    account,
    kernelClient,
    smartAccountAddress,
  };
}