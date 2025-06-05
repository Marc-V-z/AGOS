import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import React from "react";
import { Text, View } from "react-native";

export default function Budgets() {
    const theme = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}>
      <Header isHomeScreen={false} />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Seus Orçamentos:</Text>
      </View>
    </View>
  );
}