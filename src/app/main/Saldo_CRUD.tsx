import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import React from "react";
import { Text, View } from "react-native";
//import { addDespesa } from "@/common/asyncStorage/despesas";

export default function Saldo_CRUD() { 
  const theme = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}>
      {/* Passa uma flag para o Header informando que NÃO estamos na Home */}
      <Header isHomeScreen={false} />

      {/* Conteúdo da Settings */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>CRUD de Saldos</Text>
      </View>
    </View>
  );
}

// criar, editar e delettar saldos (ter aquele espaço para conteiner de ata)