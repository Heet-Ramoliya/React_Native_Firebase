import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import {useState} from 'react';

const Imagepicker = ({onImageSelect}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image);
        setSelectedImage(image.path);
        onImageSelect(image.path);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const closeImage = () => {
    setSelectedImage(null);
    onImageSelect(null);
  };
  return (
    <View style={{alignItems: 'center'}}>
      {selectedImage ? (
        <View style={styles.container}>
          <TouchableOpacity onPress={closeImage}>
            <Text style={styles.text}>X</Text>
          </TouchableOpacity>
          <Image
            source={{uri: selectedImage}}
            style={{width: 200, height: 200, marginBottom: 20}}
          />
        </View>
      ) : (
        <TouchableOpacity
          onPress={selectImage}
          style={{
            padding: 10,
            backgroundColor: 'lightblue',
            marginBottom: 20,
            marginTop: 20,
          }}>
          <Text>Select Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: 'red',
    color: 'white',
    fontSize: 15,
    fontWeight: '800',
    width: 30,
    borderRadius: 100,
    textAlign: 'center',
    padding: 4,
    alignContent: 'flex-end',
  },
  container: {
    alignItems: 'flex-end',
  },
});

export default Imagepicker;
