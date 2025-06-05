import { ThemeProvider, useTheme } from "@/constants/ThemeContext";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function GlobalLayout() {
  return (
    <ThemeProvider>
      <ThemedLayout />
    </ThemeProvider>
  );
}

function ThemedLayout() {
  const theme = useTheme(); // Obtém o tema do usuário

  return (
    <View style={{ flex: 1 }}>
      {/* Cabeçalho fixo - NÃO muda com o tema */}
      <View style={{ height: 35, backgroundColor: "#000" }} />

      {/* Fundo da página - Segue o tema do usuário */}
      <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}>
        <Stack screenOptions={{ animation: "fade", contentStyle: { backgroundColor: theme === "dark" ? "#222" : "#FFF" } }}>
          <Stack.Screen name="main" options={{ headerShown: false }} />
          <Stack.Screen name="BudgetsManage" options={{ headerShown: false }} />
            
        </Stack>
      </View>
    </View>
  );
}