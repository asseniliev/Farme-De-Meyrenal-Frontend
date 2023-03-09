import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";


export default function Prsentation({ navigation }) {
  const [fontsLoaded] = useFonts({
    
    BelweBold: require("../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>panier</Text>
      </View>
      <ScrollView style={styles.productContainerContainer}>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F5F9",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  header: {
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
  },
  title: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
  },
  productContainerContainer: {
    flex: 1,
    width: "100%",
  },
});
