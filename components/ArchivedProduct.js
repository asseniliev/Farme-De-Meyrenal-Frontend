import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ArchivedProduct(prop) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => toggleArchivedList()}>
        <Text style={styles.text}>{prop.title}</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: prop.imageUrl }}
        ></Image>
      </View>
      <TouchableOpacity onPress={() => handleOnDelete()}>
        <FontAwesome name="trash" size={24} color={"#3A7D44"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "1%",
    paddingRight: "3%",
    width: "96%",
    height: 50,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#3A7D443F"
  },
  imageContainer: {
    width: 50,
  },
  image: {
    height: "100%",
    width: 50
  },
  textContainer: {
    width: "60%"
  },
  text: {
    fontSize: 20,
    color: "#3A7D44",
    fontWeight: 600
  }
});
