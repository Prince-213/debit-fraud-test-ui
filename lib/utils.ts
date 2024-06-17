import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface CartItem {
  id: string;
  product: string;
  productId: string;
  image: string;
  quantity: number;
  price: number;
  total: number;
}

interface Transaction {
  id: number;
  date: string;
  amount: number;
  currency: string;
  description: string;
}

// Define the finance info type
export interface FinanceInfo {
  name: string;
  email: string;
  cardNumber: string;
  cardCVV: string;
  cardExpiry: string;
  accountNumber: string;
  bankName: string;
  status: string;
  bankBalance: number;
  transactions: Transaction[];
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const aggregateData = async (data: CartItem[]) => {
  const consolidatedItems: { [key: string]: CartItem } = {};

  // Iterate over the array of items
  data.forEach((item) => {
    const productId = item.productId;
    if (consolidatedItems[productId]) {
      // Update the quantity and total
      consolidatedItems[productId].quantity += item.quantity;
      consolidatedItems[productId].total += item.total;
    } else {
      // Add new item to the object
      consolidatedItems[productId] = { ...item };
    }
  });

  // Convert the consolidated object back to an array
  const consolidatedArray: CartItem[] = Object.values(consolidatedItems);
  return consolidatedArray;
  // Log the consolidated array
  console.log(consolidatedArray);
};

/* export const populate = () => {
  // Utility function to generate random integers
  function getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Define the transaction type

  // Create the finance info object
  const financeInfo: FinanceInfo = {
    name: "John Doe",
    email: "johndoe@example.com",
    cardNumber: "1234 5678 9012 3456",
    cardCVV: "123",
    cardExpiry: "12/25",
    accountNumber: "1234567890",
    bankName: "Example Bank",
    bankBalance: getRandomInt(100000, 5000000), // Random bank balance between 100,000 and 5,000,000 Naira
    transactions: [],
  };

  // Generate a maximum of 60 transactions
  const numTransactions = 60;

  for (let i = 0; i < numTransactions; i++) {
    const transaction: Transaction = {
      id: i + 1,
      date: new Date(2024, getRandomInt(0, 11), getRandomInt(1, 28))
        .toISOString()
        .split("T")[0], // Random date in 2024
      amount: getRandomInt(500, 40000), // Random amount between 500 and 40,000 Naira
      currency: "NGN",
      description: `Transaction ${i + 1}`,
    };
    financeInfo.transactions.push(transaction);
  }

  // Log the JSON
  console.log(JSON.stringify(financeInfo, null, 2));
};
 */

type UserData = {
  name: string;
  email: string;
  cardNumber: string;
  cardCVV: string;
  cardExpiry: string;
  accountNumber: string;
  bankName: string;
  bankBalance: number;
  transactions: Transaction[];
};

const userData: UserData = {
  name: "John Doe",
  email: "johndoe@example.com",
  cardNumber: "1234 5678 9012 3456",
  cardCVV: "123",
  cardExpiry: "12/25",
  accountNumber: "1234567890",
  bankName: "Example Bank",
  bankBalance: 376415,
  transactions: [
    {
      id: 1,
      date: "2024-06-16",
      amount: 36053,
      currency: "NGN",
      description: "Transaction 1",
    },
    {
      id: 2,
      date: "2024-09-20",
      amount: 3268,
      currency: "NGN",
      description: "Transaction 2",
    },
    {
      id: 3,
      date: "2024-12-14",
      amount: 34645,
      currency: "NGN",
      description: "Transaction 3",
    },
    {
      id: 4,
      date: "2024-09-26",
      amount: 12902,
      currency: "NGN",
      description: "Transaction 4",
    },
    {
      id: 5,
      date: "2024-05-17",
      amount: 17295,
      currency: "NGN",
      description: "Transaction 5",
    },
    {
      id: 6,
      date: "2024-05-23",
      amount: 30063,
      currency: "NGN",
      description: "Transaction 6",
    },
    {
      id: 7,
      date: "2024-06-11",
      amount: 22187,
      currency: "NGN",
      description: "Transaction 7",
    },
    {
      id: 8,
      date: "2024-11-08",
      amount: 25536,
      currency: "NGN",
      description: "Transaction 8",
    },
    {
      id: 9,
      date: "2024-09-23",
      amount: 6486,
      currency: "NGN",
      description: "Transaction 9",
    },
    {
      id: 10,
      date: "2024-03-31",
      amount: 3017,
      currency: "NGN",
      description: "Transaction 10",
    },
    {
      id: 11,
      date: "2024-05-23",
      amount: 6509,
      currency: "NGN",
      description: "Transaction 11",
    },
    {
      id: 12,
      date: "2024-10-03",
      amount: 18659,
      currency: "NGN",
      description: "Transaction 12",
    },
    {
      id: 13,
      date: "2024-09-02",
      amount: 26714,
      currency: "NGN",
      description: "Transaction 13",
    },
    {
      id: 14,
      date: "2024-04-22",
      amount: 37944,
      currency: "NGN",
      description: "Transaction 14",
    },
    {
      id: 15,
      date: "2024-10-02",
      amount: 39824,
      currency: "NGN",
      description: "Transaction 15",
    },
    {
      id: 16,
      date: "2024-01-20",
      amount: 7333,
      currency: "NGN",
      description: "Transaction 16",
    },
    {
      id: 17,
      date: "2024-02-07",
      amount: 10741,
      currency: "NGN",
      description: "Transaction 17",
    },
    {
      id: 18,
      date: "2024-05-26",
      amount: 13774,
      currency: "NGN",
      description: "Transaction 18",
    },
    {
      id: 19,
      date: "2024-12-13",
      amount: 8487,
      currency: "NGN",
      description: "Transaction 19",
    },
    {
      id: 20,
      date: "2024-05-17",
      amount: 12109,
      currency: "NGN",
      description: "Transaction 20",
    },
    {
      id: 21,
      date: "2024-11-15",
      amount: 2495,
      currency: "NGN",
      description: "Transaction 21",
    },
    {
      id: 22,
      date: "2024-08-25",
      amount: 31527,
      currency: "NGN",
      description: "Transaction 22",
    },
    {
      id: 23,
      date: "2024-03-25",
      amount: 5119,
      currency: "NGN",
      description: "Transaction 23",
    },
    {
      id: 24,
      date: "2024-09-15",
      amount: 16876,
      currency: "NGN",
      description: "Transaction 24",
    },
    {
      id: 25,
      date: "2024-02-25",
      amount: 28671,
      currency: "NGN",
      description: "Transaction 25",
    },
    {
      id: 26,
      date: "2024-06-11",
      amount: 5007,
      currency: "NGN",
      description: "Transaction 26",
    },
    {
      id: 27,
      date: "2024-02-25",
      amount: 37517,
      currency: "NGN",
      description: "Transaction 27",
    },
    {
      id: 28,
      date: "2024-09-07",
      amount: 35234,
      currency: "NGN",
      description: "Transaction 28",
    },
    {
      id: 29,
      date: "2024-12-17",
      amount: 29461,
      currency: "NGN",
      description: "Transaction 29",
    },
    {
      id: 30,
      date: "2024-11-12",
      amount: 1555,
      currency: "NGN",
      description: "Transaction 30",
    },
    {
      id: 31,
      date: "2024-11-08",
      amount: 16758,
      currency: "NGN",
      description: "Transaction 31",
    },
    {
      id: 32,
      date: "2024-07-27",
      amount: 35959,
      currency: "NGN",
      description: "Transaction 32",
    },
    {
      id: 33,
      date: "2024-01-01",
      amount: 9965,
      currency: "NGN",
      description: "Transaction 33",
    },
    {
      id: 34,
      date: "2024-02-09",
      amount: 8612,
      currency: "NGN",
      description: "Transaction 34",
    },
    {
      id: 35,
      date: "2024-01-13",
      amount: 15129,
      currency: "NGN",
      description: "Transaction 35",
    },
    {
      id: 36,
      date: "2024-01-26",
      amount: 9680,
      currency: "NGN",
      description: "Transaction 36",
    },
    {
      id: 37,
      date: "2024-08-14",
      amount: 27764,
      currency: "NGN",
      description: "Transaction 37",
    },
    {
      id: 38,
      date: "2024-12-05",
      amount: 36743,
      currency: "NGN",
      description: "Transaction 38",
    },
    {
      id: 39,
      date: "2024-04-26",
      amount: 11912,
      currency: "NGN",
      description: "Transaction 39",
    },
    {
      id: 40,
      date: "2024-07-19",
      amount: 37366,
      currency: "NGN",
      description: "Transaction 40",
    },
    {
      id: 41,
      date: "2024-12-10",
      amount: 4501,
      currency: "NGN",
      description: "Transaction 41",
    },
    {
      id: 42,
      date: "2024-02-20",
      amount: 12733,
      currency: "NGN",
      description: "Transaction 42",
    },
    {
      id: 43,
      date: "2024-03-19",
      amount: 20332,
      currency: "NGN",
      description: "Transaction 43",
    },
    {
      id: 44,
      date: "2024-01-06",
      amount: 35681,
      currency: "NGN",
      description: "Transaction 44",
    },
    {
      id: 45,
      date: "2024-08-02",
      amount: 14256,
      currency: "NGN",
      description: "Transaction 45",
    },
    {
      id: 46,
      date: "2024-05-18",
      amount: 37981,
      currency: "NGN",
      description: "Transaction 46",
    },
    {
      id: 47,
      date: "2024-06-09",
      amount: 37402,
      currency: "NGN",
      description: "Transaction 47",
    },
    {
      id: 48,
      date: "2024-02-16",
      amount: 12560,
      currency: "NGN",
      description: "Transaction 48",
    },
    {
      id: 49,
      date: "2024-12-25",
      amount: 37254,
      currency: "NGN",
      description: "Transaction 49",
    },
    {
      id: 50,
      date: "2024-02-11",
      amount: 35110,
      currency: "NGN",
      description: "Transaction 50",
    },
    {
      id: 51,
      date: "2024-07-18",
      amount: 21212,
      currency: "NGN",
      description: "Transaction 51",
    },
    {
      id: 52,
      date: "2024-04-24",
      amount: 16122,
      currency: "NGN",
      description: "Transaction 52",
    },
    {
      id: 53,
      date: "2024-01-19",
      amount: 20378,
      currency: "NGN",
      description: "Transaction 53",
    },
    {
      id: 54,
      date: "2024-06-09",
      amount: 35936,
      currency: "NGN",
      description: "Transaction 54",
    },
    {
      id: 55,
      date: "2024-05-08",
      amount: 15676,
      currency: "NGN",
      description: "Transaction 55",
    },
    {
      id: 56,
      date: "2024-10-15",
      amount: 19855,
      currency: "NGN",
      description: "Transaction 56",
    },
    {
      id: 57,
      date: "2024-04-20",
      amount: 37588,
      currency: "NGN",
      description: "Transaction 57",
    },
    {
      id: 58,
      date: "2024-08-31",
      amount: 3235,
      currency: "NGN",
      description: "Transaction 58",
    },
    {
      id: 59,
      date: "2024-11-07",
      amount: 7222,
      currency: "NGN",
      description: "Transaction 59",
    },
    {
      id: 60,
      date: "2024-07-03",
      amount: 13433,
      currency: "NGN",
      description: "Transaction 60",
    },
  ],
};

const suspiciousActivityThreshold = {
  highValue: 35000, // Define what you consider as a high-value transaction
  frequentTransactionsTimeFrame: 60000 * 60 * 24, // 24 hours in milliseconds
  largeDeviationMultiplier: 3, // Transactions deviating from the average by this multiplier are flagged
};

type SuspiciousCheckResult = {
  suspicious: boolean;
  reason: string;
};

export function isTransactionSuspicious(
  transaction: Transaction,
  userData: UserData
): SuspiciousCheckResult {
  const transactions = userData.transactions;

  // Calculate average transaction amount
  const totalAmount = transactions.reduce((sum, tx) => sum + tx.amount, 0);
  const averageTransactionAmount = totalAmount / transactions.length;

  // Check for high-value transaction
  if (transaction.amount > suspiciousActivityThreshold.highValue) {
    return { suspicious: true, reason: "High Value" };
  }

  // Check for large deviation from average
  if (
    transaction.amount >
    averageTransactionAmount *
      suspiciousActivityThreshold.largeDeviationMultiplier
  ) {
    return { suspicious: true, reason: "Large Deviation from Average" };
  }

  // Check for frequent transactions
  const transactionDate = new Date(transaction.date);
  const frequentTransactions = transactions.filter((tx) => {
    const txDate = new Date(tx.date);
    return (
      Math.abs(transactionDate.getTime() - txDate.getTime()) <=
      suspiciousActivityThreshold.frequentTransactionsTimeFrame
    );
  });

  if (
    frequentTransactions.length >
    suspiciousActivityThreshold.frequentTransactionsTimeFrame
  ) {
    return { suspicious: true, reason: "Frequent Transactions" };
  }

  return { suspicious: false, reason: "None" };
}

// Example transaction to check
const newTransaction: Transaction = {
  id: 61,
  date: "2024-06-18",
  amount: 40000, // Example amount to test
  currency: "NGN",
  description: "New Transaction",
};

const result = isTransactionSuspicious(newTransaction, userData);
console.log(result);

export function calculateTotalPrice(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
}
