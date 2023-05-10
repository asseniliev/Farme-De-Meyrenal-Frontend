import backendUrl from "../../modules/backendUrl";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import Order from "../../components/Order";
import importedStyle from "../../modules/importedStyle";

export default function BasketPrepScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [confirmedBasket, setconfirmedBasket] = useState([]);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    fetch(`${backendUrl}/orders`)
      .then((response) => response.json())
      .then((data) => {
        const confirmedOrders = data.result.filter(
          (order) => order.status === "confirmed"
        );

        const clientsByItems = confirmedOrders.reduce((acc, order) => {
          order.items.map((item) => {
            if (item.title) {
              if (!acc[item.title]) acc[item.title] = [];
              acc[item.title].push({
                lastName: order.user ? order.user.lastName : " ",
                firstName: order.user ? order.user.firstName : " ",
                quantity: item.quantity,
                priceUnit: item.priceUnit,
              });
            }
            return item;
          });
          return acc;
        }, {});

        setconfirmedBasket(confirmedOrders);
        setItemList(clientsByItems);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  }, [navigation]);

  const Items = Object.keys(itemList).map((itemName, i) => (
    <View key={i}>
      <Text>{itemName} :</Text>
      {itemList[itemName].map((user, j) => (
        <View key={j}>
          <Text>Nom : {user.lastName}</Text>
          <Text>Prénom : {user.firstName}</Text>
          <Text>
            Quantité : {user.quantity} {user.priceUnit}
          </Text>
        </View>
      ))}
    </View>
  ))
  // const Items = itemList.map((item, i) => {
  //   return (
  //     <View key={i}>
  //       <Text>`${Object.keys(item)[0]} :`</Text>
  //       {item.map((user, j) => {
  //         <View key={j}>
  //           <Text>`Nom ${user.lastName}`</Text>
  //           <Text>`Prénom ${user.firstName}`</Text>
  //           <Text>
  //             `Quantité ${user.quantity} ${user.priceUnit}`
  //           </Text>
  //         </View>;
  //       })}
  //     </View>
  //   );
  // });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {"\n"}
          {"\n"}
          {"\n"} Chargement en cours...
        </Text>
      </View>
    );
  }

  console.log(itemList);
  // console.log(confirmedBasket)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {fontsLoaded && (
          <>
            <View style={styles.title1Container}>
              <AntDesign name="caretleft" size={24} color="#F3A712" />
              <Text
                style={styles.title2}
                onPress={() => navigation.navigate("Dashboard")}
              >
                {"  "}tableau{"\n"}
                {"  "}de bord
              </Text>
            </View>
            <Text style={styles.title1}>préparer paniers</Text>
          </>
        )}
      </View>
      <ScrollView style={styles.ordersList}>
        {Items}
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
  },
  title1Container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title1: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
  },
  title2: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#F3A712",
  },
  orderContainerContainer: {
    flexDirection: "row",
    width: "100%",
  },
  orderContainer: {
    width: 320,
    paddingLeft: 13,
    paddingRight: 3,
    paddingVertical: 13,
  },
  buttonContainer: {
    //justifyContent: "spaceBetween",
    alignItems: "center",

    paddingTop: 70,
  },
  buttonContainerFinal: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
  },
});
