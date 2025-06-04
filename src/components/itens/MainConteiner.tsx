import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface NumberContainerProps {
  mainNumber: number;
  leftNumber: number;
  rightNumber: number;
}

export default function NumberContainer({ mainNumber, leftNumber, rightNumber }: NumberContainerProps) {
  return (
    <View style={styles.container}>
      {/* Número grande e centralizado */}
      <Text style={styles.mainNumber}>{mainNumber}</Text>

      <View style={styles.bottomNumbers}>
        {/* Número pequeno à esquerda */}
        <Text style={styles.leftNumber}>{leftNumber}</Text>

        {/* Número pequeno à direita */}
        <Text style={styles.rightNumber}>{rightNumber}</Text>
      </View>
    </View>
  );
}

const { width } = Dimensions.get("window"); // Obtém a largura total da tela

const styles = StyleSheet.create({
  container: {
    width: width, // Ocupa toda a largura da tela
    height: 160, // Aumenta a altura
    backgroundColor: "#000", // Fundo preto
    justifyContent: "center", // Centraliza elementos verticalmente
    alignItems: "center", // Centraliza horizontalmente
  },
  mainNumber: {
    fontSize: 50, // Número grande no centro
    color: "#FFF", // Branco
    fontWeight: "bold",
  },
  bottomNumbers: {
    flexDirection: "row", // Organiza os números laterais em linha
    width: "100%", // Ocupa toda a largura
    position: "absolute",
    bottom: 10, // Posiciona na parte inferior do contêiner
    paddingHorizontal: 20, // Espaçamento interno
    justifyContent: "space-between", // Alinha os números nas extremidades
  },
  leftNumber: {
    fontSize: 18, // Número pequeno à esquerda
    color: "#FFF",
  },
  rightNumber: {
    fontSize: 18, // Número pequeno à direita
    color: "#FFF",
  },
});