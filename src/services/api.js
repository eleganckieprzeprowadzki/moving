/**
 * Serwis API - komunikacja z REST API WordPress
 */

import axios from 'axios';
import {API_BASE_URL, API_TIMEOUT} from '../config/constants';
import {getAuthToken, removeAuthToken} from './storage';

// Utwórz instancję axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor do dodawania tokenu do nagłówków
api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor do obsługi błędów
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token wygasł lub jest nieprawidłowy
      await removeAuthToken();
      // Można tutaj przekierować do ekranu logowania
    }
    return Promise.reject(error);
  }
);

/**
 * Klasa API z metodami do komunikacji z backendem
 */
class API {
  /**
   * Logowanie
   */
  static async login(email, password) {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  }

  /**
   * Wylogowanie
   */
  static async logout() {
    const response = await api.post('/auth/logout');
    return response.data;
  }

  /**
   * Rejestracja
   */
  static async register(userData) {
    const response = await api.post('/auth/register', userData);
    return response.data;
  }

  /**
   * Pobierz zamówienia
   */
  static async getOrders(filters = {}, page = 1, perPage = 20) {
    const params = {
      page,
      per_page: perPage,
      ...filters,
    };
    const response = await api.get('/orders', {params});
    return response.data;
  }

  /**
   * Pobierz szczegóły zamówienia
   */
  static async getOrderDetails(orderId) {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  }

  /**
   * Pobierz moje oferty
   */
  static async getMyOffers() {
    const response = await api.get('/offers');
    return response.data;
  }

  /**
   * Utwórz ofertę
   */
  static async createOffer(orderId, offerData) {
    const response = await api.post('/offers', {
      order_id: orderId,
      ...offerData,
    });
    return response.data;
  }

  /**
   * Aktualizuj ofertę
   */
  static async updateOffer(offerId, offerData) {
    const response = await api.put(`/offers/${offerId}`, offerData);
    return response.data;
  }

  /**
   * Usuń ofertę
   */
  static async deleteOffer(offerId) {
    const response = await api.delete(`/offers/${offerId}`);
    return response.data;
  }

  /**
   * Pobierz profil
   */
  static async getProfile() {
    const response = await api.get('/profile');
    return response.data;
  }

  /**
   * Aktualizuj profil
   */
  static async updateProfile(profileData) {
    const response = await api.put('/profile', profileData);
    return response.data;
  }

  /**
   * Pobierz statystyki
   */
  static async getStats() {
    const response = await api.get('/stats');
    return response.data;
  }

  /**
   * Upload zdjęcia
   */
  static async uploadImage(imageUri) {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    const response = await api.post('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }

  /**
   * Aktualizuj lokalizację
   */
  static async updateLocation(latitude, longitude) {
    const response = await api.post('/location/update', {
      latitude,
      longitude,
    });
    return response.data;
  }
}

export default API;
