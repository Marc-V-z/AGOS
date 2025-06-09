import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";


interface MainButtonProps {
  onPress?: () => void;
}

export default function MainButton({ onPress }: MainButtonProps) {
  const navigation = useNavigation();
  const router = useRouter();


  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => router.push("/main/Saldo_CRUD")}

      //onPress={onPress ? onPress : () => navigation.navigate("Saldo_CRUD")}
    >
      <Text style={styles.text}>{"+"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 90,
    height: 90,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00ce8c", //"#2fa500",
    margin: 15,
  },
  text: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 50,
  },
});
// Adiciona Saldo