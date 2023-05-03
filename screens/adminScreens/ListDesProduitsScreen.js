import backendUrl from "../../modules/backendUrl";
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import importedStyle from "../../modules/importedStyle";
import ArchivedProduct from "../../components/ArchivedProduct";

export default function ListDesProduits({ navigation }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleArchivedList() {
    setIsOpen(!isOpen);
  }

  return (
    // <View style={styles.container}>
    //   <View style={styles.header}>
    //     <View style={styles.titleContainer}>
    //       <AntDesign name="caretleft" size={24} color="#F3A712" />
    //       <Text
    //         style={styles.title2}
    //         onPress={() => navigation.navigate("Dashboard")}
    //       >
    //         {"  "}tableau{"\n"}
    //         {"  "}de bord
    //       </Text>
    //     </View>
    //     <Text style={styles.title1}>Liste des{"\n"}articles</Text>
    //   </View>
    //   <View style={styles.mainContent}>
    //     <View style={styles.archivedArticles}>
    //       {/* Open/Close button */}
    //       {/* <TouchableOpacity
    //         onPress={() => toggleArchivedList()}
    //         style={styles.dropDownButton}
    //       >
    //         <Text style={importedStyle.textButton}>
    //           Produits archivés :{"             "}
    //         </Text>
    //         <Text>
    //           <AntDesign
    //             name={isOpen ? "up" : "down"}
    //             size={24}
    //             color="white"
    //           />
    //         </Text>
    //       </TouchableOpacity> */}
    //       {/* List of archived items */}
    //       <ScrollView>
    //         <ArchivedProduct />
    //       </ScrollView>
    //     </View>
    //   </View>
    // </View>
    <Image
      source={{
        uri: "https://res.cloudinary.com/dwpghnrrs/image/upload/v1678443035/carrots-7-1200_yppxyf.jpg",
      }}
    ></Image>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F5F9",
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
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title1: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#3A7D44",
    marginLeft: "8%",
  },
  title2: {
    fontFamily: "BelweBold",
    fontSize: 21,
    color: "#F3A712",
  },
  mainContent: {
    flex: 1,
    width: "80%",
    marginTop: "5%",
    marginLeft: "10%",
  },
  dropDownButton: {
    paddingHorizontal: 9,
    // marginTop: 10,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#F3A712",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
