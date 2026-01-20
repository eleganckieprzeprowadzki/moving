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
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#ff0000',
        tabBarInactiveTintColor: '#666666',
        headerShown: false,
      }}>
      <Tab.Screen 
        name="Marketplace" 
        component={MarketplaceScreen}
        options={{title: 'Giełda'}}
      />
      <Tab.Screen 
        name="MyOffers" 
        component={MyOffersScreen}
        options={{title: 'Moje Oferty'}}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{title: 'Profil'}}
      />
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
    // Sprawdzaj co sekundę czy użytkownik się zalogował (dla aktualizacji po logowaniu)
    const interval = setInterval(() => {
      checkAuth();
    }, 1000);
    return () => clearInterval(interval);
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
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen 
            name="OrderDetails" 
            component={OrderDetailsScreen}
            options={{headerShown: true, title: 'Szczegóły zamówienia'}}
          />
          <Stack.Screen 
            name="OfferForm" 
            component={OfferFormScreen}
            options={{headerShown: true, title: 'Złóż ofertę'}}
          />
          <Stack.Screen 
            name="Stats" 
            component={StatsScreen}
            options={{headerShown: true, title: 'Statystyki'}}
          />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
