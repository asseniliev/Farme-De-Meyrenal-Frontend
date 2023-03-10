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

export default function Home({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) null;

  const [productList, setProductList] = useState([]);
  useEffect(() => {
    fetch("http://10.0.1.23:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProductList(data.result);
      });
  }, []);

  const products = productList.map((dat, i) => {
    return (
      <Product
        imageUrl={dat.imageUrl}
        title={dat.title}
        price={dat.price}
        priceUnit={dat.priceUnit}
        id={dat._id}
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
