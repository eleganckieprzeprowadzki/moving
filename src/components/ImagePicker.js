/**
 * Komponent wyboru zdjęć
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const ImagePicker = ({images, onImagesChange}) => {
  const handleChooseImage = () => {
    Alert.alert('Wybierz źródło', '', [
      {text: 'Anuluj', style: 'cancel'},
      {
        text: 'Kamera',
        onPress: () => {
          launchCamera(
            {
              mediaType: 'photo',
              quality: 0.8,
            },
            response => {
              if (response.assets && response.assets[0]) {
                onImagesChange([...images, {uri: response.assets[0].uri}]);
              }
            },
          );
        },
      },
      {
        text: 'Galeria',
        onPress: () => {
          launchImageLibrary(
            {
              mediaType: 'photo',
              quality: 0.8,
            },
            response => {
              if (response.assets && response.assets[0]) {
                onImagesChange([...images, {uri: response.assets[0].uri}]);
              }
            },
          );
        },
      },
    ]);
  };

  const handleRemoveImage = index => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleChooseImage}>
        <Text style={styles.buttonText}>+ Dodaj zdjęcie</Text>
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        {images.map((image, index) => (
          <View key={index} style={styles.imageWrapper}>
            <Image source={{uri: image.uri}} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => handleRemoveImage(index)}>
              <Text style={styles.removeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  button: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#666666',
    fontSize: 16,
  },
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#f44336',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default ImagePicker;
