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
import { SelectList } from 'react-native-dropdown-select-list';
import DropDownPicker from 'react-native-dropdown-picker';

export default function ProductFile(props) {

  //props.isCreateMode = if true, then we can modify the form
  const [name, setName] = useState(props.name);
  const [scale, setScale] = useState(props.scale)
  const [price, setPrice] = useState(props.price);
  const [unit, setUnit] = useState(props.unit);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: '1', value: 'kg' },
    { label: '2', value: 'pièce' }
  ]);

  const units = [
    { key: '1', value: 'kg' },
    { key: '2', value: 'pièce' },
  ]


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView style={styles.container} behavior="height">

        {/*Product name section*/}
        <View style={styles.nameBlock}>
          <Text style={styles.nameText}>Nom de 'article</Text>
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
            <Text style={styles.priceText}>Prix €</Text>
            <TextInput
              style={styles.priceInput}
              placeholder="..."
              onChangeText={(value) => setPrice(value)}
              value={price}
            />
          </View>
          <View style={styles.scaleComponent}>
            <Text style={styles.priceText}>Scale</Text>
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
            <Text style={styles.priceText}>Unité</Text>
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

      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start"
  },
  nameBlock: {
    marginTop: "5%",
    height: "13%",
    justifyContent: "space-between"
  },
  nameText: {
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
    marginTop: "3%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start"
  },
  priceComponent: {
    maxHeight: "100%",
    marginRight: "20%",
    backgroundColor: "#ff0000"
  },
  priceText: {
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
  }
})
