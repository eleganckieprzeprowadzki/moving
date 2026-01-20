/**
 * Komponent karty zamówienia
 */

import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {formatDate, timeUntilDeadline} from '../utils/helpers';

const OrderCard = ({order, onPress}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.orderNumber}>{order.order_number}</Text>
        <Text style={styles.deadline}>
          {timeUntilDeadline(order.offers_deadline)}
        </Text>
      </View>

      <View style={styles.route}>
        <Text style={styles.routeLabel}>Z:</Text>
        <Text style={styles.routeAddress} numberOfLines={1}>
          {order.pickup_address}
        </Text>
      </View>

      <View style={styles.route}>
        <Text style={styles.routeLabel}>Do:</Text>
        <Text style={styles.routeAddress} numberOfLines={1}>
          {order.delivery_address}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>{formatDate(order.service_date)}</Text>
        {order.distance_km && (
          <Text style={styles.distance}>
            {order.distance_km.toFixed(1)} km
          </Text>
        )}
      </View>
    </TouchableOpacity>
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
    color: '#ff0000',
  },
  deadline: {
    fontSize: 14,
    color: '#666666',
  },
  route: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  routeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666666',
    marginRight: 8,
    width: 30,
  },
  routeAddress: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  date: {
    fontSize: 14,
    color: '#666666',
  },
  distance: {
    fontSize: 14,
    color: '#666666',
  },
});

export default OrderCard;
