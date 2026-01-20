/**
 * Ekran statystyk
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import API from '../services/api';

const StatsScreen = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await API.getStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.centerContainer}>
        <Text>Nie udało się załadować statystyk</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Statystyki</Text>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.total_offers || 0}</Text>
          <Text style={styles.statLabel}>Wszystkie oferty</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.selected_offers || 0}</Text>
          <Text style={styles.statLabel}>Wybrane oferty</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.pending_offers || 0}</Text>
          <Text style={styles.statLabel}>Oczekujące</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.success_rate || 0}%</Text>
          <Text style={styles.statLabel}>Skuteczność</Text>
        </View>

        {stats.average_price > 0 && (
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {stats.average_price.toFixed(2)} zł
            </Text>
            <Text style={styles.statLabel}>Średnia cena ofert</Text>
          </View>
        )}

        {stats.offers_today !== undefined && (
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.offers_today}</Text>
            <Text style={styles.statLabel}>Oferty dzisiaj</Text>
          </View>
        )}

        {stats.offers_week !== undefined && (
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.offers_week}</Text>
            <Text style={styles.statLabel}>Oferty w tym tygodniu</Text>
          </View>
        )}

        {stats.offers_month !== undefined && (
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{stats.offers_month}</Text>
            <Text style={styles.statLabel}>Oferty w tym miesiącu</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000',
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff0000',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#666666',
  },
});

export default StatsScreen;
