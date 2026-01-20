/**
 * Stałe konfiguracyjne aplikacji
 */

// URL REST API WordPress
export const API_BASE_URL = 'https://staging.eleganckieprzeprowadzki.pl/wp-json/mm/v1';

// Kolory aplikacji
export const COLORS = {
  primary: '#ff0000',
  secondary: '#333333',
  background: '#ffffff',
  text: '#000000',
  textSecondary: '#666666',
  border: '#e0e0e0',
  success: '#4caf50',
  error: '#f44336',
  warning: '#ff9800',
  info: '#2196f3',
};

// Rozmiary
export const SIZES = {
  padding: 16,
  margin: 16,
  borderRadius: 8,
  fontSize: {
    small: 12,
    medium: 14,
    large: 16,
    xlarge: 18,
    xxlarge: 24,
  },
};

// Timeout dla żądań API (w milisekundach)
export const API_TIMEOUT = 30000;

// Maksymalny rozmiar zdjęcia (w bajtach)
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

// Typy przeprowadzek
export const MOVING_TYPES = {
  economic: 'Ekonomiczna',
  standard: 'Standardowa',
  complex: 'Kompleksowa',
};

// Statusy ofert
export const OFFER_STATUS = {
  pending: 'Oczekująca',
  selected: 'Wybrana',
  rejected: 'Odrzucona',
  withdrawn: 'Wycofana',
};

// Statusy zamówień
export const ORDER_STATUS = {
  pending: 'Oczekujące',
  active: 'Aktywne',
  offers_closed: 'Przyjmowanie ofert zakończone',
  offer_selected: 'Wybrano ofertę',
  completed: 'Zrealizowane',
  cancelled: 'Anulowane',
};
