import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';

type TransactionCardProps = {
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
};

export default function TransactionCard({ type, amount, description, category, date }: TransactionCardProps) {
  const isIncome = type === 'income';

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialIcons
          name={isIncome ? 'arrow-circle-up' : 'arrow-circle-down'}
          size={24}
          color={isIncome ? Colors.success : Colors.error}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={[styles.amount, isIncome ? styles.income : styles.expense]}>
          {isIncome ? '+' : '-'} R$ {amount.toFixed(2)}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
  },
  category: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  income: {
    color: Colors.success,
  },
  expense: {
    color: Colors.error,
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
}); 