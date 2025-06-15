import { createContext, ReactNode, useContext, useState } from 'react';

export type Transaction = {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
};

type TransactionsContextData = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  getBalance: () => {
    total: number;
    income: number;
    expenses: number;
  };
  getCategoryTotals: () => {
    category: string;
    amount: number;
    percentage: number;
  }[];
};

const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Math.random().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
    };

    setTransactions((prev) => [transaction, ...prev]);
  };

  const getBalance = () => {
    return transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.amount;
          acc.total += transaction.amount;
        } else {
          acc.expenses += transaction.amount;
          acc.total -= transaction.amount;
        }
        return acc;
      },
      { total: 0, income: 0, expenses: 0 }
    );
  };

  const getCategoryTotals = () => {
    const expensesByCategory = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);

    const totalExpenses = Object.values(expensesByCategory).reduce((a, b) => a + b, 0);

    return Object.entries(expensesByCategory).map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses ? (amount / totalExpenses) * 100 : 0,
    }));
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        addTransaction,
        getBalance,
        getCategoryTotals,
      }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error('useTransactions deve ser usado dentro de um TransactionsProvider');
  }
  return context;
} 