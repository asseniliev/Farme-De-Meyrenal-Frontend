import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddressScreen from "./screens/AddressScreen";
import AddressDetailsScreen from "./screens/AccessDetailsScreen";
import PersonalDataScreen from "./screens/PersonalDataScreen";
import UserCreationScreen from "./screens/UserCreationScreen";

import OnBoard from "./screens/OnBoard";
import LogScreen from "./screens/LogScreen";
import HomeScreen from "./screens/HomeScreen";

// initialization of the store
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/users"; //thihs is the reducer to be used
import productCounter from "./reducers/productCounter"; 
const store = configureStore({
  reducer: { user, productCounter },
});
// end of initialization

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="OnBoard" component={OnBoard} />
          <Stack.Screen name="Log" component={LogScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="AccessDetails" component={AddressDetailsScreen} />
          <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
          <Stack.Screen name="UserCreation" component={UserCreationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "50%",
  },
  topSection: {
    flex: 0.6,
    width: "100%",
  },
  middleSection: {
    flex: 0.3,
    width: "100%",
    height: "35%",
    marginVertical: "5%",
  },
  bottomSection: {
    flex: 0.1,
    width: "100%",
    height: "5%",
  },
});
