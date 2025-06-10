// Components/itens/AddButton.tsx
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface AddButtonProps {
  target: "receita" | "despesa";
}

export default function AddButton({ target }: AddButtonProps) {
  const router = useRouter();

  // Define os caminhos conforme o target:
  const targetPath =
    target === "receita" ? "/main/Receita_CRUD" : "/main/Despesa_CRUD";

  return (
    <TouchableOpacity style={styles.button} onPress={() => router.push(targetPath)}>
      <Text style={styles.text}>+</Text>
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
    backgroundColor: "#00ce8c",
    margin: 15,
  },
  text: {
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 50,
  },
});