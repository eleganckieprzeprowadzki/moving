/**
 * Ekran szczegółów zamówienia
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import API from '../services/api';
import {formatDate, formatPrice, timeUntilDeadline} from '../utils/helpers';
import {MOVING_TYPES} from '../config/constants';

const OrderDetailsScreen = ({route, navigation}) => {
  const {orderId} = route.params;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrderDetails();
  }, [orderId]);

  const loadOrderDetails = async () => {
    try {
      const response = await API.getOrderDetails(orderId);
      if (response.success) {
        setOrder(response.data);
      }
    } catch (error) {
      console.error('Error loading order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOffer = () => {
    navigation.navigate('OfferForm', {orderId: order.id});
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (!order) {
    return (
      <View style={styles.centerContainer}>
        <Text>Nie znaleziono zamówienia</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.orderNumber}>{order.order_number}</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trasa</Text>
          <Text style={styles.label}>Z:</Text>
          <Text style={styles.value}>{order.pickup_address}</Text>
          <Text style={styles.label}>Do:</Text>
          <Text style={styles.value}>{order.delivery_address}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Szczegóły</Text>
          <Text style={styles.label}>Typ przeprowadzki:</Text>
          <Text style={styles.value}>
            {MOVING_TYPES[order.moving_type] || order.moving_type}
          </Text>
          <Text style={styles.label}>Liczba osób:</Text>
          <Text style={styles.value}>{order.people_count}</Text>
          <Text style={styles.label}>Data usługi:</Text>
          <Text style={styles.value}>{formatDate(order.service_date)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Termin składania ofert</Text>
          <Text style={styles.deadline}>
            {timeUntilDeadline(order.offers_deadline)}
          </Text>
        </View>

        {order.notes && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Uwagi</Text>
            <Text style={styles.value}>{order.notes}</Text>
          </View>
        )}

        {!order.has_offer && (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmitOffer}>
            <Text style={styles.submitButtonText}>Złóż ofertę</Text>
          </TouchableOpacity>
        )}

        {order.has_offer && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Złożyłeś już ofertę na to zamówienie
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  orderNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ff0000',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000000',
  },
  label: {
    fontSize: 14,
    color: '#666666',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 4,
  },
  deadline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  submitButton: {
    backgroundColor: '#ff0000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  infoText: {
    color: '#1976d2',
    textAlign: 'center',
  },
});

export default OrderDetailsScreen;
