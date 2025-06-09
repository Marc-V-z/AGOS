import ManageConteiner from "@/components/itens/ManageConteiner";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

interface LayoutProps {
  children: React.ReactNode;
}

export default function BudgetLayout({ children }: LayoutProps) {
  return (
    <View style={styles.container}>
      {/* Configuração de navegação */}
      <Stack>
        <Stack.Screen name="Budgets" options={{ headerShown: false }} />
      </Stack>

      {/* Renderiza os filhos da tela */}
      {children}

      {/* Contêiner de botões */}
      <ManageConteiner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
});