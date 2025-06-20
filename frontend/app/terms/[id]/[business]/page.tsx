import Rewards from "@/@src/components/rewards";
import { Suspense } from "react";

interface Params {
  id: string;
  business: string;
}

export default async function RewardsPage({
  params,
}: {
  params: Promise<Params>;
}) {
  let isLoading = true;
  const { id, business } = await params;

  const data = await fetch(
    `http://localhost:3000/api/rewards?customer=${id}&business=${business}`,
  );
  const response = await data.json();
  const { total, points, transactions, error } = response;
  const { name, symbol } = points;
  isLoading = false;

  return (
    <Suspense>
      <Rewards
        isLoading={isLoading}
        tokenName={name}
        tokenSymbol={symbol}
        balance={total}
        transactions={transactions}
        error={error}
      />
    </Suspense>
  );
}
