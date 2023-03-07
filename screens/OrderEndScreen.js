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

  // useEffect(() => {
  //   //console.log(user);
  //   fetch(`http://${licalIP}:3000/users/signup`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(user),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       //console.log(data);
  //       if (data.result) {
  //         let message = "New account is almost created.\n";
  //         message += `A mail was sent to mailbox ${data.user.email} :\n`;
  //         message +=
  //           "You must click on the provided link to finalize the account activation.";
  //         setMessage(message);
  //       } else {
  //         console.log(data);
  //         setMessage(data.error);
  //       }
  //     });
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.textTitle}>
          <FontAwesome
            name="arrow-left"
            size={24}
            color="#000000"
            onPress={() => navigation.navigate("Home")}
          />
          {"            "} Thank You!
        </Text>
        <Image
          source={require("../assets/shoppingBasket.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.text}>Order No. 123 was created.{"\n"}</Text>
        <Text style={styles.text}>
          Thank you for purchasing from Ferme de Meyrenal!
        </Text>
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
    alignItems: "center",
  },
  textTitle: {
    fontSize: 30,
    marginBottom: "2%",
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
