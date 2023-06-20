import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { useSelector } from "react-redux";

import { FontAwesome } from "@expo/vector-icons";

export default function ProductCreatedScreen({ navigation }) {
  const newProduct = useSelector((state) => state.prodData.value);
  return (
    <View style={styles.container}>
      <Text style={styles.text26px}>Nouveau produit créé</Text>
      {/*Product name section*/}
      <View style={styles.nameBlock}>
        <Text style={styles.text20px}>Nom de 'article</Text>
        <TextInput
          style={styles.nameInput}
          editable={false}
          value={newProduct.title}
          selectTextOnFocus={false}
        />
      </View>
      {/*Price section*/}
      <View style={styles.priceBlock}>
        <View style={styles.priceComponent}>
          <Text style={styles.text20px}>Prix €</Text>
          <TextInput
            style={styles.priceInput}
            editable={false}
            value={newProduct.price.toString()}
          />
        </View>
        <View style={styles.scaleComponent}>
          <Text style={styles.text20px}>Scale</Text>
          <TextInput
            style={styles.priceInput}
            value={newProduct.unitScale.toString()}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
        <View style={styles.unitComponent}>
          <Text style={styles.text20px}>Unité</Text>
          <TextInput
            style={styles.priceInput}
            value={newProduct.priceUnit}
            editable={false}
            selectTextOnFocus={false}
          />
        </View>
      </View>
      {/* Photo section */}
      <Text style={styles.text26px}>Photo</Text>
      <View style={styles.photoBlock}>
        <View style={styles.photoContainer}>
          <Image
            style={styles.previewImage}
            source={{ uri: newProduct.imageUrl }}
          ></Image>
        </View>
      </View>
      {/* Long Description Section */}
      <View style={styles.detailsTexts}>
        <FontAwesome name="info-circle" size={26} color={"#F3A712"} />
        <Text style={styles.text20px}>Information sur le produit</Text>
      </View>
      <TextInput
        style={styles.productDetails}
        multiline={true}
        numberOfLines={4}
        value={newProduct.description}
        editable={false}
      ></TextInput>
      <TouchableOpacity
        onPress={() => navigation.navigate("ListOfProducts")}
        style={styles.buttonFull}
      >
        <Text style={styles.textButton}>Vers le liste des produits</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    justifyContent: "space-between",
    marginTop: "10%",
    marginBottom: "10%",
    paddingHorizontal: "4%",
  },
  nameBlock: {
    marginTop: "5%",
    height: "10%",
    justifyContent: "space-between",
  },
  text26px: {
    fontSize: 26,
    fontFamily: "BelweBold",
    color: "#3A7D44",
    textAlign: "center",
  },
  nameInput: {
    backgroundColor: "#D9D9D9",
    fontSize: 20,
    paddingLeft: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3A7D44",
    color: "#3A7D44",
    backgroundColor: "#F3A71290",
  },
  priceBlock: {
    height: "15%",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: "7%",
    zIndex: 1,
  },
  priceComponent: {
    maxHeight: "100%",
    marginRight: "20%",
  },
  text20px: {
    fontSize: 20,
    fontFamily: "BelweBold",
    color: "#3A7D44",
  },
  priceInput: {
    backgroundColor: "#D9D9D9",
    fontSize: 20,
    paddingLeft: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3A7D44",
    color: "#3A7D44",
    backgroundColor: "#F3A71290",
  },
  scaleComponent: {
    marginRight: "5%",
  },
  unitComponent: {
    maxHeight: "100%",
    justifyContent: "flex-start",
  },
  selectList: {
    alignSelf: "auto",
    borderColor: "#3A7D44",
    color: "#3A7D44",
    backgroundColor: "#F3A71290",
  },
  photoBlock: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 5,
    zIndex: 0,
  },
  photoContainer: {
    width: "70%",
    aspectRatio: 1,
    backgroundColor: "#F3A71290",
    borderWidth: 1,
    borderColor: "#000000",
    borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    marginRight: "5%",
  },
  previewImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    flex: 1,
  },
  detailsTexts: {
    marginTop: "4%",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  productDetails: {
    marginTop: "2%",
    height: "20%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    textAlignVertical: "top",
    borderColor: "#3A7D44",
    color: "#3A7D44",
    backgroundColor: "#F3A71290",
  },
  buttonFull: {
    backgroundColor: "#3A7D44",
    marginLeft: "2%",
    marginTop: "5%",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginBottom: "5%",
    width: "90%",
    alignItems: "center",
  },
  textButton: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});
