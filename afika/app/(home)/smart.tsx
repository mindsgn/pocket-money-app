import { useEffect, useState } from "react";
import { usePrivy, useEmbeddedEthereumWallet } from "@privy-io/expo";
import { Button, Text, View } from "react-native";
import { zeroAddress } from "viem";
import { useKernelClient } from "@/hooks/use-Kernal";
import { base } from "viem/chains";
import { createPublicClient, http } from "viem";

const publicClient = createPublicClient({
  chain: base,
  transport: http(),
});

export default function HomeScreen() {
  const [smartAccountDeployed, setSmartAccountDeployed] = useState<boolean | null>(null);

  const { wallets } = useEmbeddedEthereumWallet();

  const wallet = wallets?.[0];

  const { kernelAddress, kernelClient, loading } = useKernelClient(
    wallet
  );

  useEffect(() => {
    let mounted = true;

    const checkDeployed = async () => {
      if (!kernelAddress) {
        setSmartAccountDeployed(null);
        return;
      }

      try {
        const code = await publicClient.getCode({
          address: kernelAddress,
        });

        if (mounted) {
          setSmartAccountDeployed(code !== "0x");
        }
      } catch (error) {
        console.warn("Failed to check smart account deployment:", error);
        if (mounted) {
          setSmartAccountDeployed(null);
        }
      }
    };

    checkDeployed();

    return () => {
      mounted = false;
    };
  }, [kernelAddress]);

  const sendTestUserOp = async () => {
    if (!kernelClient) return;

    const userOpHash = await kernelClient.sendUserOperation({
      callData: await kernelClient.account.encodeCalls([
        {
          to: zeroAddress,
          value: BigInt(0),
          data: "0x",
        },
      ]),
    });

    console.log("UserOp hash:", userOpHash);

    const receipt = await kernelClient.waitForUserOperationReceipt({
      hash: userOpHash,
    });

    console.log("Receipt:", receipt);
  };


  return (
    <View style={{ flex: 1, padding: 24, justifyContent: "center", gap: 16 }}>
        <Text>Logged in</Text>

        <Text>Privy wallet:</Text>
        <Text>{wallet?.address ?? "Creating wallet..."}</Text>

        <Text>Smart account:</Text>
        <Text>{loading ? "Creating Kernel..." : kernelAddress}</Text>

        <Text>Deployed:</Text>
        <Text>
          {smartAccountDeployed === null
            ? "Checking..."
            : smartAccountDeployed
            ? "Yes"
            : "No"}
        </Text>
        <Button title="Send sponsored test UserOp" onPress={sendTestUserOp} />
    </View>
  );
}