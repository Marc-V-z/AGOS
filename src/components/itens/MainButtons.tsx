import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface MainButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
}

export default function MainButton({ title, color = "#3498db", onPress }: MainButtonProps) {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 120, // Botão quadrado
    height: 120,
    borderRadius: 20, // Bordas arredondadas
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  text: {
    fontWeight: "bold", // Texto em negrito
    color: "#FFF", // Texto branco
    fontSize: 16,
  },
});

// Receita, Despesa e Orçamento