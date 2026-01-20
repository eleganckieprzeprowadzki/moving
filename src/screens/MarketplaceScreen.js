/**
 * Ekran giełdy zleceń
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import API from '../services/api';
import OrderCard from '../components/OrderCard';
import FilterModal from '../components/FilterModal';

const MarketplaceScreen = ({navigation}) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadOrders();
  }, [filters]);

  const loadOrders = async (pageNum = 1) => {
    if (loading) return;

    setLoading(true);
    try {
      const response = await API.getOrders(filters, pageNum, 20);
      if (response.success) {
        if (pageNum === 1) {
          setOrders(response.data);
        } else {
          setOrders(prev => [...prev, ...response.data]);
        }
        setHasMore(response.pagination.page < response.pagination.total_pages);
        setPage(pageNum);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadOrders(1);
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      loadOrders(page + 1);
    }
  };

  const handleOrderPress = (order) => {
    navigation.navigate('OrderDetails', {orderId: order.id});
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilters(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Giełda Zleceń</Text>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}>
          <Text style={styles.filterButtonText}>Filtry</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <OrderCard order={item} onPress={() => handleOrderPress(item)} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Brak dostępnych zleceń</Text>
          </View>
        }
      />

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        onApply={handleApplyFilters}
        initialFilters={filters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#ff0000',
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
  },
});

export default MarketplaceScreen;
