import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface MainButtonProps {
  title: string;
  color?: string;
  onPress: () => void;
}

export default function MainButton({ onPress }: MainButtonProps) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Icon name="calendar" size={30} color="#FFF" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 70, // Botão quadrado
    height: 70,
    borderRadius: 100, // Bordas arredondadas
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00c285",//"#2fa500",
  },
  text: {
    fontWeight: "bold", // Texto em negrito
    color: "#FFF", // Texto branco
    fontSize: 50,
  },
});
// Abre Saldos por data