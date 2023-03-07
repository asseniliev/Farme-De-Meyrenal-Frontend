import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AddressScreen from "./screens/AddressScreen";
import AddressDetailsScreen from "./screens/AccessDetailsScreen";
import PersonalDataScreen from "./screens/PersonalDataScreen";
import UserCreationScreen from "./screens/UserCreationScreen";
import OrderEndScreen from "./screens/OrderEndScreen";
import OrderSummaryScreen from "./screens/OrderSummaryScreen";
import UnderConstructionScreen from "./screens/UnderConstructionScreen";

import OnBoard from "./screens/OnBoard";
import LogScreen from "./screens/LogScreen";
import HomeScreen from "./screens/HomeScreen";
import { useState } from "react";

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
const Tab = createBottomTabNavigator();

const BasketStack = createNativeStackNavigator();

function BasketStackScreen() {
  return (
    <BasketStack.Navigator>
      <BasketStack.Screen name="Basket" component={OrderSummaryScreen} />
      <BasketStack.Screen
        name="UnderConstruction"
        component={UnderConstructionScreen}
      />
      <BasketStack.Screen name="OrderEnd" component={OrderEndScreen} />
    </BasketStack.Navigator>
  );
}

function TabNavigator() {
  const activeColor = "#3a7d44";
  const inactiveColor = "#ababab";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "BasketTab") {
            iconName = "shopping-basket";
          } else if (route.name === "Account") {
            iconName = "user";
          }
          return (
            <View style={styles.iconsBar}>
              <View
                style={[
                  styles.iconContainer,
                  { borderColor: color == activeColor ? color : "#ffffff" },
                ]}
              >
                <FontAwesome name={iconName} size={size} color={color} />
              </View>
            </View>
          );
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: [{ height: 60 }],
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="BasketTab" component={BasketStackScreen} />
      <Tab.Screen name="Account" component={OrderEndScreen} />
    </Tab.Navigator>
  );
}

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
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} />
          <Stack.Screen name="OrderEnd" component={OrderEndScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen
            name="UnderConstruction"
            component={UnderConstructionScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  iconsBar: {
    flex: 1,
    height: 100,
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  iconContainer: {
    width: "40%",
    borderTopWidth: 8,
    paddingTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
