import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack initialRouteName="Home">
      <Stack.Screen name="Home" options={{ headerShown: false }} />
      <Stack.Screen name="Settings" options={{ headerShown: false }} />
      <Stack.Screen name="Saldo_CRUD" options={{ headerShown: false }} />
    </Stack>
  );
}