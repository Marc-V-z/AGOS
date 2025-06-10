// src/screens/Settings.tsx
import { getDataSourcePreference, setDataSourcePreference } from "@/common/preferences";
import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  // Função para apagar todas as receitas
  const clearReceitas = async () => {
    try {
      await AsyncStorage.removeItem("app_budget_receitas_list");
      console.log("Todas as receitas foram apagadas!");
    } catch (error) {
      console.error("Erro ao apagar receitas:", error);
    }
  };

  // Função para apagar todas as despesas
  const clearDespesas = async () => {
    try {
      await AsyncStorage.removeItem("app_budget_despesas_list");
      console.log("Todas as despesas foram apagadas!");
    } catch (error) {
      console.error("Erro ao apagar despesas:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#222" : "#FFF" },
      ]}
    >
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

        {/* Botões para apagar todas as receitas e despesas em uma mesma linha */}
        <View style={styles.clearButtonsContainer}>
          <TouchableOpacity style={styles.button} onPress={clearReceitas}>
            <Text style={styles.buttonText}>Apagar receitas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={clearDespesas}>
            <Text style={styles.buttonText}>Apagar despesas</Text>
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
  clearButtonsContainer: {
    marginTop: 30,
    width: "100%",
    flexDirection: "row",            // Disposição na mesma linha
    justifyContent: "center",        // Centraliza os botões horizontalmente
    alignItems: "center",
  },
  button: {
    backgroundColor: "#e74c3c",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    flex: 1,                         // Faz os botões ocuparem espaço igual
    maxWidth: 200,                   // Define uma largura máxima para cada botão
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
});