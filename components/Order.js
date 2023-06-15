import Styles from "../modules/importedStyle";
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
  const [amountValue, setAmountValue] = useState(props.leftToPay);
  const [isEnabled, setIsEnabled] = useState(props.leftToPay <= 0);
  const [modifyingItems, setModifyingItems] = useState(props.items);
  const [editMode, setEditMode] = useState(false);

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
          if (data.order.leftToPay <= 0) toggleSwitch();
        } else {
          console.log("erreur : Paiement non validé");
        }
      });
  }

  function modalPayment() {
    return (
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
                onValueChange={(itemValue) => handlePaymentSelection(itemValue)}
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
                disabled={!selectedPayment}
              >
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
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
          text: "Non",
          onPress: () => {
            console.log("Annuler appuyé");
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );
  }

  function decreaseQuantity(index) {
    const newModifyingItems = [...modifyingItems];
    if (newModifyingItems[index].quantity > 0) {
      const newItem = {
        ...newModifyingItems[index],
        quantity: newModifyingItems[index].quantity - 1,
      };
      newModifyingItems[index] = newItem;

      setModifyingItems(newModifyingItems);
    }
  }

  function increaseQuantity(index) {
    const newModifyingItems = [...modifyingItems];
    const newItem = {
      ...newModifyingItems[index],
      quantity: newModifyingItems[index].quantity + 1,
    };
    newModifyingItems[index] = newItem;

    setModifyingItems(newModifyingItems);
  }

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  function temporaryAmount() {
    return modifyingItems.reduce((acc, modifyingItem) => {
      return acc + modifyingItem.quantity * modifyingItem.price;
    }, 0);
  }

  function temporaryLeftToPay() {
    return temporaryAmount() - (props.totalAmount - props.leftToPay);
  }

  return (
    <View
      style={editMode ? styles.editModeOrderContainer : styles.orderContainer}
    >
      {editMode && (
        <View>
          <Text
            style={{
              fontSize: 20,
              color: "white",
              fontWeight: "bold",
            }}
          >
            Modifications en cours
          </Text>
        </View>
      )}
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
        {!editMode && <TouchableOpacity
          style={{
            position: "absolute",
            top: 2,
            right: 20,
            height: 30,
            width: 30,
          }}
          onPress={() => {
            toggleEditMode();
            setIsOpen(true);
          }}
        >
          <AntDesign name="edit" size={20} color="#ababab" />
        </TouchableOpacity>}
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
          alignItems: "center",
        }}
      >
        {editMode ? (
          <Text
            style={[
              styles.text,
              {
                color:
                  temporaryAmount() !== props.totalAmount ? "red" : "black",
              },
            ]}
          >
            Total : {temporaryAmount()} €
          </Text>
        ) : (
          <Text style={styles.text}>Total : {props.totalAmount} €</Text>
        )}
        {temporaryLeftToPay() > 0 && editMode ? (
          <Text>RAC : {temporaryLeftToPay()} €</Text>
        ) : temporaryLeftToPay() < 0 && editMode ? (
          <Text
            style={{
              color: "red",
              fontWeight: "bold",
            }}
          >
            Avoir de : {temporaryLeftToPay() * -1} €
          </Text>
        ) : null}

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
          onPress={() => { !editMode &&
            toggleSwitchModal();
          }}
        >
          <Switch
            trackColor={{ false: "#fff", true: "#F4F5F9" }}
            thumbColor={isEnabled ? "#fff" : "red"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => {
              !editMode && toggleSwitchModal();
            }}
            value={isEnabled}
            style={{
              transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
              marginRight: 10,
            }}
          />
        </TouchableOpacity>
        {modalPayment()}
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
          <View
            key={j}
            style={editMode ? styles.editModeItemsList : styles.itemsList}
          >
            <Text
              style={[
                editMode ? styles.editModeDetailsText : styles.detailsText,
                { fontWeight: "bold" },
              ]}
            >
              {item.title || "Titre du produit non disponible"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              {editMode ? (
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => decreaseQuantity(j)}>
                    <AntDesign name="minussquareo" size={30} color="#ABABAB" />
                  </TouchableOpacity>
                  <Text>{"       "}</Text>
                  <TouchableOpacity onPress={() => increaseQuantity(j)}>
                    <AntDesign name="plussquareo" size={30} color="#ABABAB" />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.editModeDetailsText,
                      {
                        fontWeight: "bold",
                        color:
                          modifyingItems[j].quantity === item.quantity
                            ? "black"
                            : "red",
                      },
                    ]}
                  >
                    {"   "}
                    {modifyingItems[j].quantity} {item.priceUnit}
                  </Text>
                </View>
              ) : (
                <Text style={styles.detailsText}>
                  Quantité : {item.quantity} {item.priceUnit}
                </Text>
              )}
              <Text
                style={
                  editMode ? styles.editModeDetailsText : styles.detailsText
                }
              >
                {item.price} € / {item.priceUnit}
              </Text>
            </View>
          </View>
        ))}
      {editMode && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[Styles.button, styles.button]}
            onPress={() => {
              setModifyingItems(props.items);
              toggleEditMode();
            }}
          >
            <Text style={Styles.textButton}>Annuler</Text>
          </TouchableOpacity>
          {temporaryAmount() !== props.totalAmount && <TouchableOpacity
            style={[Styles.button, styles.button]}
            onPress={() => {
              setModifyingItems(props.items);
              toggleEditMode();
            }}
          >
            <Text style={Styles.textButton}>Valider</Text>
          </TouchableOpacity>}
        </View>
      )}
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
  editModeOrderContainer: {
    backgroundColor: "#ababab",
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
  detailsText: {
    fontSize: 15,
    padding: 4,
    color: "#3A7D44",
  },
  editModeItemsList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 9,
    borderLeftColor: "black",
    borderLeftWidth: 1,
    backgroundColor: "white",
  },
  editModeDetailsText: {
    fontSize: 15,
    padding: 4,
    color: "black",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 7,
  },
  button: {
    width: "45%",
  },
});
