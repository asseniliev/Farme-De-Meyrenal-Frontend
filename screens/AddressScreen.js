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

//const contourData = require("./modules/contour");
//console.log("Contour = " + contour[0]);

const contour1 = [
  {
    latitude: 45.718054,
    longitude: 4.909645,
  },
  {
    latitude: 45.718278,
    longitude: 4.909388,
  },
  {
    latitude: 45.719467,
    longitude: 4.9082,
  },
  {
    latitude: 45.719794,
    longitude: 4.907812,
  },
  {
    latitude: 45.719928,
    longitude: 4.907751,
  },
  {
    latitude: 45.721239,
    longitude: 4.905646,
  },
  {
    latitude: 45.721499,
    longitude: 4.904655,
  },
  {
    latitude: 45.721605,
    longitude: 4.904518,
  },
  {
    latitude: 45.721767,
    longitude: 4.903541,
  },
  {
    latitude: 45.721805,
    longitude: 4.903423,
  },
  {
    latitude: 45.721874,
    longitude: 4.902371,
  },
  {
    latitude: 45.721903,
    longitude: 4.901602,
  },
  {
    latitude: 45.721888,
    longitude: 4.901224,
  },
  {
    latitude: 45.721892,
    longitude: 4.900795,
  },
  {
    latitude: 45.721922,
    longitude: 4.900215,
  },
  {
    latitude: 45.72198,
    longitude: 4.899593,
  },
  {
    latitude: 45.722078,
    longitude: 4.898707,
  },
  {
    latitude: 45.722208,
    longitude: 4.896823,
  },
  {
    latitude: 45.722216,
    longitude: 4.896514,
  },
  {
    latitude: 45.722335,
    longitude: 4.895909,
  },
  {
    latitude: 45.722419,
    longitude: 4.895398,
  },
  {
    latitude: 45.722417,
    longitude: 4.895267,
  },
  {
    latitude: 45.722576,
    longitude: 4.894976,
  },
  {
    latitude: 45.722859,
    longitude: 4.894601,
  },
  {
    latitude: 45.723,
    longitude: 4.894512,
  },
  {
    latitude: 45.723384,
    longitude: 4.893829,
  },
  {
    latitude: 45.723631,
    longitude: 4.893346,
  },
  {
    latitude: 45.723961,
    longitude: 4.892582,
  },
  {
    latitude: 45.72402,
    longitude: 4.8924,
  },
  {
    latitude: 45.724279,
    longitude: 4.891831,
  },
  {
    latitude: 45.724595,
    longitude: 4.891072,
  },
  {
    latitude: 45.725115,
    longitude: 4.889706,
  },
  {
    latitude: 45.725494,
    longitude: 4.888651,
  },
  {
    latitude: 45.726118,
    longitude: 4.886998,
  },
  {
    latitude: 45.72662,
    longitude: 4.88696,
  },
  {
    latitude: 45.728883,
    longitude: 4.886748,
  },
  {
    latitude: 45.729359,
    longitude: 4.886739,
  },
  {
    latitude: 45.729646,
    longitude: 4.886823,
  },
  {
    latitude: 45.729929,
    longitude: 4.886999,
  },
  {
    latitude: 45.730158,
    longitude: 4.887225,
  },
  {
    latitude: 45.730348,
    longitude: 4.887455,
  },
  {
    latitude: 45.730332,
    longitude: 4.887696,
  },
  {
    latitude: 45.73074,
    longitude: 4.887792,
  },
  {
    latitude: 45.730933,
    longitude: 4.887903,
  },
  {
    latitude: 45.731562,
    longitude: 4.888133,
  },
  {
    latitude: 45.73237,
    longitude: 4.888391,
  },
  {
    latitude: 45.733073,
    longitude: 4.888659,
  },
  {
    latitude: 45.734565,
    longitude: 4.889443,
  },
  {
    latitude: 45.735094,
    longitude: 4.889733,
  },
  {
    latitude: 45.736176,
    longitude: 4.890386,
  },
  {
    latitude: 45.737374,
    longitude: 4.891131,
  },
  {
    latitude: 45.73793,
    longitude: 4.891498,
  },
  {
    latitude: 45.73853,
    longitude: 4.891851,
  },
  {
    latitude: 45.7391,
    longitude: 4.89188,
  },
  {
    latitude: 45.739426,
    longitude: 4.891939,
  },
  {
    latitude: 45.739598,
    longitude: 4.892062,
  },
  {
    latitude: 45.739826,
    longitude: 4.892355,
  },
  {
    latitude: 45.740033,
    longitude: 4.892711,
  },
  {
    latitude: 45.741304,
    longitude: 4.89338,
  },
  {
    latitude: 45.741823,
    longitude: 4.89366,
  },
  {
    latitude: 45.743079,
    longitude: 4.894354,
  },
  {
    latitude: 45.743309,
    longitude: 4.894509,
  },
  {
    latitude: 45.743614,
    longitude: 4.894767,
  },
  {
    latitude: 45.743867,
    longitude: 4.894896,
  },
  {
    latitude: 45.746416,
    longitude: 4.896255,
  },
  {
    latitude: 45.746754,
    longitude: 4.89642,
  },
  {
    latitude: 45.747248,
    longitude: 4.896606,
  },
  {
    latitude: 45.74808,
    longitude: 4.896799,
  },
  {
    latitude: 45.749213,
    longitude: 4.896956,
  },
  {
    latitude: 45.749514,
    longitude: 4.897063,
  },
  {
    latitude: 45.750108,
    longitude: 4.897179,
  },
  {
    latitude: 45.750386,
    longitude: 4.897357,
  },
  {
    latitude: 45.750589,
    longitude: 4.897431,
  },
  {
    latitude: 45.750985,
    longitude: 4.897511,
  },
  {
    latitude: 45.751629,
    longitude: 4.897708,
  },
  {
    latitude: 45.751894,
    longitude: 4.89786,
  },
  {
    latitude: 45.752744,
    longitude: 4.898295,
  },
  {
    latitude: 45.752916,
    longitude: 4.898396,
  },
  {
    latitude: 45.752777,
    longitude: 4.898983,
  },
  {
    latitude: 45.75262,
    longitude: 4.899491,
  },
  {
    latitude: 45.752412,
    longitude: 4.900382,
  },
  {
    latitude: 45.752239,
    longitude: 4.901444,
  },
  {
    latitude: 45.751821,
    longitude: 4.903585,
  },
  {
    latitude: 45.751613,
    longitude: 4.904717,
  },
  {
    latitude: 45.751285,
    longitude: 4.906608,
  },
  {
    latitude: 45.75075,
    longitude: 4.909182,
  },
  {
    latitude: 45.750353,
    longitude: 4.910829,
  },
  {
    latitude: 45.750188,
    longitude: 4.911404,
  },
  {
    latitude: 45.749661,
    longitude: 4.913065,
  },
  {
    latitude: 45.749467,
    longitude: 4.913624,
  },
  {
    latitude: 45.749138,
    longitude: 4.914445,
  },
  {
    latitude: 45.748919,
    longitude: 4.915083,
  },
  {
    latitude: 45.748572,
    longitude: 4.916386,
  },
  {
    latitude: 45.748493,
    longitude: 4.916851,
  },
  {
    latitude: 45.748442,
    longitude: 4.917686,
  },
  {
    latitude: 45.748451,
    longitude: 4.918128,
  },
  {
    latitude: 45.74849,
    longitude: 4.918829,
  },
  {
    latitude: 45.748505,
    longitude: 4.919406,
  },
  {
    latitude: 45.748456,
    longitude: 4.919921,
  },
  {
    latitude: 45.748412,
    longitude: 4.920067,
  },
  {
    latitude: 45.747852,
    longitude: 4.921693,
  },
  {
    latitude: 45.746849,
    longitude: 4.924471,
  },
  {
    latitude: 45.745879,
    longitude: 4.927238,
  },
  {
    latitude: 45.745618,
    longitude: 4.928012,
  },
  {
    latitude: 45.745273,
    longitude: 4.92915,
  },
  {
    latitude: 45.745094,
    longitude: 4.929783,
  },
  {
    latitude: 45.744887,
    longitude: 4.930345,
  },
  {
    latitude: 45.744739,
    longitude: 4.930814,
  },
  {
    latitude: 45.744511,
    longitude: 4.931599,
  },
  {
    latitude: 45.744329,
    longitude: 4.932166,
  },
  {
    latitude: 45.744248,
    longitude: 4.932537,
  },
  {
    latitude: 45.744025,
    longitude: 4.932697,
  },
  {
    latitude: 45.743052,
    longitude: 4.933119,
  },
  {
    latitude: 45.742823,
    longitude: 4.933202,
  },
  {
    latitude: 45.742342,
    longitude: 4.933325,
  },
  {
    latitude: 45.741604,
    longitude: 4.933475,
  },
  {
    latitude: 45.740958,
    longitude: 4.933628,
  },
  {
    latitude: 45.740351,
    longitude: 4.933815,
  },
  {
    latitude: 45.739679,
    longitude: 4.934004,
  },
  {
    latitude: 45.739651,
    longitude: 4.933963,
  },
  {
    latitude: 45.737691,
    longitude: 4.934713,
  },
  {
    latitude: 45.737311,
    longitude: 4.934892,
  },
  {
    latitude: 45.736974,
    longitude: 4.935153,
  },
  {
    latitude: 45.736765,
    longitude: 4.935281,
  },
  {
    latitude: 45.735677,
    longitude: 4.93566,
  },
  {
    latitude: 45.735525,
    longitude: 4.935509,
  },
  {
    latitude: 45.735278,
    longitude: 4.935416,
  },
  {
    latitude: 45.735112,
    longitude: 4.935394,
  },
  {
    latitude: 45.727774,
    longitude: 4.936246,
  },
  {
    latitude: 45.725956,
    longitude: 4.936504,
  },
  {
    latitude: 45.725029,
    longitude: 4.93364,
  },
  {
    latitude: 45.723077,
    longitude: 4.92845,
  },
  {
    latitude: 45.721043,
    longitude: 4.921259,
  },
  {
    latitude: 45.719974,
    longitude: 4.918069,
  },
  {
    latitude: 45.719973,
    longitude: 4.917986,
  },
  {
    latitude: 45.71935,
    longitude: 4.915865,
  },
  {
    latitude: 45.719085,
    longitude: 4.914943,
  },
  {
    latitude: 45.718636,
    longitude: 4.912489,
  },
  {
    latitude: 45.718395,
    longitude: 4.911137,
  },
  {
    latitude: 45.718109,
    longitude: 4.909718,
  },
  {
    latitude: 45.718054,
    longitude: 4.909645,
  },
];

export default function AddressScreen({ navigation }) {
  const [deliveryAddress, setDelivreryAddress] = useState("");
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

  useEffect(() => {
    fetch(`http://10.0.1.183:3000/locations/contours`)
      //fetch(`http://192.168.1.11:3000/locations/contours`)
      .then((response) => response.json())
      //.then((data) => dispatch(SetContour(data)));
      //then((data) => console.log("Coordinates = " + JSON.stringify(data)))
      .then((data) => setPolygonCoords(data.polygonCoords));
  }, []);

  // console.log(polygonCoords);
  // const contour = useSelector((state) => state.contour.value);
  // const contourData = contour;

  // let polygonResult;

  // if (!polygonResult) {
  // } else {
  // }
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
            latitude: 45.73,
            longitude: 4.914,
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
        />
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
