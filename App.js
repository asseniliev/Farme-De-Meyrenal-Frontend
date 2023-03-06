import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import OnBoard from "./screens/OnBoard";
import LogScreen from "./screens/LogScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnBoard" component={OnBoard} />
        <Stack.Screen name="LogScreen" component={LogScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
