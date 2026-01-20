/**
 * Główny nawigator aplikacji
 */

import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getAuthToken} from '../services/storage';
import AuthNavigator from './AuthNavigator';

// Screens
import MarketplaceScreen from '../screens/MarketplaceScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import OfferFormScreen from '../screens/OfferFormScreen';
import MyOffersScreen from '../screens/MyOffersScreen';
import ProfileScreen from '../screens/ProfileScreen';
import StatsScreen from '../screens/StatsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Tab Navigator dla zalogowanych użytkowników
 */
const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="MyOffers" component={MyOffersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

/**
 * Główny nawigator aplikacji
 */
const AppNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = await getAuthToken();
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error('Error checking auth:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    // Można tutaj dodać ekran ładowania
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
          <Stack.Screen name="OfferForm" component={OfferFormScreen} />
          <Stack.Screen name="Stats" component={StatsScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
