import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import Styles from "../components/Styles";

export default function Home({ navigation }) {
  return (
    
        <View style={styles.container}>
      
      <View style={styles.header}><Text style={styles.title}>Ferme de Mereynal</Text></View>
      <Image source={require('../assets/fla1.jpg')} style={styles.image} />
      <TouchableOpacity
        onPress={() => navigation.navigate("")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Créer un nouveau compte</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Se connecter</Text>
      </TouchableOpacity>
      <View style={styles.line}></View>
      <TouchableOpacity
        onPress={() => navigation.navigate("")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Continuer sans se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("")}
        style={Styles.button}
      >
        <Text style={Styles.textButton}>Contacter Flavien</Text>
      </TouchableOpacity>
      </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: "#F4F5F9",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  header: {
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: "40%"
  },
  line: {
    backgroundColor: '#ABABAB',
    height: 1,
    width: "80%"
  },
  title: {
    fontFamily: "BelweBold"
  }

  
});
