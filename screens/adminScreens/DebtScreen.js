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
import Order from "../../components/Order";

export default function CheckingOrders({ navigation }) {
  const [fontsLoaded] = useFonts({
    BelweBold: require("../../assets/fonts/BelweBold.otf"),
  });
  const [isLoading, setIsLoading] = useState(true);
  const [validatedBasket, setValidatedBasket] = useState([]);
  const [isClientListOpen, setIsClientListOpen] = useState(false);

  useEffect(() => {
    fetch(`${backendUrl}/orders`)
      .then((response) => response.json())
      .then((data) => {
        const createdOrders = data.result.filter(
          (order) => order.leftToPay > 0
        );
        setValidatedBasket(createdOrders);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        setIsLoading(false);
      });
  }, [navigation]);

  const toggleClientList = () => {
    setIsClientListOpen((prevIsOpen) => !prevIsOpen);
  };

  const totalClients = validatedBasket.reduce(
    (total, order) => total + 1,
    0
  );

  const clientButton = (
    <View style={styles.clients}>
      <TouchableOpacity
        onPress={toggleClientList}
        style={styles.dropDownButtonClient}
      >
        <Text style={styles.dropDownButtonTextClient}>
          <AntDesign name={isClientListOpen ? "up" : "right"} size={20} />
          Liste des clients endettés
        </Text>
        <Text style={styles.dropDownButtonTextClient}>{totalClients}</Text>
      </TouchableOpacity>
      {isClientListOpen && (
        <View style={styles.itemsList}>
          {validatedBasket.map((order, index) => (
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

  const validatedOrders = validatedBasket.map((data, i) => {
    let lastName = "";
    let firstName = "";
    if (data.user) {
      lastName = data.user.lastName;
      firstName = data.user.firstName;
    }

    return (
      <View style={styles.orderContainerContainer} key={i}>
        <View style={styles.orderContainer}>
          <Order
            lastName={lastName}
            firstName={firstName}
            date={data.date}
            orderNumber={data.orderNumber}
            totalAmount={data.totalAmount}
            leftToPay={data.leftToPay}
            items={data.items}
            id={data._id}
          />
        </View>
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
            <Text style={styles.title1}>dette client </Text>
          </>
        )}
      </View>
      <ScrollView style={styles.ordersList}>
        {clientButton}
        {validatedOrders}
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
  clients: {
    paddingHorizontal: 25,
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
  orderContainerContainer: {
    alignItems: "center",
  },
  orderContainer: {
    width: 320,
    paddingVertical: 13,
  },
});
