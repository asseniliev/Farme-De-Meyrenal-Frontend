import Styles from "../components/Styles";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useFonts } from "expo-font";
import Product from "../components/Product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ShoppingCart({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../assets/fonts/BelweBold.otf"),
  });
  if (!fontsLoaded) null;

  const shoppingCart = useSelector((state) => state.productCounter.value);
  console.log('shopping cart >', shoppingCart)

  // const [ products, setProducts ] = useState([])

  // useEffect(() => {
  //   const arr = Object.entries(shoppingCart).map(
  //     ([title, { id, imageUrl, price, priceUnit }]) => setProducts([...products, {
  //       title,
  //       id,
  //       imageUrl,
  //       price,
  //       priceUnit,
  //     }])
  //   );
  // }, [shoppingCart]);

  const products = shoppingCart.map((data, i) => {
      console.log('data', data);
    return (
      <Product
        imageUrl={data.imageUrl}
        title={data.title}
        price={data.price}
        priceUnit={data.priceUnit}
        id={data.id}
        key={i}
      />
    );
  })

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
