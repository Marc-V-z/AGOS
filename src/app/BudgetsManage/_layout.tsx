// app/BudgetsManage/_layout.tsx
import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

interface LayoutProps {
  children: React.ReactNode;
}

export default function BudgetLayout({ children }: LayoutProps) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#222" : "#FFF" },
      ]}
    >
      {/* Cabeçalho fixo - NÃO muda com o tema */}
      <Header isHomeScreen={false} />

      {/* Fundo da página - Segue o tema do usuário */}
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: theme === "dark" ? "#222" : "#FFF",
            },
          }}
        />
        {children}
      </View>

      {/* <ManageConteiner />  */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});