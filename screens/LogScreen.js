import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Styles from "../components/Styles";
//font hook
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";

export default function Log({ navigation }) {
  const loggedUser = useSelector((data) => {
    if (data.user) return data.user.value;
    else return null;
  });

  const [fontsLoaded] = useFonts({
    BelweBold: require("../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) return null;

  function handleOnSignIn() {
    if (loggedUser) {
      navigation.navigate("HomeTab");
    } else {
      navigation.navigate("UserSignIn");
    }
    //navigation.navigate("UserSignIn");
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {"  "}ferme de {"\n"} mereynal
        </Text>
      </View>
      <Image source={require("../assets/fla1.jpg")} style={styles.image} />
      <TouchableOpacity
        onPress={() => navigation.navigate("Address")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Créer un nouveau compte</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleOnSignIn()} style={Styles.button}>
        <Text style={Styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeTab")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Continuer sans se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Contacter Flavien</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F5F9",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  header: {
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: "40%",
  },
  line: {
    backgroundColor: "#ABABAB",
    height: 1,
    width: "80%",
  },
  title: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
  },
});
