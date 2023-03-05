import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';

import { useEffect, useState } from 'react';

export default function AddressScreen({ navigation }) {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>retour</Text>
      <Text>Adress de livraison</Text>


    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});