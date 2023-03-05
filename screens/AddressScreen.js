import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from 'react';
import MapView, { Polyline } from "react-native-maps";

export default function AddressScreen({ navigation }) {

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const deliveryInfo = "Livraison à Lalouvesc :\nLes vendredis entre 13h et 15h";


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text}>
          <FontAwesome name="arrow-left" size={24} color="#000000" />
          {'   '} Adress de livraison</Text>

        <MapView style={styles.map}
          initialRegion={{
            latitude: 42.78825,
            longitude: 2.4324,
            latitudeDelta: 10.3922,
            longitudeDelta: 10.3421,
          }}
          mapType="hybrid"
        >
          <Polyline

          >
          </Polyline>
        </MapView>

      </View>

      <View style={styles.middleSection}>
        <TextInput style={styles.input} placeholder='Adresse de livraison' onChangeText={(value) => setDeliveryAddress(value)} />
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.buttonHalf}
        >
          <Text style={styles.textButton}>Géolocaliser</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{deliveryInfo}</Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => handleSubmit()}
          style={styles.buttonFull}
        >
          <Text style={styles.textButton}>Validez l'adresse de livraison</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: "15%"
  },
  topSection: {
    flex: 0.6,
    width: "100%",
  },
  middleSection: {
    flex: 0.3,
    width: "100%",
    height: "35%",
    marginVertical: "5%"
  },
  bottomSection: {
    flex: 0.1,
    width: "100%",
    height: "5%"
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: "3%"
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 26,
    lineHeight: 40
  },
  input: {
    backgroundColor: "#D9D9D9",
    marginLeft: "2%",
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    width: "96%",
    marginBottom: "5%"
  },
  buttonHalf: {
    backgroundColor: "#3A7D44",
    marginLeft: "2%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: "5%",
    width: "40%",
    alignItems: 'center'
  },
  buttonFull: {
    backgroundColor: "#3A7D44",
    marginLeft: "2%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: "5%",
    width: "90%",
    alignItems: 'center'
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
  }
});