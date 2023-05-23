import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import { useFonts } from "expo-font";
import { AntDesign } from '@expo/vector-icons';

export default function BlogScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) null;

  return (
    <View style={styles.container}>
    <View style={styles.header}>
      <View style={styles.title1Container}>
    <AntDesign name="caretleft" size={24} color="#F3A712" />
      <Text
        style={styles.title1}
        onPress={() => navigation.navigate("HomeScreen")}
      >
        {" "}ferme de {"\n"} mereynal
      </Text>
      </View>
      <Text style={styles.title2}>
      {"  "}actualités{"\n"}de la ferme
      </Text>
    </View>
    <ScrollView style={styles.textContainer}>
      
    </ScrollView>
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  title1Container:{
    flexDirection: "row", 
    alignItems: "center",
  },
  title1: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#F3A712",
  },
  title2: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    width: "100%",
    padding: 30,

  },
  titre: {
    fontFamily: "BelweBold",
    fontSize: 30,
    color: "#F3A712",
    marginVertical: 15,
  },
  paragraphe: {
    fontSize: 18,
    color: "#501B16",
  },
});
