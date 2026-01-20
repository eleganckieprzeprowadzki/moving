/**
 * Komponent karty oferty
 */

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {formatPrice, formatDate} from '../utils/helpers';
import {OFFER_STATUS} from '../config/constants';

const OfferCard = ({offer}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'selected':
        return '#4caf50';
      case 'rejected':
        return '#f44336';
      case 'withdrawn':
        return '#666666';
      default:
        return '#ff9800';
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>
          {offer.order_number || `Zamówienie #${offer.order_id}`}
        </Text>
        <View
          style={[
            styles.statusBadge,
            {backgroundColor: getStatusColor(offer.status)},
          ]}>
          <Text style={styles.statusText}>
            {offer.status_label || OFFER_STATUS[offer.status]}
          </Text>
        </View>
      </View>

      <View style={styles.priceContainer}>
        <Text style={styles.price}>{formatPrice(offer.price)}</Text>
      </View>

      {offer.description && (
        <Text style={styles.description} numberOfLines={2}>
          {offer.description}
        </Text>
      )}

      {offer.estimated_duration && (
        <Text style={styles.duration}>
          Czas realizacji: {offer.estimated_duration}
        </Text>
      )}

      <Text style={styles.date}>
        Złożono: {formatDate(offer.created_at)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  priceContainer: {
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  duration: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
  },
});

export default OfferCard;
