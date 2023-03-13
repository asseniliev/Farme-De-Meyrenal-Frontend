import localIP from "../modules/localIP"

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedUser } from "../reducers/users";

export default function UserSignInScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");

  const dispatch = useDispatch();

  const loggedUser = useSelector((data) => {
    if (data.user) return data.user.value;
    else return null;
  });

  function handleOnSignin() {
    if (email === "") {
      setErrorText("Insert a valid mail address");
    } else if (password === "") {
      setErrorText("Insert a valid password");
    } else {
      const login = {
        email: email,
        password: password,
      };
      fetch(`http://${localIP}:3000/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            const loggedUser = {
              id: data.user._id,
              email: data.user.email,
              firstName: data.user.firstName,
              lastName: data.user.lastName,
              phoneNumber: data.user.phoneNumber,
              deliveryAddress: {
                address: data.user.deliveryAddress.address,
                city: data.user.deliveryAddress.city,
              },
              accesstoken: data.accessToken,
            };
            dispatch(setLoggedUser(loggedUser));
            navigation.navigate("HomeTab");
          } else {
            setErrorText(data.message);
            setPassword("");
          }
        });
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.topSection}>
          <Text style={styles.text}>
            <FontAwesome name="arrow-left" size={24} color="#000000" />
            {"          "} Détails d'accès
          </Text>
          <Image source={require("../assets/fla1.jpg")} style={styles.image} />
        </View>
        <View style={styles.middleSection}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
        <View style={styles.bottomSection}>
          <TouchableOpacity
            onPress={() => handleOnSignin()}
            style={styles.buttonFull}
          >
            <Text style={styles.textButton}>Sign in</Text>
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
    flex: 0.5,
    width: "100%",
  },
  middleSection: {
    flex: 0.4,
    width: "100%",
    height: "35%",
    marginVertical: "5%",
    justifyContent: "flex-end",
  },
  bottomSection: {
    flex: 0.2,
    width: "100%",
    height: "5%",
    justifyContent: "center",
  },
  text: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 26,
    lineHeight: 40,
  },
  errorText: {
    paddingHorizontal: 10,
    marginBottom: 5,
    fontSize: 20,
    lineHeight: 30,
    color: "red",
  },
  image: {
    width: "100%",
    height: "100%",
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
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
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
