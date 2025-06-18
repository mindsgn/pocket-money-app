import { formatEther } from "ethers";
import { Network, Alchemy } from "alchemy-sdk"; 
import { getTotalBalance } from "utils/getTotalBalance";
import { getSpentInPeriod } from "utils/getSpent";
import { getTotalHistory } from "utils/getTotalHistory";

interface Tokens {
    balance: number,
    fiatBalance: number,
    symbol: string,
    currency: string,
    value: number,
    lastUpdatedAt: string
};

export async function GET(req: Request) { 
  const url = new URL(req.url);
  const address = url.searchParams.get("address") || "0x27dCeDe31563AcB77f9734B26424Be32423c4c43"
  const currency: string = url.searchParams.get("currency") || "zar"
  const type: string = "ethereum"

  try {
    switch (type) {
      case "optimism":
      case "polygon":
      case "gnosis":
      case "celo":
      case "base":
      case "arbitrum":
      case "ethereum":
                console.log(process.env.ALCHEMY_API)

                const balanceResponse = await getTotalBalance({ address, currency });
                const { tokenValue = 1 } = balanceResponse

                const TransactionHistory = await getTotalHistory({ address, tokenValue });
                
                const today = await getSpentInPeriod({
                    periodInDays: 1, transactions: TransactionHistory
                });
        
                const week = await getSpentInPeriod({
                    periodInDays: 7, transactions: TransactionHistory
                });
        
                const month = await getSpentInPeriod({
                    periodInDays: 30, transactions: TransactionHistory
                });

                return Response.json({
                    type,
                    ...balanceResponse,
                    transactions: TransactionHistory,
                    today,
                    week,
                    month
                })
            case "stellar":
                return {
                    type
                }
            case "bitcoin":
                return {
                    type
                }
            case "cardano":
                return {
                    type
                }
            default:
                throw new Error ("Error: Cannot create wallet");
        }
  } catch (error) {
    return Response.json({ 
      error: {
        message: `${error}`
      }
    });
  } finally {
    console.log("Done: GET /api/balance")
  }
};