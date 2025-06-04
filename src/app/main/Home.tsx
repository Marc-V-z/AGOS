import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

export default function Home() {
    const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}>
      {/* Passa uma flag para o Header informando que estamos na Home */}
      <Header isHomeScreen={true} />

      {/* Conteúdo da Home */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Bem-vindo à Tela Inicial!</Text>
      </View>
    </View>
  );
}