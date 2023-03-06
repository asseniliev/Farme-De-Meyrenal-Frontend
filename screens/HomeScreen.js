import Styles from "../components/Styles";
import {
    Button,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
  } from "react-native";
import { useFonts } from "expo-font";

export default function Home({ navigation }) {
  const [fontsLoaded] = useFonts({ BelweBold: require("../assets/fonts/BelweBold.otf"), });
  if (!fontsLoaded) null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{'  '}ferme de { "\n" } mereynal</Text>
      </View>
      <View style={styles.line}></View>
    </View>
  )
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
        alignItems: "center",
        paddingTop: 30,
        paddingBottom: 3,
        backgroundColor: "#ffffff",
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "#ABABAB",


      },
      title: {
        fontFamily: "BelweBold",
        fontSize: 21,
        color: '#3A7D44',
      },
})