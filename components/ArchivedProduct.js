import backendUrl from "../modules/backendUrl";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ArchivedProduct(props) {
  function showAlertDel() {
    Alert.alert(
      "Attention !",
      "Êtes-vous sur de vouloir supprimer ce produit ?",
      [
        {
          text: "Oui",
          onPress: () => {
            deleteProduct();
            // makesDisappear(data._id)
            // handleDelete(id)
          },
        },
        { text: "Non", style: "cancel" },
      ],
      { cancelable: false }
    );
  }

  function showAlertRestore() {
    Alert.alert(
      "Attention !",
      "Êtes-vous sur de vouloir réactiver ce produit ?",
      [
        {
          text: "Oui",
          onPress: () => {
            reactivateProduct();
            // makesDisappear(data._id)
            // handleDelete(id)
          },
        },
        { text: "Non", style: "cancel" },
      ],
      { cancelable: false }
    );
  }

  async function deleteProduct() {
    const url = `${backendUrl}/products/${props.id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify(productData),
    });

    const data = await response.json();
    //console.log(data);
    //props.goToProductListScreen();
    props.fetchProducts();
    props.closeList();
  }

  async function reactivateProduct() {
    const url = `${backendUrl}/products/scope/${props.id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: true }),
    });

    const data = await response.json();
    props.fetchProducts();
    props.closeList();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => props.changeProduct(props.id)}
      >
        <Text style={styles.text}>{props.title}</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: props.imageUrl }}></Image>
      </View>
      <TouchableOpacity onPress={() => showAlertRestore()}>
        <FontAwesome name="arrow-up" size={24} color={"#3A7D44"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => showAlertDel()}>
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
    backgroundColor: "#3A7D443F",
  },
  imageContainer: {
    width: 50,
  },
  image: {
    height: "100%",
    width: 50,
  },
  textContainer: {
    width: "60%",
  },
  text: {
    fontSize: 20,
    color: "#3A7D44",
    fontWeight: 600,
  },
});
