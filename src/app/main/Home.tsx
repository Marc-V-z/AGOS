import Header from "@/components/itens/Header";
import MainButton from "@/components/itens/MainButtons";
import MainConteiner from "@/components/itens/MainConteiner";
import { useTheme } from "@/constants/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  const theme = useTheme();
  const navigation = useNavigation();

  const receita = 50050
  const despesa = -25000
  const total = receita + despesa

  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}>
      {/* Passa uma flag para o Header informando que estamos na Home */}
      <Header isHomeScreen={true} />

      {/* Conteúdo da Home */}
        <MainConteiner mainNumber={total} leftNumber={receita} rightNumber={despesa} />

      <View style={styles.container}>
        <MainButton title="Receitas" color="#2fa500" onPress={() => alert("Botão pressionado!")} />
        <MainButton title="Orçamentos" color="#9c9e70" onPress={() => navigation.navigate("BudgetsManage")} />
        <MainButton title="Despesas" color="#E74C3C" onPress={() => alert("Botão pressionado!")} />
      </View>
      

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20 }}>Bem-vindo à Tela Inicial!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Alinha os botões horizontalmente
    width: "100%", // Faz os botões ocuparem toda a largura da tela
    justifyContent: "space-between", // Espaço igual entre os botões
    alignItems: "center", // Centraliza os botões verticalmente
    //paddingHorizontal: 20, // Margem lateral
    paddingVertical: 10, // Margem vertical
  },
});