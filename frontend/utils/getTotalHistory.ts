import { formatCompactNumber } from "./formatCompactNumber"

interface GetTotalHistory {
    address: string,
    tokenValue: number
}

interface Transactions {
    fiatValue?: number,
    formatedFiatValue?: string | number | undefined,
    transactionType?: string | "deposit" | "withdraw",
    timeStamp?: string
    blockNumber?: string,
    hash?: string,
    nonce?: string
    blockHash?: string,
    transactionIndex?: string,
    to?: string, 
    transactionFee?: number
}

const getTotalHistory = async({address, tokenValue }: GetTotalHistory) => {
    const chains = [42161, 8453, 10, 534352, 81457]

    try{
        const gnosisscanEndpoint = `${process.env.GNOSISSCAN_API_URL}?chainid=100&module=account&action=txlist&address=${address}&offset=10&sort=desc&apikey=${process.env.GNOSISSCAN_API_KEY}`;
            
        const response = await fetch(gnosisscanEndpoint);
        if (!response.ok) {
            throw new Error(` API error: ${response.statusText}`);
        }
        
        const data = await response.json();
        const transactions = data.result;

        console.log(data)

        const formatedTransactions: Transactions[] = [];

        //@ts-expect-error
        transactions.map((transaction, index) => {
            const { 
                    value, 
                    from, 
                    timeStamp, 
                    blockNumber, 
                    hash, 
                    nonce, 
                    blockHash, 
                    transactionIndex, 
                    to 
            } = transaction;
            
            const feeUsed = BigInt(transaction.gasUsed);
            const feePrice = BigInt(transaction.gasPrice);

            const gasFeeWei = feeUsed * feePrice;

            const transactionFee = (Number(gasFeeWei) / 1e18) * tokenValue;
            
            const valueInEth = Number(value) / 1e18;
            const fiatValue : number = valueInEth * tokenValue;
            
            let transactionType: string = "deposit";
            
            if(from === address.toLowerCase()){
                transactionType = "withdraw"
            }

            const formatedFiatValue: string | number | undefined = formatCompactNumber(fiatValue);
            
            formatedTransactions.push({
                fiatValue,
                formatedFiatValue,
                transactionType,
                timeStamp,
                blockNumber,
                hash,
                nonce,
                blockHash, 
                transactionIndex, 
                to,
                transactionFee
            });
        })

        if (data.status === '1') {
            return formatedTransactions;
        }

        return [];
    } catch (error) {
        console.log(error)
        return []
    }
}

export {
    getTotalHistory
}