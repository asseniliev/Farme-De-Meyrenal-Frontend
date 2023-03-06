import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import MapView, { Polygon } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { SetContour } from "../reducers/contours";
import * as Location from "expo-location";

const licalIP = "10.0.1.183";

//const contourData = require("./modules/contour");
//console.log("Contour = " + contour[0]);

export default function AddressScreen({ navigation }) {
  const [deliveryAddress, setDelivreryAddress] = useState("");
  const [initLat, setInitLat] = useState(0);
  const [initLon, setInitLon] = useState(0);
  const deliveryInfo =
    "Livraison à Lalouvesc :\nLes vendredis entre 13h et 15h";

  const dispatch = useDispatch();

  const polygonCoords1 = [
    { latitude: 42, longitude: 1 },
    { latitude: 42, longitude: 2 },
    { latitude: 41, longitude: 2 },
    { latitude: 41, longitude: 1 },
    { latitude: 42, longitude: 1 },
  ];

  const [polygonCoords, setPolygonCoords] = useState(polygonCoords1);
  const [localPosition, setLocalPosition] = useState(null);

  useEffect(() => {
    fetch(`http://${licalIP}:3000/locations/contours`)
      //fetch(`http://192.168.1.11:3000/locations/contours`)
      .then((response) => response.json())
      //.then((data) => dispatch(SetContour(data)));
      //then((data) => console.log("Coordinates = " + JSON.stringify(data)))
      .then((data) => {
        setPolygonCoords(data.polygonCoords);
      });
  }, []);

  async function handleGeoLocalization() {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          const url = `http://${licalIP}:3000/locations/addresses/?lon=${location.coords.longitude}&lat=${location.coords.latitude}`;
          //fetch(`http://${licalIP}:3000/locations/address)
          //setLocalPosition(location.coords);
          fetch(url)
            .then((response) => response.json())
            .then((data) => setDelivreryAddress(data.address));
        });
      }
    })();
  }

  function handleNext() {
    //store the address into redux;
    navigation.navigate("AccessDetails");
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text}>
          <FontAwesome name="arrow-left" size={24} color="#000000" />
          {"   "} Adress de livraison
        </Text>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 45.1169,
            longitude: 4.5216,
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
          mapType="hybrid"
        >
          <Polygon
            coordinates={polygonCoords}
            strokeWidth={1}
            strokeColor="#ff0000"
            fillColor="#ff000060"
          />
        </MapView>
      </View>

      <View style={styles.middleSection}>
        <TextInput
          style={styles.input}
          placeholder="Adresse de livraison"
          onChangeText={(value) => setDeliveryAddress(value)}
          value={deliveryAddress}
        />
        <TouchableOpacity
          onPress={() => handleGeoLocalization()}
          style={styles.buttonHalf}
        >
          <Text style={styles.textButton}>Géolocaliser</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{deliveryInfo}</Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => handleNext()}
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
    paddingTop: "15%",
  },
  topSection: {
    flex: 0.6,
    width: "100%",
  },
  middleSection: {
    flex: 0.3,
    width: "100%",
    height: "35%",
    marginVertical: "5%",
  },
  bottomSection: {
    flex: 0.1,
    width: "100%",
    height: "5%",
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: "3%",
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 26,
    lineHeight: 40,
  },
  input: {
    backgroundColor: "#D9D9D9",
    marginLeft: "2%",
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    fontSize: 20,
    width: "96%",
    marginBottom: "5%",
  },
  buttonHalf: {
    backgroundColor: "#3A7D44",
    marginLeft: "2%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: "5%",
    width: "40%",
    alignItems: "center",
  },
  buttonFull: {
    backgroundColor: "#3A7D44",
    marginLeft: "2%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: "5%",
    width: "90%",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
