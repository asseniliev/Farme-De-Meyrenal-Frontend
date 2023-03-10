const licalIP = "10.0.1.183";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { Fragment } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import MapView, { Polygon, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { SetDeliveryAddress } from "../reducers/users";
import * as Location from "expo-location";

export default function AddressScreen({ navigation }) {
  const [deliveryAddress, setDelivreryAddress] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryLat, setDeliveryLat] = useState(0);
  const [deliveryLon, setDeliveryLon] = useState(0);
  const [initLat, setInitLat] = useState(45.167868);
  const [initLon, setInitLon] = useState(4.6381405);
  const [deliveryInfo, setDeliveryInfo] = useState([
    "Les vendredis entre 13h et 15h",
    "Les jedis entre 9h et 12h",
    "Les lundis entre 14h et 16h",
    "Les mardis entre 10h et 12h",
  ]);
  const [deliveryInfoText, setDeliveryInfoText] = useState("");
  const [validateAddressDisabled, setIsValidateAddressDisabled] =
    useState(true);

  const dispatch = useDispatch();

  const polygonCoords1 = [
    { latitude: 42, longitude: 1 },
    { latitude: 42, longitude: 2 },
    { latitude: 41, longitude: 2 },
    { latitude: 41, longitude: 1 },
    { latitude: 42, longitude: 1 },
  ];

  const [polygons, setPolygons] = useState([polygonCoords1]);
  const [names, setNames] = useState([]);
  const [latitudes, setLatitudes] = useState([
    45.1169, 45.2208, 45.1916, 45.1893,
  ]);
  const [longitudes, setLongitudes] = useState([4.5216, 4.6528, 4.702, 4.7472]);

  useEffect(() => {
    fetch(`http://${licalIP}:3000/locations/contours`)
      .then((response) => response.json())
      .then((data) => {
        setPolygons(data.polygons);
        setNames(data.names);
        setLatitudes(data.latitudes);
        setLongitudes(data.longitudes);
        setInitLat(data.latInit);
        setInitLon(data.lonInit);
      });
  }, []);

  handlePolygonPress = () => {
    console.log("Polygon pressed!");
  };

  handleMarkerPress = (name, deliveryInfo) => {
    setDelivreryAddress("Market of " + name);
    let text = "Livraison à " + name + ":\n";
    text += deliveryInfo;
    setDeliveryInfoText(text);
    setIsValidateAddressDisabled(false);
  };

  const markers = names.map((data, i) => {
    console.log(
      `${latitudes[i]} + ${longitudes[i]} = ${latitudes[i] + longitudes[i]}`
    );
    const latitude = Number(latitudes[i]);
    const longitude = Number(longitudes[i]);
    const deliveryText = deliveryInfo[i];
    return (
      <Marker
        key={i}
        coordinate={{ latitude: latitude, longitude: longitude }}
        title={data}
        onPress={() => handleMarkerPress(data, deliveryText)}
      />
    );
  });

  const mapPolygons = polygons.map((data, i) => {
    return (
      <TouchableWithoutFeedback
        onPress={this.handlePolygonPress}
        key={1000 + i}
      >
        <Polygon
          coordinates={data}
          strokeWidth={1}
          strokeColor="#ff0000"
          fillColor="#ff000060"
          key={100 + i}
          zIndex={10}
        />
      </TouchableWithoutFeedback>
    );
  });

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
            .then((data) => {
              setDelivreryAddress(data.address);
              setDeliveryCity(data.city);
              setDeliveryLat(location.coords.latitude);
              setDeliveryLon(location.coords.longitude);
              if (names.includes(data.city)) {
                setIsValidateAddressDisabled(false);
              } else {
                let text = "No delivery in your comminity.\n";
                text +=
                  "Please select a market location from the map or contact Flavien!";
                setDeliveryInfoText(text);
                setIsValidateAddressDisabled(true);
              }
            });
        });
      }
    })();
  }

  function handleOnNext() {
    const addressData = {
      lat: deliveryLat,
      lon: deliveryLon,
      address: deliveryAddress,
      city: deliveryCity,
    };
    dispatch(SetDeliveryAddress(addressData));
    navigation.navigate("AccessDetails");
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View style={styles.topSection}>
        <Text style={styles.text}>
          <FontAwesome name="arrow-left" size={24} color="#000000" />
          {"   "} Adress de livraison
        </Text>
        <MapView
          style={styles.map}
          initialRegion={{
            // latitude: 45.1169,
            // longitude: 4.5216,
            latitude: initLat,
            longitude: initLon,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
          mapType="hybrid"
          userInteractionEnabled={true}
        >
          {mapPolygons}
          {markers}
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
        <Text style={styles.text}>{deliveryInfoText}</Text>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => handleOnNext()}
          style={styles.buttonFull}
          disabled={validateAddressDisabled}
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
    fontSize: 20,
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
