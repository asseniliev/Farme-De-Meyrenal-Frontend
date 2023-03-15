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
import { useSelector } from "react-redux";

export default function Carousel({ navigation }) {
  const loggedUser = useSelector((data) => {
    if (data.user) return data.user.value;
    else return null;
  });

  function handleOnPress() {
    if (loggedUser.accesstoken !== "") {
      navigation.navigate("HomeTab");
    } else {
      navigation.navigate("Log");
    }
  }
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
      <TouchableOpacity onPress={() => handleOnPress()} style={Styles.button}>
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
    paddingBottom: 30,
  },
});
