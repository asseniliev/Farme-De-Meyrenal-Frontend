import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  Alert,
  TextInput,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AntDesign } from "@expo/vector-icons";
import backendUrl from "../modules/backendUrl";

export default function Order(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalPaiementFalseOpen, setIsModalPaiementFalseOpen] =
    useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isModalValidating, setIsModalValidating] = useState(false);
  const [amountValue, setAmountValue] = useState(props.leftToPay);
  const [isEnabled, setIsEnabled] = useState(props.leftToPay <= 0);

  function toggleOrderDetails() {
    setIsOpen(!isOpen);
  }

  function formatDate(date) {
    const formattedDate = new Date(date).toLocaleDateString("fr-FR");
    return formattedDate;
  }

  function toggleSwitch() {
    setIsEnabled(!isEnabled);
  }

  function toggleSwitchModal() {
    !isEnabled ? setIsModalPaiementFalseOpen(true) : showAlert();
  }

  function handlePaymentSelection(payment) {
    setSelectedPayment(payment);
    console.log(payment);
  }

  function handlePaymentValidation() {
    handlePaymentConfirmed(props.id);
    setIsModalPaiementFalseOpen(false);
    setSelectedPayment("");
  }

  function handlePaymentConfirmed(id) {
    const paiement = {
      paymentMethod: selectedPayment,
      paymentDate: new Date(),
      amount: amountValue,
    };
    const url = `${backendUrl}/orders/${id}/payments`;
    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paiement),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          console.log(data.message);
          props.leftToPay = data.order.leftToPay;
          console.log(data.order.leftToPay);
          if (data.order.leftToPay <= 0) toggleSwitch();
        } else {
          console.log("erreur : Paiement non validé");
        }
      });
  }

  function showAlert() {
    Alert.alert(
      "Confirmation",
      "Etes vous vraiment sûr de vouloir annuler ce ou ces paiements ?",
      [
        {
          text: "Oui",
          onPress: () => {
            fetch(`${backendUrl}/orders/${props.id}/removePayments`, {
              method: "DELETE",
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data.message);
                toggleSwitch();
                if (data.result) console.log(data.result);
              })
              .catch((error) => {
                console.log("error", error);
              });
          },
        },
        {
          text: "Annuler",
          onPress: () => {
            console.log("Annuler appuyé");
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.orderContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.textId}>
          {props.lastName} {props.firstName}
        </Text>
        <Text style={styles.text}>{props.orderNumber}</Text>
      </View>
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
        <Text
          style={[
            styles.text,
            {
              fontWeight: isEnabled ? "normal" : "bold",
              color: isEnabled ? "#ABABAB" : "red",
            },
          ]}
        >
          {isEnabled ? "Payé    " : "Non payé"}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Text style={styles.text}>{formatDate(props.date)}</Text>
        <TouchableOpacity
          onPress={() => {
            toggleSwitchModal();
          }}
        >
          <Switch
            trackColor={{ false: "#fff", true: "#F4F5F9" }}
            thumbColor={isEnabled ? "#fff" : "red"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              toggleSwitchModal();
            }}
            value={isEnabled}
            style={{
              transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
              marginRight: 10,
            }}
          />
        </TouchableOpacity>

        <Modal
          visible={isModalPaiementFalseOpen}
          animationType="slide"
          transparent={true}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Mode de paiement :</Text>
              <View style={styles.paymentOption}>
                <Text>RAC : {props.leftToPay}€</Text>
                <Picker
                  selectedValue={selectedPayment}
                  onValueChange={(itemValue) =>
                    handlePaymentSelection(itemValue)
                  }
                >
                  <Picker.Item label="< Sélectionner >" value="" />
                  <Picker.Item label="Virement bancaire" value="transfert" />
                  <Picker.Item label="Espèce" value="cash" />
                  <Picker.Item label="Carte de crédit" value="card" />
                  <Picker.Item label="Avoir" value="creditNote" />
                  <Picker.Item label="Remise" value="discount" />
                  <Picker.Item label="Chèque" value="cheque" />
                </Picker>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text>Montant :</Text>
                  <View style={styles.input}>
                    <TextInput
                      style={styles.inputText}
                      placeholder={String(props.leftToPay)}
                      onChangeText={(value) => setAmountValue(Number(value))}
                      value={String(amountValue)}
                      keyboardType="numeric"
                    />
                  </View>
                  <Text>€</Text>
                </View>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsModalPaiementFalseOpen(false);
                    setSelectedPayment("");
                  }}
                >
                  <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.validateButton}
                  onPress={handlePaymentValidation}
                  disabled={!selectedPayment || isModalValidating}
                >
                  <Text style={styles.buttonText}>Valider</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
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
            <Text style={[styles.detailsText, { fontWeight: "bold" }]}>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  paymentOption: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    marginTop: 20,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "blue",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  cancelButton: {
    marginRight: 10,
    backgroundColor: "#ccc",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  validateButton: {
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "grey",
    margin: 10,
  },
  inputText: {
    fontSize: 20,
  },
});
