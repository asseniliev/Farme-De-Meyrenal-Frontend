import backendUrl from "../../modules/backendUrl";
import React from "react";
// import ProductFile from "../../components/ProductFile";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  TouchableOpacityBase,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ProductFile from "../../components/ProductFile";

export default function ProductDetails({ navigation }) {
  function GoToSnapshopScreen() {
    navigation.navigate("SnapScreen");
  }

  function GoToProductCreatedScreen() {
    navigation.navigate("ProductCreated");
  }

  return (
    <View style={styles.container}>
      {/* Page navigation header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <AntDesign name="caretleft" size={24} color="#F3A712" />
          <Text
            style={styles.title2}
            onPress={() => navigation.navigate("ListOfProducts")}
          >
            {"  "}Liste{"\n"}
            {"  "}des produits
          </Text>
        </View>
        <Text style={styles.title1}>Dossier{"\n"}produit</Text>
      </View>

      {/* Product details */}
      <ScrollView style={styles.productContainer}>
        <ProductFile
          gotoPhoto={GoToSnapshopScreen}
          gotoCreated={GoToProductCreatedScreen}
          style={{ zIndex: 0 }}
        />
        <View style={{height: 200}}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
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
    zIndex: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title1: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
    marginLeft: "8%",
  },
  title2: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#F3A712",
  },
  productContainer: {
    flex: 0.8,
    width: "90%",
    marginLeft: "5%",
  },
});
