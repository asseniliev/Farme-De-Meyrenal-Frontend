import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ArchivedProduct() {
  return (
    // <View style={styles.container}>
    //   <TouchableOpacity onPress={() => toggleArchivedList()}>
    //     <Text>Cornishon</Text>
    //   </TouchableOpacity>
    //   <Image
    //     source={{ uri: "../assets/piment.jpg" }}
    //     style={styles.image}
    //   ></Image>
    //   <TouchableOpacity onPress={() => handleOnDelete()}>
    //     <FontAwesome name="trash" />
    //   </TouchableOpacity>

    // </View>
    <Image
      source={{
        uri: "https://console.cloudinary.com/console/c-36bd535c54d68df476b9037f0acf49/media_library/search/asset/efbeebaae659a174eb07729eb2ea0e5a/manage?q=&context=manage",
      }}
      style={styles.image}
    ></Image>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
