const licalIP = "10.0.1.183";

import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "react-native-paper";

export default function OrderEndScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const [payCash, setPayCash] = useState(true);

  function handleOnPlaceOrder() {
    if (payCash) {
      navigation.navigate("OrderEnd");
    } else {
      navigation.navigate("UnderConstruction");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>
        <FontAwesome name="arrow-left" size={24} color="#000000" />
        {"            "} Order Summary
      </Text>
      <View style={styles.topSection}>
        <View style={styles.summaryLine}>
          <Text style={styles.text}>TOTAL</Text>
          <Text style={styles.text}>34.50 €</Text>
        </View>
        <Text style={styles.text}>Delivery Address:</Text>
        <Text style={styles.text}>... Delivery address...</Text>
        <View style={styles.summaryLine}>
          <Text style={styles.text}>Planned delivery date: </Text>
          <Text style={styles.text}>25/02/2023</Text>
        </View>
      </View>
      <View style={styles.middleSection}>
        <Text style={styles.text}>Select payment method{"\n"}</Text>
        <RadioButton.Group
          onValueChange={(newValue) => setPayCash(newValue)}
          value={payCash}
        >
          <View style={styles.radioButtonLine}>
            <RadioButton value={false} />
            <Text style={styles.text}>Online Payment</Text>
          </View>
          <View style={styles.radioButtonLine}>
            <RadioButton value={true} />
            <Text style={styles.text}>Cash Payment at Reception</Text>
          </View>
        </RadioButton.Group>
      </View>
      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => handleOnPlaceOrder()}
          style={styles.buttonFull}
        >
          <Text style={styles.textButton}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    flex: 1,
    width: "90%",
    marginLeft: "5%",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
  },
  summaryLine: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  middleSection: {
    flex: 1,
    width: "90%",
    width: "90%",
    marginLeft: "5%",
    borderBottomColor: "grey",
    borderBottomWidth: 2,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  radioButtonLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bottomSection: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  textTitle: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 26,
    lineHeight: 40,
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 40,
  },
  buttonFull: {
    backgroundColor: "#3a7d44",
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
