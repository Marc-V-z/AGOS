import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header"; // Reutilizando o cabeçalho

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Cabeçalho reaproveitado */}
      <Header />

      {/* Conteúdo da tela abaixo do cabeçalho */}
      <View style={styles.content}>
        <Text style={styles.text}>Bem-vindo à Tela Inicial!</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // Garante que o conteúdo ocupe o espaço abaixo do cabeçalho
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#333",
  },
});

export default HomeScreen;