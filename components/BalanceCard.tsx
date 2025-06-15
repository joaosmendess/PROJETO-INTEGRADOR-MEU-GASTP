import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';

type BalanceCardProps = {
  balance: number;
  income: number;
  expenses: number;
};

export default function BalanceCard({ balance, income, expenses }: BalanceCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.label}>Saldo Total</Text>
        <Text style={styles.balance}>R$ {balance.toFixed(2)}</Text>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Receitas</Text>
          <Text style={[styles.statValue, styles.income]}>
            + R$ {income.toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.divider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Despesas</Text>
          <Text style={[styles.statValue, styles.expense]}>
            - R$ {expenses.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    margin: 16,
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  balance: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#fff',
    opacity: 0.2,
    marginHorizontal: 16,
  },
  statLabel: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  income: {
    color: '#fff',
  },
  expense: {
    color: '#fff',
  },
}); 