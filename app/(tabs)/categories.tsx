import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { useTransactions } from '../../hooks/useTransactions';

export default function CategoriesScreen() {
  const { getCategoryTotals } = useTransactions();
  const categoryData = getCategoryTotals();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gastos por Categoria</Text>
        <Text style={styles.subtitle}>Este mês</Text>
      </View>

      <View style={styles.categoriesList}>
        {categoryData.map((item) => (
          <View key={item.category} style={styles.categoryItem}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryName}>{item.category}</Text>
              <Text style={styles.categoryPercentage}>
                {item.percentage.toFixed(1)}%
              </Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${item.percentage}%` },
                ]}
              />
            </View>
            
            <Text style={styles.categoryAmount}>
              R$ {item.amount.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total de Despesas</Text>
        <Text style={styles.totalAmount}>
          R$ {categoryData.reduce((acc, curr) => acc + curr.amount, 0).toFixed(2)}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  categoriesList: {
    padding: 16,
  },
  categoryItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  categoryPercentage: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Colors.background,
    borderRadius: 4,
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  categoryAmount: {
    fontSize: 14,
    color: '#666',
  },
  totalContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 12,
  },
  totalLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 4,
  },
}); 