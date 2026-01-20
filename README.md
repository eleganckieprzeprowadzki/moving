# Moving Marketplace Mobile

Aplikacja mobilna React Native dla platformy Giełda Zleceń - Przeprowadzki.

## Opis

Aplikacja mobilna umożliwia przewoźnikom:
- Przeglądanie dostępnych zleceń na giełdzie
- Składanie ofert na zamówienia
- Zarządzanie swoimi ofertami
- Przeglądanie statystyk
- Aktualizację profilu

## Wymagania

- Node.js >= 16
- React Native CLI
- Android Studio (dla Android)
- Xcode (dla iOS - tylko macOS)

## Instalacja

1. Zainstaluj zależności:
```bash
npm install
```

lub

```bash
yarn install
```

2. Skonfiguruj URL API w pliku `src/config/constants.js`:
```javascript
export const API_BASE_URL = 'https://your-wordpress-site.com/wp-json/mm/v1';
```

## Uruchomienie

### Android

```bash
npm run android
```

lub

```bash
yarn android
```

### iOS

```bash
npm run ios
```

lub

```bash
yarn ios
```

## Struktura projektu

```
moving-marketplace-mobile/
├── App.js                 # Główny komponent aplikacji
├── src/
│   ├── screens/          # Ekrany aplikacji
│   ├── components/       # Komponenty wielokrotnego użytku
│   ├── services/         # Serwisy (API, storage)
│   ├── navigation/      # Konfiguracja nawigacji
│   ├── config/           # Stałe konfiguracyjne
│   └── utils/            # Funkcje pomocnicze
├── android/              # Pliki konfiguracyjne Android
└── ios/                  # Pliki konfiguracyjne iOS
```

## Konfiguracja

### API URL

Zmień URL REST API w pliku `src/config/constants.js`:

```javascript
export const API_BASE_URL = 'https://your-wordpress-site.com/wp-json/mm/v1';
```

### Uprawnienia

Aplikacja wymaga następujących uprawnień:
- Lokalizacja (dla filtrowania po odległości)
- Kamera (dla dodawania zdjęć do ofert)
- Galeria (dla wyboru zdjęć)

## Budowanie

### Android APK

```bash
cd android
./gradlew assembleRelease
```

APK będzie dostępny w: `android/app/build/outputs/apk/release/`

### iOS IPA

Wymagany jest macOS i Xcode. Otwórz projekt w Xcode i zbuduj aplikację.

## Funkcjonalności

- ✅ Logowanie i rejestracja
- ✅ Przeglądanie zleceń z filtrowaniem
- ✅ Szczegóły zamówienia
- ✅ Składanie ofert
- ✅ Zarządzanie ofertami
- ✅ Profil użytkownika
- ✅ Statystyki
- ✅ Upload zdjęć

## Dokumentacja API

Dokumentacja REST API znajduje się w pliku `REST_API_DOCUMENTATION.md` w głównym folderze wtyczki WordPress.

## Rozwój

### Dodawanie nowych ekranów

1. Utwórz nowy plik w `src/screens/`
2. Zarejestruj ekran w `src/navigation/AppNavigator.js`

### Dodawanie nowych komponentów

Utwórz nowy plik w `src/components/` i eksportuj komponent.

## Licencja

GPL-2.0+
