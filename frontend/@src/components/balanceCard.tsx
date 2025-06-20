import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/@src/components/ui/card";
import { Skeleton } from "@/@src/components/ui/skeleton";
import { Award } from "lucide-react";

interface BalanceCardProps {
  isLoading: boolean;
  tokenName: string;
  tokenSymbol: string;
  balance: number;
}

export function BalanceCard({
  isLoading,
  tokenName,
  tokenSymbol,
  balance,
}: BalanceCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          Your Balance
        </CardTitle>
        <CardDescription>
          {isLoading ? (
            <Skeleton className="h-4 w-40" />
          ) : (
            `${tokenName} (${tokenSymbol})`
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-36 w-36 rounded-full bg-gradient-to-br from-primary/20 to-primary/5" />
            </div>
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-card">
              {isLoading ? (
                <Skeleton className="h-16 w-24 rounded-xl" />
              ) : (
                <div className="text-center">
                  <span className="text-4xl font-bold">
                    {balance.toLocaleString()}
                  </span>
                  <span className="text-sm text-muted-foreground block mt-1">
                    {tokenSymbol}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <div className="text-sm text-muted-foreground mb-2">
              {isLoading ? (
                <Skeleton className="h-4 w-60 mx-auto" />
              ) : (
                "Use your points to redeem exclusive rewards"
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
