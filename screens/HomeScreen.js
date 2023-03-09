const licalIP = "10.0.1.23";

import Styles from "../components/Styles";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import Carousel from "../components/Carousel"

export default function Home({ navigation }) {

  const [fontsLoaded] = useFonts({
    BelweBold: require("../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) null;

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetch(`http://${licalIP}:3000/products`)
      .then((response) => response.json())
      .then((data) => {
        setProductList(data.result);
      });
  }, []);

  const products = productList.map((data, i) => {
    return (
      <Product
        imageUrl={data.imageUrl}
        title={data.title}
        price={data.price}
        priceUnit={data.priceUnit}
        id={data._id}
        key={i}
      />
    );
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {"  "}ferme de {"\n"} mereynal
        </Text>
      </View>
      <ScrollView style={styles.productContainerContainer}>
      <View style={styles.carouselContainer}><Carousel /></View>
        <View style={styles.productContainer}>{products}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F5F9",
    //alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
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
  carouselContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  productContainer: {
    flex: 1,
    flexWrap: "wrap",
    paddingTop: 5,
    flexDirection: "row",
    marginHorizontal: 5,
  },

  product: {
    margin: 10,
  },
});
