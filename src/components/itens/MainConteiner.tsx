import { formatCurrency } from "@/common/MoneyConvert"; // Importa a função de conversão
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface NumberContainerProps {
  mainNumber: number;
  leftNumber: number;
  rightNumber: number;
}

export default function NumberContainer({ mainNumber, leftNumber, rightNumber }: NumberContainerProps) {
  return (
    // Define o background dinamicamente:
    // Se mainNumber for 0 ou maior, fundo verde escuro (#006400);
    // caso contrário, fundo vermelho escuro (#8B0000)
    <View style={[styles.container, { backgroundColor: mainNumber >= 0 ? "#006400" : "#8B0000" }]}>
      {/* Número grande e centralizado - Convertido para reais */}
      <Text style={styles.mainNumber}>{formatCurrency(mainNumber)}</Text>

      <View style={styles.bottomNumbers}>
        {/* Número pequeno à esquerda - Convertido para reais */}
        <Text style={styles.leftNumber}>{formatCurrency(leftNumber)}</Text>

        {/* Número pequeno à direita - Convertido para reais */}
        <Text style={styles.rightNumber}>{formatCurrency(rightNumber)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",        // Ocupa toda a largura da tela
    height: 160,          // Altura maior
    // O background é definido dinamicamente a partir da propriedade passada (mainNumber)
    justifyContent: "center",
    alignItems: "center",
  },
  mainNumber: {
    fontSize: 50,         // Número grande no centro
    color: "#FFF",        // Branco
    fontWeight: "bold",
  },
  bottomNumbers: {
    flexDirection: "row", // Organiza os números laterais em linha
    width: "100%",        // Ocupa toda a largura
    position: "absolute",
    bottom: 10,           // Posiciona na parte inferior do contêiner
    paddingHorizontal: 20,// Espaçamento interno
    justifyContent: "space-between", // Alinha os números nas extremidades
  },
  leftNumber: {
    fontSize: 18,         // Número pequeno à esquerda
    color: "#FFF",
  },
  rightNumber: {
    fontSize: 18,         // Mesmo tamanho do número à esquerda
    color: "#FFF",
  },
});