import { ScrollView, StyleSheet, View } from 'react-native';
import BalanceCard from '../../components/BalanceCard';
import TransactionCard from '../../components/TransactionCard';
import Colors from '../../constants/Colors';
import { useTransactions } from '../../hooks/useTransactions';

export default function HomeScreen() {
  const { transactions, getBalance } = useTransactions();
  const balance = getBalance();

  return (
    <ScrollView style={styles.container}>
      <BalanceCard
        balance={balance.total}
        income={balance.income}
        expenses={balance.expenses}
      />
      
      <View style={styles.transactionsContainer}>
        {transactions.slice(0, 5).map((transaction) => (
          <TransactionCard
            key={transaction.id}
            type={transaction.type}
            amount={transaction.amount}
            description={transaction.description}
            category={transaction.category}
            date={transaction.date}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  transactionsContainer: {
    padding: 16,
  },
});
