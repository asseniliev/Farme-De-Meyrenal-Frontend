import backendUrl from "../../modules/backendUrl";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";
import importedStyle from "../../modules/importedStyle";

export default function BasketPrepScreen({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [confirmedBasket, setconfirmedBasket] = useState([]);
  const [isClientListOpen, setIsClientListOpen] = useState(false);
  const [itemList, setItemList] = useState([]);

  const [isOpen, setIsOpen] = useState(
    Object.fromEntries(
      Object.keys(itemList).map((itemName) => [itemName, false])
    )
  );

  const toggleClientList = () => {
    setIsClientListOpen((prevIsOpen) => !prevIsOpen);
  };

  const totalClients = confirmedBasket.reduce(
    (total, order) => total + (order.user ? 1 : 0),
    0
  );

  function toggleItemDetails(item) {
    setIsOpen((prevToggles) => ({
      ...prevToggles,
      [item]: !prevToggles[item],
    }));
  }

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
              if (!acc[item.title])
                acc[item.title] = {
                  clients: [],
                  totalQuantity: 0,
                };
              acc[item.title].clients.push({
                lastName: order.user ? order.user.lastName : "---",
                firstName: order.user ? order.user.firstName : "---",
                quantity: item.quantity,
                priceUnit: item.priceUnit,
              });
              acc[item.title].totalQuantity += item.quantity;
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


  const clientButton = (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={toggleClientList}
        style={styles.dropDownButtonClient}
      >
        <Text style={styles.dropDownButtonTextClient}>
          <AntDesign
            name={isClientListOpen ? "up" : "right"}
            size={20}
          />
          Liste des clients
        </Text>
        <Text
            style={styles.dropDownButtonTextClient}
          >{totalClients}</Text>
      </TouchableOpacity>
      {isClientListOpen && (
        <View style={styles.itemsList}>
          {confirmedBasket.map((order, index) => (
            <Text key={index} style={styles.client}>
              {order.user
                ? `${order.user.lastName} ${order.user.firstName}`
                : "---"}
            </Text>
          ))}
        </View>
      )}
    </View>
  );

  const Items = Object.entries(itemList).map(([itemName, itemData]) => {
    const { totalQuantity, clients } = itemData;

    const clientsList = clients.map((client) => {
      const { lastName, firstName, quantity, priceUnit } = client;
      const unit = priceUnit ? ` ${priceUnit}` : "";
      return (
        <View style={styles.itemsList}>
          <Text key={`${lastName}-${firstName}`} style={styles.client}>
            {`${lastName} ${firstName} : ${quantity}${unit}`}
          </Text>
        </View>
      );
    });

    const unit = clients[0]?.priceUnit ? ` ${clients[0].priceUnit}` : "";
    return (
      <View key={itemName} style={styles.item}>
        <TouchableOpacity
          onPress={() => toggleItemDetails(itemName)}
          style={styles.dropDownButton}
        >
          <Text style={styles.dropDownButtonText}>
            <AntDesign name={isOpen[itemName] ? "up" : "right"} size={20} />
            {itemName}
          </Text>
          <Text
            style={styles.dropDownButtonText}
          >{`${totalQuantity}${unit}${"\n"}`}</Text>
        </TouchableOpacity>
        {isOpen[itemName] && clientsList}
      </View>
    );
  });

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
        {clientButton}
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
  ordersList: {
    borderRadius: 5,
    paddingHorizontal: 25,
  },
  dropDownButton: {
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    marginTop: 15,
    paddingTop: 7,
  },
  dropDownButtonText: {
    color: "#3A7D44",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  dropDownButtonClient: {
    height: 40,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#3A7D44",
    paddingHorizontal: 15,
    marginTop: 15,
    paddingTop: 7,
  },
  dropDownButtonTextClient: {
    color: "#fff",
    height: 30,
    fontWeight: "600",
    fontSize: 16,
  },
  itemsList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 9,
    borderLeftColor: "#ABABAB",
    borderLeftWidth: 1,
    backgroundColor: "#3A7D4415",
  },
});
