// src/screens/Settings.tsx
import { getDataSourcePreference, setDataSourcePreference } from "@/common/preferences";
import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Settings(): JSX.Element {
  const theme = useTheme();
  // true representa "online", false representa "offline"
  const [isOnline, setIsOnline] = useState<boolean>(false);

  // Carrega a preferência do AsyncStorage ao iniciar
  useEffect(() => {
    const loadPreference = async () => {
      const pref = await getDataSourcePreference();
      setIsOnline(pref === "online");
    };
    loadPreference();
  }, []);

  // Função para alternar e salvar a preferência
  const toggleDataSource = async () => {
    const newValue = !isOnline;
    setIsOnline(newValue);
    await setDataSourcePreference(newValue ? "online" : "offline");
  };

  return (
    <View style={[styles.container, { backgroundColor: theme === "dark" ? "#222" : "#FFF" }]}>
      <Header isHomeScreen={false} />

      <View style={styles.content}>
        <Text style={[styles.title, { color: theme === "dark" ? "#FFF" : "#000" }]}>
          Configurações
        </Text>
        <View style={styles.preferenceContainer}>
          <Text style={[styles.preferenceLabel, { color: theme === "dark" ? "#FFF" : "#000" }]}>
            Exibir dados:
          </Text>
          <TouchableOpacity onPress={toggleDataSource}>
            <Text style={styles.preferenceValue}>
              {isOnline ? "Online" : "Offline"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  preferenceContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  preferenceLabel: {
    fontSize: 16,
  },
  preferenceValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#48c9b0",
  },
});