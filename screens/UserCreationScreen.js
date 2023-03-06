const licalIP = "10.0.1.183";

import { Text, View, Image, StyleSheet } from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserCreationScreen({ navigation }) {
  const [message, setMessage] = useState(
    "New Account is in process of creation"
  );

  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    //console.log(user);
    fetch(`http://${licalIP}:3000/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.result) {
          let message = "Account summary:\n";
          message += "Name / FirstName:\n";
          message += `${data.user.lastName} / ${data.user.firstName}`;
          setMessage("You must received a mail for confirming your signup");
        } else {
          setMessage(message);
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.text}>
          <FontAwesome name="arrow-left" size={24} color="#000000" />
          {"        "} Account Creation
        </Text>
        <Image source={require("../assets/fla1.jpg")} style={styles.image} />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.text}>{message}</Text>
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
    width: "100%",
  },
  bottomSection: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 26,
    lineHeight: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
