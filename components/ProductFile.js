import backendUrl from "../modules/backendUrl";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import DropDownPicker from "react-native-dropdown-picker";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { ClearPicture } from "../reducers/pictures";
import { StoreProductData } from "../reducers/productData";

export default function ProductFile(props) {
  //props.isCreateMode = if true, then we can modify the form
  const descriptionMaxLength = 500;

  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [scale, setScale] = useState();
  const [price, setPrice] = useState();
  const [unit, setUnit] = useState("...");
  const [unitScale, setUnitScale] = useState("1");
  const [imageUrl, setImageUrl] = useState();
  const [isActive, setIsActive] = useState(true);
  const [description, setDescription] = useState();
  const [remainingChars, setRemainingChars] = useState();
  const [screenShift, setScreenShift] = useState(0);

  const dispatch = useDispatch();

  const isCreateMode = useSelector(
    (state) => state.prodMgtMode.value
  );

  const productId = useSelector((state) => state.prodData.value);
  const photoUri = useSelector((state) => state.picture.value.uri);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "1", value: "kg" },
    { label: "2", value: "pièce" },
  ]);

  const units = [
    { key: "1", value: "kg" },
    { key: "2", value: "pièce" },
  ];

  //console.log(`isCreateMode = ${isCreateMode}`);
  useEffect(() => {
    if (!isCreateMode) {
      fetchProduct()
    }
  }, [price]);

  async function fetchProduct() {
    let response = await fetch(`${backendUrl}/products/${productId}`);
    response = await response.json();

    // console.log(`Prize = ${response.data.price}`);
    // console.log(`Titul = ${response.data.price}`);

    setId(productId);
    setTitle(response.data.title);
    setScale(response.data.unitScale);
    setPrice(response.data.price.toString());
    setUnit(response.data.priceUnit);
    setUnitScale(response.data.unitScale);
    setDescription(response.data.description);
    setImageUrl(response.data.imageUrl);
    setIsActive(response.data.isActive);
    setUnitScale(response.data.unitScale);
  }

  function clearProductScreen() {
    setName("");
    setScale("1");
    setPrice("");
    setUnit("kg");
    setDescription("");
  }

  function handleOnPhotoChange() {
    props.gotoPhoto();
  }

  function handleOnDescriptionChange(value) {
    setDescription(value);
    setRemainingChars(descriptionMaxLength - value.length);
  }

  async function saveChanged() {
    const formData = new FormData();
    const url = `${backendUrl}/products`;

    formData.append("productPhoto", {
      uri: photoUri,
      name: photoUri.split("/Camera/")[1],
      type: "image/jpeg",
    });

    const productData = {
      title: name,
      description: description,
      price: price,
      unitScale: scale !== undefined ? scale : "1",
      priceUnit: unit,
    };

    formData.append("productData", JSON.stringify(productData));

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });

    const data = await response.json();

    if (data.result) {
      const newProduct = {
        title: data.product.title,
        description: data.product.description,
        imageUrl: data.product.imageUrl,
        price: data.product.price,
        unitScale: data.product.unitScale,
        priceUnit: data.product.priceUnit,
      };
      clearProductScreen();
      dispatch(ClearPicture());
      dispatch(StoreProductData(newProduct));
      props.gotoCreated();
    }
  }

  function ImageContent(props) {
    if (imageUrl)
      return (
        <Image style={styles.previewImage} source={{ uri: props.imageUrl }}></Image>
      );
    else return <FontAwesome name="image" size={38} color={"#3A7D44"} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        //style={styles.container}
        style={{
          ...styles.container,
          transform: [{ translateY: screenShift }],
        }}
      >
        {/*Product name section*/}
        <View style={styles.nameBlock}>
          <Text style={styles.text26px}>Nom de 'article</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="nom de l'article"
            onChangeText={(value) => setName(value)}
            value={title}
            editable={isCreateMode}
            selectTextOnFocus={props.isCreateMode}
          />
        </View>
        {/*Price section*/}
        <View style={styles.priceBlock}>
          <View style={styles.priceComponent}>
            <Text style={styles.text20px}>Prix €</Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              //placeholder="..."
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </View>
          <View style={styles.scaleComponent}>
            <Text style={styles.text20px}>Scale</Text>
            <TextInput
              style={styles.priceInput}
              keyboardType="numeric"
              placeholder="1"
              onChangeText={(value) => setScale(value)}
              value={unitScale.toString()}
              editable={props.isCreateMode}
              selectTextOnFocus={props.isCreateMode}
            />
          </View>
          <View style={styles.unitComponent}>
            <Text style={styles.text20px}>Unité</Text>
            <SelectList
              setSelected={(val) => setUnit(val)}
              placeholder={unit}
              data={units}
              save="value"
              boxStyles={styles.unitsList}
              dropdownStyles={styles.selectList}
            />
          </View>
        </View>
        {/* Photo section */}
        <Text style={styles.text26px}>Gérer la photo</Text>
        <View style={styles.photoBlock}>
          <View style={styles.photoContainer}>
            <ImageContent
              imageUrl={imageUrl}
            />
          </View>
          <TouchableOpacity onPress={() => handleOnPhotoChange()}>
            <FontAwesome name="edit" size={38} color={"#3A7D44"} />
          </TouchableOpacity>
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
          onChangeText={(value) => handleOnDescriptionChange(value)}
          value={description}
          placeholdxer="Insérer les détails du produit..."
          onFocus={() => {
            setScreenShift(-100);
          }}
          onBlur={() => setScreenShift(0)}
        ></TextInput>
        <Text>{remainingChars} caractères restent disponibles</Text>
        <TouchableOpacity
          onPress={() => saveChanged()}
          style={styles.buttonFull}
        >
          <Text style={styles.textButton}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  nameBlock: {
    marginTop: "5%",
    height: "8%",
    justifyContent: "space-between",
  },
  text26px: {
    fontSize: 26,
    fontFamily: "BelweBold",
    color: "#3A7D44",
  },
  nameInput: {
    fontSize: 26,
    paddingLeft: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3A7D44",
    color: "#3A7D44",
    backgroundColor: "#F3A71290",
  },
  priceBlock: {
    height: "10%",
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
  unitsList: {
    backgroundColor: "#F3A71290",
    borderColor: "#3A7D44",
  },
  selectList: {
    alignSelf: "auto",
    borderColor: "#3A7D44",
    color: "#3A7D44",
    backgroundColor: "#F3A712",
  },
  photoBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
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
  },
  detailsTexts: {
    marginTop: "4%",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 15,
  },
  productDetails: {
    marginTop: "2%",
    height: "15%",
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
