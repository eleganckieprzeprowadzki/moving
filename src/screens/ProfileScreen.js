/**
 * Ekran profilu użytkownika
 */

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import API from '../services/api';
import {clearAll} from '../services/storage';

const ProfileScreen = ({navigation}) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const response = await API.getProfile();
      if (response.success) {
        setProfile(response.data);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert('Wylogowanie', 'Czy na pewno chcesz się wylogować?', [
      {text: 'Anuluj', style: 'cancel'},
      {
        text: 'Wyloguj',
        style: 'destructive',
        onPress: async () => {
          try {
            await API.logout();
            await clearAll();
            navigation.replace('Auth');
          } catch (error) {
            console.error('Error logging out:', error);
            await clearAll();
            navigation.replace('Auth');
          }
        },
      },
    ]);
  };

  const handleStats = () => {
    navigation.navigate('Stats');
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff0000" />
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text>Nie znaleziono profilu</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dane firmy</Text>
          <Text style={styles.label}>Nazwa firmy:</Text>
          <Text style={styles.value}>{profile.company_name}</Text>
          <Text style={styles.label}>NIP:</Text>
          <Text style={styles.value}>{profile.nip}</Text>
          <Text style={styles.label}>Adres:</Text>
          <Text style={styles.value}>{profile.company_address}</Text>
          <Text style={styles.label}>Telefon:</Text>
          <Text style={styles.value}>{profile.phone}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statystyki</Text>
          <Text style={styles.label}>Ocena:</Text>
          <Text style={styles.value}>
            {profile.rating > 0 ? profile.rating.toFixed(1) : 'Brak ocen'}
          </Text>
          <Text style={styles.label}>Zrealizowane zamówienia:</Text>
          <Text style={styles.value}>{profile.completed_orders}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.statusLabel}>
            Status: {profile.is_verified ? 'Zweryfikowany' : 'Oczekuje na weryfikację'}
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleStats}>
          <Text style={styles.buttonText}>Statystyki szczegółowe</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Wyloguj się</Text>
        </TouchableOpacity>
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
  statusLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff0000',
  },
  button: {
    backgroundColor: '#ff0000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#666666',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
