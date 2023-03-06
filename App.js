<<<<<<< HEAD
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddressScreen from "./screens/AddressScreen";
import AddressDetailsScreen from "./screens/AccessDetailsScreen";

// initialization of the store
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import contour from "./reducers/contours"; //thihs is the reducer to be used

const store = configureStore({
  reducer: { contour },
});
// end of initialization
=======
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import OnBoard from "./screens/OnBoard";
import LogScreen from "./screens/LogScreen";
import HomeScreen from "./screens/HomeScreen";
>>>>>>> 3f608e08a2402630161a7121137b3032d7b8f267

const Stack = createNativeStackNavigator();

export default function App() {
  return (
<<<<<<< HEAD
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="AccessDetails" component={AddressDetailsScreen} />
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
=======
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoard" component={OnBoard} />
        <Stack.Screen name="Log" component={LogScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
>>>>>>> 3f608e08a2402630161a7121137b3032d7b8f267
