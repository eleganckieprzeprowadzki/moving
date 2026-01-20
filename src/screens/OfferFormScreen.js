/**
 * Ekran formularza oferty
 */

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import API from '../services/api';
import ImagePicker from '../components/ImagePicker';

const OfferFormScreen = ({route, navigation}) => {
  const {orderId} = route.params;
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedDuration, setEstimatedDuration] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!price || !description || !estimatedDuration) {
      Alert.alert('Błąd', 'Wypełnij wszystkie wymagane pola.');
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Błąd', 'Podaj prawidłową cenę.');
      return;
    }

    setLoading(true);
    try {
      const imageUrls = images.map(img => img.uri);
      const response = await API.createOffer(orderId, {
        price: priceNum,
        description,
        estimated_duration: estimatedDuration,
        additional_info: additionalInfo,
        images: imageUrls,
      });

      if (response.success) {
        Alert.alert('Sukces', 'Oferta została złożona pomyślnie.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }
    } catch (error) {
      Alert.alert(
        'Błąd',
        error.response?.data?.message || 'Błąd podczas składania oferty.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Złóż ofertę</Text>

        <Text style={styles.label}>Cena (zł) *</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          placeholder="0.00"
        />

        <Text style={styles.label}>Opis oferty *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          placeholder="Opisz swoją ofertę..."
        />

        <Text style={styles.label}>Szacowany czas realizacji *</Text>
        <TextInput
          style={styles.input}
          value={estimatedDuration}
          onChangeText={setEstimatedDuration}
          placeholder="np. 2-3 godziny"
        />

        <Text style={styles.label}>Dodatkowe informacje</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          multiline
          numberOfLines={3}
          placeholder="Dodatkowe informacje..."
        />

        <Text style={styles.label}>Zdjęcia</Text>
        <ImagePicker images={images} onImagesChange={setImages} />

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={loading}>
          <Text style={styles.submitButtonText}>
            {loading ? 'Zapisywanie...' : 'Złóż ofertę'}
          </Text>
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
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#000000',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#ff0000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OfferFormScreen;
