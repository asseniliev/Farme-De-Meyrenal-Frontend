import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from "react-native";

export default Product = () => {
    return (
        <View style={styles.product1}>
        <View style={styles.bigContent}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../assets/potimarron.jpg")}
              style={styles.image}
            />
            <TouchableOpacity onPress={() => console.log("Logo pressed")}>
              <Image
                source={require("../assets/logoInfo.png")}
                style={styles.logoI}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.productName}>Potimarrons</Text>
            <View style={styles.priceUnit}>
              <Text style={styles.price}>07.50€/</Text>
              <Text style={styles.unit}>Piece</Text>
            </View>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.minus}>
            <Image
              source={require("../assets/logoMinusGrey.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
          <View style={styles.quantity}>
            <Text>0</Text>
          </View>
          <TouchableOpacity style={styles.plus}>
            <Image
              source={require("../assets/logoPlus.png")}
              style={styles.logo}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
}
    const styles = StyleSheet.create({
        product1: {
            flexBasis: "47%",
            //width: 185,
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
        //   imageContainer: {
        //     height: 185,
        //     width: 185,
        //   },
        imageContainer: {
            flex: 1,
            aspectRatio: 1,
            Width: '100%',
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
    }
)
    