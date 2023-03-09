import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "../reducers/productCounter";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

export default function Product(props) {
  const navigation = useNavigation();

  const compteur = useSelector((state) => {
    const product = state.productCounter.value.find((p) => p.id === props.id);
    return product ? product.quantity : 0;
  });

  const loggedUser = useSelector((data) => {
    if (data.user) return data.user.value;
    else return null;
  });

  const dispatch = useDispatch();
  const incrementBtn = () => {
    dispatch(
      increment({
        id: props.id,
        title: props.title,
        imageUrl: props.imageUrl,
        price: props.price,
        priceUnit: props.priceUnit,
      })
    );
  };

  const decrementBtn = () => {
    dispatch(decrement({ id: props.id, title: props.title }));
  };

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.product1}>
      <View style={styles.bigContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: props.imageUrl }} style={styles.image} />
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={require("../assets/logoInfo.png")}
              style={styles.logoI}
            />
          </TouchableOpacity>
          {modalVisible && (
            <View style={styles.modal}>
              <Text>Ceci est la modale.</Text>
              < TouchableOpacity title="Fermer" onPress={toggleModal} ></TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.productName}>{props.title}</Text>
          <View style={styles.priceUnit}>
            <Text style={styles.price}>{props.price}€/</Text>
            <Text style={styles.unit}>{props.priceUnit}</Text>
          </View>
        </View>
      </View>
      <View style={styles.quantityContainer}>
        {loggedUser.accesstoken !== "" ? (
          <>
            <TouchableOpacity
              style={styles.minus}
              onPress={() => decrementBtn()}
            >
              <Image
                source={require("../assets/logoMinusGrey.png")}
                style={styles.logo}
              />
            </TouchableOpacity>
            <View style={styles.quantity}>
              <Text>{compteur}</Text>
            </View>
            <TouchableOpacity
              style={styles.plus}
              onPress={() => incrementBtn()}
            >
              <Image
                source={require("../assets/logoPlus.png")}
                style={styles.logo}
              />
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Log")}
          >
            <Text style={styles.loginButtonText}>Se connecter</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product1: {
    flexBasis: "47%",
    height: 302,
    backgroundColor: "#ffffff",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-between",
    margin: 5,
  },
  bigContent: {
    flex: 0.87,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    Width: "100%",
    height: undefined,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  logoI: {
    position: "absolute",
    top: -155,
    right: 15,
  },
  textContainer: {
    marginTop: 10,
    marginHorizontal: 12,
    width: "100%",
  },
  productName: {
    fontSize: 13,
  },
  priceUnit: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  price: {
    fontSize: 12,
  },
  unit: {
    fontSize: 10,
  },
  quantityContainer: {
    flexDirection: "row",
  },
  minus: {
    width: 42,
    height: 35,
    backgroundColor: "#F3A712",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: "#ABABAB",
  },
  quantity: {
    width: 42,
    height: 35,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#ABABAB",
    marginBottom: 22,
  },
  plus: {
    width: 42,
    height: 35,
    backgroundColor: "#F3A712",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ABABAB",
  },
  loginButton: {
    backgroundColor: "#F3A712",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  /*modal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },*/
  
});
