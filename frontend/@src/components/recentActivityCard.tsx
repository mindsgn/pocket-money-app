"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/@src/components/ui/card";
import { Skeleton } from "@/@src/components/ui/skeleton";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

interface RecentActivityCardProps {
  isLoading: boolean;
  transactions: any;
  tokenSymbol: string;
}

export function RecentActivityCard({
  isLoading,
  transactions,
  tokenSymbol,
}: RecentActivityCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your recent point transactions</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-4 w-40 mb-2" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
            ))}
          </div>
        ) : transactions.length > 0 ? (
          <div className="space-y-4">
            {transactions.map((activity: any) => (
              <div
                key={activity.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.type === "send"
                        ? "bg-green-100"
                        : "bg-orange-100"
                    }`}
                  >
                    {activity.type === "send" ? (
                      <ArrowDownLeft className={`h-5 w-5 text-green-600`} />
                    ) : (
                      <ArrowUpRight className={`h-5 w-5 text-orange-600`} />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(activity.timestamp)}
                    </p>
                  </div>
                </div>
                <div
                  className={`font-medium ${activity.type === "send" ? "text-green-600" : "text-orange-600"}`}
                >
                  {activity.type === "send" ? "+" : "-"}
                  {activity.amount} {tokenSymbol}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center py-6 text-muted-foreground">
            No recent activity found
          </p>
        )}
      </CardContent>
    </Card>
  );
}
