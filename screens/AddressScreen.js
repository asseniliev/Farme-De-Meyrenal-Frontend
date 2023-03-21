import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { Fragment } from "react";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import MapView, { Polygon, Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { SetDeliveryAddress } from "../reducers/users";
import * as Location from "expo-location";
import localIP from "../modules/localIP";

export default function AddressScreen({ navigation }) {
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [buttonColor, setButtonColor] = useState("#ababab");
  const [locationCoordinates, setLocationCoordinates] = useState(null);
  const [deliveryCity, setDeliveryCity] = useState("");
  //const [deliveryLat, setDeliveryLat] = useState(0);
  //const [deliveryLon, setDeliveryLon] = useState(0);
  const [initLat, setInitLat] = useState(45.167868);
  const [initLon, setInitLon] = useState(4.6381405);
  const [regionsData, setRegionsData] = useState([]);
  //const [initLat, setInitLat] = useState(0);
  //const [initLon, setInitLon] = useState(0);
  const [deliveryInfoText, setDeliveryInfoText] = useState("");
  const [validateAddressDisabled, setIsValidateAddressDisabled] =
    useState(true);

  const dispatch = useDispatch();

  const [names, setNames] = useState([]);

  useEffect(() => {
    fetch(`http://${localIP}:3000/locations/contours`)
      .then((response) => response.json())
      .then((data) => {
        setRegionsData(data.regionsData);
        setInitLat(data.latInit);
        setInitLon(data.lonInit);
      });
  }, []);

  handleMarkerPress = (homeDeliveryHours, marketHours, marketAddress) => {
    let text = "";
    console.log(marketHours);
    if (marketHours) {
      setDeliveryAddress(marketAddress);
      text = "Market time:\n";
      text += marketHours + "\n";
    }

    text += "Livraison à domicile: \n";
    text += homeDeliveryHours;
    setDeliveryInfoText(text);
    setIsValidateAddressDisabled(false);
    setButtonColor("#3A7D44");
  };

  const markers = regionsData.map((data, i) => {

    if (data.market.address) {
      //console.log(data.market)
      const address = data.market.address;
      const latitude = data.market.latitude;
      const longitude = data.market.longitude;
      const label = data.market.label;
      const marketHours = data.market.marketHours;
      const homeDeliveryHours = data.homeDeliveryHours;

      return (
        <Marker
          key={i}
          coordinate={{ latitude: latitude, longitude: longitude }}
          title={label}
          onPress={() =>
            handleMarkerPress(homeDeliveryHours, marketHours, address)
          }
        />
      );
    }
  });

  const mapPolygons = regionsData.map((data, i) => {
    return (
      <TouchableWithoutFeedback
        onPress={this.handlePolygonPress}
        key={1000 + i}
      >
        <Polygon
          coordinates={data.polygon}
          strokeWidth={1}
          strokeColor="#ff0000"
          fillColor="#ff000060"
          key={100 + i}
          zIndex={10}
        />
      </TouchableWithoutFeedback>
    );
  });

  function processDeliverAddressData(data) {
    setDeliveryAddress(data.address);
    setDeliveryCity(data.city);
    if (data.location) {
      setDeliveryLat(data.location[1]);
      setDeliveryLon(data.location[0]);
      setLocationCoordinates({
        latitude: data.location[1],
        longitude: data.location[0],
      });
    }

    const myRegion = regionsData.find(element => element.name === data.city)
    if (myRegion) {
      setIsValidateAddressDisabled(false);
      setButtonColor("#3A7D44");
      let text = "Livraison à domicile: \n";
      text += myRegion.homeDeliveryHours;
      setDeliveryInfoText(text);
    } else {
      let text = "No delivery in your comminity.\n";
      text +=
        "Please select a market location from the map or contact Flavien!";
      setDeliveryInfoText(text);
      setIsValidateAddressDisabled(true);
      setButtonColor("#ababab");
    }
  }

  async function handleOnGeoLocalization() {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          const url = `http://${localIP}:3000/locations/addressbycoordinates/?lon=${location.coords.longitude}&lat=${location.coords.latitude}`;

          fetch(url)
            .then((response) => response.json())
            .then((data) => {
              processDeliverAddressData(data);
              setDeliveryLat(location.coords.latitude);
              setDeliveryLon(location.coords.longitude);
              setLocationCoordinates(location.coords);
            });
        });
      }
    })();
    Keyboard.dismiss();
  }

  async function handleOnAddressValidation() {
    if (deliveryAddress.length < 3) {
      let text = "Delivery adress must contain at least 3 characters.\n";
      setDeliveryInfoText(text);
      return;
    }

    const url = `http://${localIP}:3000/locations/addressbystring/?q=${deliveryAddress}&limit=1}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          processDeliverAddressData(data);
        } else {
          let text = "Please insert a valid address";
          setDeliveryInfoText(text);
          setIsValidateAddressDisabled(true);
          setButtonColor("#ababab");
        }
      });
    Keyboard.dismiss();
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

  onMapReady = () => {
    // Update the region with new coordinates
    const newRegion = {
      latitude: initLat,
      longitude: initLon,
      latitudeDelta: 0.2,
      longitudeDelta: 0.2,
    };
    this.mapView.animateToRegion(newRegion, 1000);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <View style={styles.topSection}>
          <Text style={styles.title}>
            <FontAwesome name="arrow-left" size={24} color="#000000" />
            {"          "} adresse de livraison
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
            //onMapReady={this.onMapReady}
            mapType="hybrid"
            userInteractionEnabled={true}
          >
            {mapPolygons}
            {markers}
            {locationCoordinates && (
              <Marker
                coordinate={locationCoordinates}
                title="Home"
                pinColor="#fecb2d"
              />
            )}
          </MapView>
        </View>

        <View style={styles.middleSection}>
          <TextInput
            style={styles.input}
            placeholder="Adresse de livraison"
            onChangeText={(value) => setDeliveryAddress(value)}
            value={deliveryAddress}
          />
          <View style={styles.addressButtonsView}>
            <TouchableOpacity
              onPress={() => handleOnGeoLocalization()}
              style={styles.buttonHalf}
            >
              <Text style={styles.textButton}>Géolocaliser</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleOnAddressValidation()}
              style={styles.buttonHalf}
            >
              <Text style={styles.textButton}>Valider l'adresse</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.text}>{deliveryInfoText}</Text>
        </View>

        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() => handleOnNext()}
            style={[styles.buttonFull, { backgroundColor: buttonColor }]}
            disabled={validateAddressDisabled}
          >
            <Text style={styles.textButton}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    marginTop: "5%",
    marginBottom: "10%"
  },
  addressButtonsView: {
    width: "100%",
    // height: "25%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "5%",
  },
  bottomSection: {
    flex: 0.1,
    width: "100%",
    height: "5%",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginBottom: "3%",
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 20,
    lineHeight: 30,
  },
  title: {
    fontSize: 21,
    paddingHorizontal: 10,
    color: "#3A7D44",
    fontFamily: "BelweBold",
    marginBottom: "3%",
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
    marginHorizontal: "2%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    width: "46%",
    alignItems: "center",
  },
  buttonFull: {
    // backgroundColor: "#3A7D44",
    marginHorizontal: "10%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: "5%",
    width: "80%",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
