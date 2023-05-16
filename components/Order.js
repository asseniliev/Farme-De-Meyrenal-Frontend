import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import importedStyle from "../modules/importedStyle";

export default function Order(props) {
  const [isOpen, setIsOpen] = useState(false);
  function toggleOrderDetails() {
    setIsOpen(!isOpen);
  }
  
  function formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString("fr-FR");
    return formattedDate;
  }

  return (
    <View style={styles.orderContainer}>
      <Text style={styles.textId}>
        {props.lastName} {props.firstName}
      </Text>
      {props.deliveryAddress ? (
        <Text style={[styles.text, { marginBottom: 5 }]}>
          {props.deliveryAddress}
        </Text>
      ) : (
        <></>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.text}>Total : {props.totalAmount} €</Text>
        <Text style={styles.text}>{formatDate(props.date)}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.text}>Payé : {props.isPaid ? "Oui" : "Non"}</Text>
        <Text style={styles.text}>N° {props.orderNumber}</Text>
      </View>
      <TouchableOpacity
        onPress={() => toggleOrderDetails()}
        style={styles.dropDownButton}
      >
        <Text>
          <AntDesign name={isOpen ? "up" : "right"} size={20} />
        </Text>
        <Text style={styles.text}> Détails de la commande :</Text>
      </TouchableOpacity>
      {isOpen &&
        props.items?.map((item, j) => (
          <View key={j} style={styles.itemsList}>
            <Text style={[styles.detailsText, {fontWeight: "bold"}]}>
              {item.title || "Titre du produit non disponible"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Text style={styles.detailsText}>
                Quantité : {item.quantity} {item.priceUnit}
              </Text>
              <Text style={styles.detailsText}>
                {item.price} € / {item.priceUnit}
              </Text>
            </View>
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  orderContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 0,
  },
  text: {
    fontSize: 15,
    padding: 2,
  },
  itemsList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 9,
    borderLeftColor: "#ABABAB",
    borderLeftWidth: 1,
    backgroundColor: "#3A7D4415",
  },
  textId: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 2,
    marginVertical: 5,
    fontWeight: "bold",
    color: "#3A7D44",
  },
  dropDownButton: {
    marginTop: 0,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: "row",
  },
  detailsText: {
    fontSize: 15,
    padding: 4,
    color: "#3A7D44",
  },
});
