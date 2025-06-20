import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/@src/components/ui/card";
import { Button } from "@/@src/components/ui/button";
import { Skeleton } from "@/@src/components/ui/skeleton";
import Image from "next/image";

interface RewardsCardProps {
  isLoading: boolean;
  userProfile: any;
}

export function RewardsCard({ isLoading, userProfile }: RewardsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Rewards</CardTitle>
        <CardDescription>Redeem your points for these rewards</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-16 w-16 rounded" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-24 mb-2" />
                      <Skeleton className="h-4 w-32 mb-3" />
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : userProfile?.availableRewards?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {userProfile.availableRewards.map((reward: any) => (
              <Card key={reward.id} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 relative rounded overflow-hidden">
                      <Image
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{reward.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {reward.description}
                      </p>
                      <Button
                        size="sm"
                        className="w-full"
                        disabled={userProfile.balance < reward.pointsCost}
                      >
                        Redeem for {reward.pointsCost} {userProfile.tokenSymbol}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center py-6 text-muted-foreground">
            No rewards available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
