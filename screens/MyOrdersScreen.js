import localIP from "../modules/localIP";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Styles from "../modules/importedStyle";
import { getLoggedUser } from "../modules/isUserLogged";

export default function MyOrders({ navigation }) {
  const [orderList, setOrderList] = useState([]);
  const [fontsLoaded] = useFonts({
    BelweBold: require("../assets/fonts/BelweBold.otf"),
  });

  const loggedUser = getLoggedUser();

  useEffect(() => {
    fetch(`http://${localIP}:3000/orders/filter?user=${loggedUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data.result)
         setOrderList(data.result);
      });
  }, []);

  
  const orders = orderList.map((order, i) => {return <Order key={i} order={order} />});
   //console.log(orders)
  function Order({ order }) {
    return (
      <View style={styles.order}>
        <Text>Numéro de commande : {order.orderNumber}</Text>
        <Text>Montant total : {order.totalAmount}</Text>
        <Text>Payé : {order.isPaid ? "Oui" : "Non"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {fontsLoaded && (
          <Text style={styles.title}>
            mes commandes
          </Text>
        )}
      </View>
      <ScrollView style={styles.orderContainer}>
        {orders}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#F4F5F9",
    justifyContent: "space-between",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
    paddingBottom: 3,
    backgroundColor: "#ffffff",
    width: "100%",
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "#ABABAB",
  },
  title: {
    fontSize: 21,
    color: "#3A7D44",
    fontFamily: "BelweBold",
  },
  productContainerContainer: {
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

  basket: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 10,
  },
});
