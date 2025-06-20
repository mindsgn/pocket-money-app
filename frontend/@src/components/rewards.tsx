"use client";

import { Button } from "@/@src/components/ui/button";
import { Alert, AlertDescription } from "@/@src/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/@src/components/ui/tabs";
import { Gift, History, AlertCircle } from "lucide-react";
import { BalanceCard } from "@/@src/components/balanceCard";
import { RecentActivityCard } from "@/@src/components/recentActivityCard";

interface Rewards {
  isLoading: boolean;
  tokenName: string;
  tokenSymbol: string;
  balance: number;
  transactions: any;
  error: any;
}

export default function Rewards({
  isLoading,
  tokenName,
  tokenSymbol,
  balance,
  transactions,
  error,
}: Rewards) {
  if (error) {
    return (
      <div className="container mx-auto p-4 max-w-7xl">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <Button>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-3xl font-bold mb-2 md:mb-0">Rewards</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BalanceCard
            isLoading={isLoading}
            tokenName={tokenName}
            tokenSymbol={tokenSymbol}
            balance={balance}
          />
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="activity" className="flex items-center gap-2">
                <History className="h-4 w-4" />
                Recent Activity
              </TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <RecentActivityCard
                isLoading={isLoading}
                transactions={transactions}
                tokenSymbol={tokenSymbol}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
