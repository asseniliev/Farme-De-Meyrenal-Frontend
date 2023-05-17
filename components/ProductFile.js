import React, { useState } from "react";
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

export default function ProductFile(props) {
  //props.isCreateMode = if true, then we can modify the form
  const descriptionMaxLength = 500;

  const [name, setName] = useState(props.name);
  const [scale, setScale] = useState(props.scale);
  const [price, setPrice] = useState(props.price);
  const [unit, setUnit] = useState(props.unit);
  const [description, setDescription] = useState(props.description);
  const [remainingChars, setRemainingChars] = useState(descriptionMaxLength);
  const [screenShift, setScreenShift] = useState(0);

  const isCreateMode = useSelector(
    (state) => state.prodMgtMode.value.isCreateMode
  );

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

  function handleOnPhotoChange() {
    props.gotoPhoto();
  }

  function handleOnDescriptionChange(value) {
    setDescription(value);
    setRemainingChars(descriptionMaxLength - value.length);
  }

  function ImageContent() {
    if (photoUri)
      return (
        <Image style={styles.previewImage} source={{ uri: photoUri }}></Image>
      );
    else return <FontAwesome name="image" size={38} color={"#3A7D44"} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
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
            value={name}
            editable={false}
            selectTextOnFocus={props.isCreateMode}
          />
        </View>
        {/*Price section*/}
        <View style={styles.priceBlock}>
          <View style={styles.priceComponent}>
            <Text style={styles.text20px}>Prix €</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="..."
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </View>
          <View style={styles.scaleComponent}>
            <Text style={styles.text20px}>Scale</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="1"
              onChangeText={(value) => setScale(value)}
              value={scale}
              editable={props.isCreateMode}
              selectTextOnFocus={props.isCreateMode}
            />
          </View>
          <View style={styles.unitComponent}>
            <Text style={styles.text20px}>Unité</Text>
            <SelectList
              setSelected={(val) => setUnit(val)}
              placeholder={"..."}
              data={units}
              save="value"
              boxStyles={styles.selectList}
            />
            {/* <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              containerProps={{ height: 30, stickyHeader: true }}
            /> */}
          </View>
        </View>
        {/* Photo section */}
        <Text style={styles.text26px}>Gérer la photo</Text>
        <View style={styles.photoBlock}>
          <View style={styles.photoContainer}>
            <ImageContent />
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
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  nameBlock: {
    marginTop: "5%",
    height: "13%",
    justifyContent: "space-between",
  },
  text26px: {
    fontSize: 26,
  },
  nameInput: {
    backgroundColor: "#D9D9D9",
    fontSize: 26,
    paddingLeft: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  priceBlock: {
    height: "15%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  priceComponent: {
    maxHeight: "100%",
    marginRight: "20%",
  },
  text20px: {
    fontSize: 20,
  },
  priceInput: {
    backgroundColor: "#D9D9D9",
    fontSize: 20,
    paddingLeft: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
  },
  scaleComponent: {
    marginRight: "5%",
  },
  unitComponent: {
    maxHeight: "100%",
    justifyContent: "flex-start",
  },
  selectList: {
    maxHeight: "100%",
    alignSelf: "center",
    padding: 0,
  },
  photoBlock: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  photoContainer: {
    width: "70%",
    aspectRatio: 1,
    backgroundColor: "#ABABAB",
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
    height: "20%",
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    textAlignVertical: "top",
  },
});
