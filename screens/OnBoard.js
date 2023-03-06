import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  FlatList,
  Animated,
} from "react-native";
import slide from "../components/slide";
import OnbordingItem from "../components/OnbordingItem";
import Styles from "../components/Styles";

export default function Carousel({ navigation }) {
  return (
    <View style={styles.container}>
      <FlatList
        data={slide}
        renderItem={({ item }) => <OnbordingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Log")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Passer</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  
});
