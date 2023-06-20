import backendUrl from "../modules/backendUrl";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function ActiveProduct(props) {

  function showAlert() {
    Alert.alert(
      'Attention !',
      'Êtes-vous sur de vouloir archiver ce produit ?',
      [
        {
          text: 'Oui', onPress: () => {
            console.log('Archive product ' + props.id);
            archiveProduct();
            // makesDisappear(data._id)
            // handleDelete(id)
          }
        },
        { text: 'Non', style: 'cancel' }
      ],
      { cancelable: false }
    );
  };

  async function archiveProduct() {
    const url = `${backendUrl}/products/${props.id}`;

    const productData = {
      description: props.description,
      imageUrl: props.imageUrl,
      price: props.price,
      isActive: false
    };

    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    props.GoToProductListScreen();
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.articleInfo}
        onPress={() => console.log("Modify")}    >
        <Text style={styles.textArticleName}>{props.title}</Text>
        <Text style={styles.textArticlePrice}>{props.price}€ / {props.unitScale}{props.priceUnit}</Text>
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: props.imageUrl }}
        ></Image>
      </View>
      <TouchableOpacity onPress={() => showAlert()}>
        <FontAwesome name="archive" size={24} color={"#3A7D44"} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: "1%",
    paddingRight: "3%",
    width: "96%",
    height: 60,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#3A7D443F"
  },
  articleInfo: {
    width: "60%",
  },
  textArticleName: {
    fontSize: 18,
    color: "#3A7D44",
    fontWeight: 600
  },
  textArticlePrice: {
    fontSize: 14,
    color: "#3A7D44",
    fontWeight: 400
  },
  imageContainer: {
    width: 56,
  },
  image: {
    height: 56,
  },
});