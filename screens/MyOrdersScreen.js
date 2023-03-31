import backendUrl from "../modules/backendUrl";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import importedStyle from "../modules/importedStyle";
import { getLoggedUser } from "../modules/isUserLogged";
import { AntDesign } from "@expo/vector-icons";

export default function MyOrders({ navigation }) {
  const [orderList, setOrderList] = useState([]);
  const [isOpen, setIsOpen] = useState({});
  const [fontsLoaded] = useFonts({
    BelweBold: require("../assets/fonts/BelweBold.otf"),
  });
  const loggedUser = getLoggedUser();

  useEffect(() => {
    fetch(`${backendUrl}/orders/?user=${loggedUser.id}`)
      .then((response) => response.json())
      .then((data) => {
        setOrderList(data.result);
      });
  }, [navigation]);

  function formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString("fr-FR");
    return formattedDate;
  }
  //Create a state for each details order
  function toggleOrderDetails(key) {
    setIsOpen({ ...isOpen, [key]: !isOpen[key] });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {fontsLoaded && <Text style={styles.title}>Mes commandes</Text>}
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={{ height: 30 }}></View>
        <View style={styles.ordersContainer}>
          {orderList
            .map((order, i) => (
              <View style={styles.orderContainer} key={i}>
                <Text style={styles.text}>
                  Date de commande: {formatDate(order.date)}
                </Text>
                <Text style={styles.text}>Numéro : {order.orderNumber}</Text>
                <Text style={styles.text}>
                  Montant total : {order.totalAmount}
                </Text>
                <Text style={styles.text}>
                  Payé : {order.isPaid ? "Oui" : "Non"}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleOrderDetails(i)}
                  style={styles.dropDownButton}
                >
                  <Text style={importedStyle.textButton}>
                    Détails de la commande :{"             "}
                  </Text>
                  <Text>
                    <AntDesign
                      name={isOpen[i] ? "up" : "down"}
                      size={24}
                      color="white"
                    />
                  </Text>
                </TouchableOpacity>
                {isOpen[i] && (
                  <View style={styles.dropDownMenu}>
                    {order.items.map((item, j) => (
                      <View key={j} style={{ marginBottom: 3 }}>
                        <Text style={styles.text}>
                          {" "}
                          {item.title || "  Titre du produit non disponible"}
                        </Text>
                        <Text style={styles.detailsText}>
                          {"   "}
                          Quantité : {item.quantity} {item.priceUnit}
                        </Text>
                        <Text style={styles.detailsText}>
                          {"   "}Prix unitaire : {item.price}€
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))
            .reverse()}
        </View>
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
    paddingTop: 40,
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
  scrollView: {
    width: "100%",
  },
  ordersContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  orderContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    padding: 2,
  },
  dropDownButton: {
    justifyContent: "spaceBetween",
    paddingHorizontal: 9,
    marginTop: 10,
    paddingTop: 10,
    backgroundColor: "#F3A712",
    borderRadius: 10,
    flexDirection: "row",
  },
  dropDownMenu: {
    borderWidth: 1,
    borderColor: "#ABABAB",
    margin: 3,
    padding: 4,
  },
  detailsText: {
    fontSize: 15,
    padding: 4,
    color: "#ABABAB",
  },
});
