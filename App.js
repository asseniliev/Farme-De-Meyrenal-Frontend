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
import UserSignInScreen from "./screens/UserSignInScreen";
import MyAccountScreen from "./screens/MyAccountScreen";

import PresentationScreen from "./screens/PresentationScreen";
import ContactChoiceScreen from "./screens/ContactChoiceScreen";
import NotificationSentScreen from "./screens/NotificationSentScreen";
import NotificationFailScreen from "./screens/NotificationFailScreen";
import MyOrdersScreen from "./screens/MyOrdersScreen";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnBoard from "./screens/OnBoard";
import LogScreen from "./screens/LogScreen";
import HomeScreen from "./screens/HomeScreen";
import ShoppingCart from "./screens/ShoppingCart";
import { useSelector } from "react-redux";

// initialization of the store
import { Provider } from "react-redux";
import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import user from "./reducers/users"; //thihs is the reducer to be used
import productCounter from "./reducers/productCounter";
import { getLoggedUser } from "./modules/isUserLogged";

//AsyncStorage.clear();

const reducers = combineReducers({ user, productCounter });
const persistConfig = {
  key: "loggedUser",
  storage: AsyncStorage,
};

const store = configureStore({
  //reducer: { user, productCounter },
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
// end of initialization

const persistor = persistStore(store);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="PresentationScreen" component={PresentationScreen} options={{ headerShown: false }} />
    </HomeStack.Navigator>
  );
}

const BasketStack = createNativeStackNavigator();
function BasketStackScreen() {
  return (
    <BasketStack.Navigator>
      <BasketStack.Screen name="ShoppingCart" component={ShoppingCart} options={{ headerShown: false }} />
      <BasketStack.Screen name="Summary" component={OrderSummaryScreen} options={{ headerShown: false }} />
      <BasketStack.Screen name="Complete" component={OrderEndScreen} options={{ headerShown: false }} />
    </BasketStack.Navigator>
  );
}
const AccountStack = createNativeStackNavigator();
function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen name="Account" component={MyAccountScreen} options={{ headerShown: false }} />
      <AccountStack.Screen name="MyOrders" component={MyOrdersScreen} options={{ headerShown: false }}/>
    </AccountStack.Navigator>
  );
}

function TabNavigator() {
  const activeColor = "#3a7d44";
  const inactiveColor = "#ababab";

  const loggedUser = getLoggedUser();

  const productCount = useSelector((state) => { const count = state.productCounter.value.length;
    return count !== 0 ? count : "";
  });

  let accountScreen;
  loggedUser.accesstoken === "" ? accountScreen = LogScreen : accountScreen = MyAccountScreen;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {

          let iconName = "";
          if (route.name === "Home") { iconName = "home";
          } else if (route.name === "Basket") { iconName = "shopping-basket";
          } else if (route.name === "Account") { iconName = "user";
          }

          return (
            <View style={styles.iconsBar}>
              <View style={[ styles.iconContainer, { borderColor: color == activeColor ? color : "#ffffff" }, ]} >
                <FontAwesome name={iconName} size={size} color={color} />
              </View>
            </View>
          );
        },
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: [{ height: "10%" }],
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      {loggedUser.accesstoken !== ""
      ? (
        <Tab.Screen name="Basket" component={BasketStackScreen} options={ 
          productCount ? { tabBarBadge: productCount, tabBarBadgeStyle: styles.tabBarBadgeStyle, } : {}
          }
        />)
      : ( <></> )
      }
      <Tab.Screen name="Account" component={AccountStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="OnBoard" component={OnBoard} />
            <Stack.Screen name="Log" component={LogScreen} />
            <Stack.Screen name="HomeTab" component={TabNavigator} />
            <Stack.Screen name="Address" component={AddressScreen} />
            <Stack.Screen name="AccessDetails" component={AddressDetailsScreen} />
            <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
            <Stack.Screen name="UserCreation" component={UserCreationScreen} />
            <Stack.Screen name="Summary" component={OrderSummaryScreen} />
            <Stack.Screen name="Complete" component={OrderEndScreen} />

            <Stack.Screen name="TabNavigator" component={TabNavigator} />
            
            <Stack.Screen name="UserSignIn" component={UserSignInScreen} />
            <Stack.Screen name="MyAccount" component={MyAccountScreen} />
            <Stack.Screen name="NotificationSent" component={NotificationSentScreen} />
            <Stack.Screen name="NotificationFail" component={NotificationFailScreen} />
            <Stack.Screen name="ContactChoice" component={ContactChoiceScreen} />
            <Stack.Screen name="UnderConstruction" component={UnderConstructionScreen} />
            
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  iconsBar: {
    flex: 1,
    height: 80,
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
  tabBarBadgeStyle: {
    position: "absolute",
    top: 10,
  },
});
