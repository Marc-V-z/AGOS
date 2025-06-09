import Graphics from "@/components/itens/ColumnGraphics";
import Header from "@/components/itens/Header";
import MainButton from "@/components/itens/MainButtons";
import MainConteiner from "@/components/itens/MainConteiner";
import { useTheme } from "@/constants/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";


//import { Link } from "expo-router";

export default function Home() {
  const theme = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  const receita = 50050
  const despesa = -25000
  const total = receita + despesa
  const Receitas = [50050, 120035, 80080, 180050, 100050, 150000, 20050, 92010, 50050];
  const Despesas = [80055, 33000, 67300, 2000, 100000, 23000, 11150, 92020, 25000];


  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}>
      {/* Passa uma flag para o Header informando que estamos na Home */}
      <Header isHomeScreen={true} />

      {/* Conteúdo da Home */}
        <MainConteiner mainNumber={total} leftNumber={receita} rightNumber={despesa} />

      <View style={styles.container}>
        <MainButton title="Receitas" color="#2fa500" onPress={() => alert("Botão pressionado!")} />
        <MainButton title="Orçamentos" color="#9c9e70" onPress={() => router.push("/BudgetsManage/Budgets")} /> 
        <MainButton title="Despesas" color="#E74C3C" onPress={() => alert("Botão pressionado!")} />
      </View>


      {/*
      <TouchableOpacity
        style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: "#3498db", justifyContent: "center", alignItems: "center" }}
        onPress={async () => {
          try {
            const despesas = (await loadData("app_budget_despesas_list")) || [];
            const novaDespesa = { id: uuidv4(), nome: "Nova Despesa", descricao: "Automática", quantia: -100 };
            despesas.push(novaDespesa);
            await saveData("app_budget_despesas_list", despesas);
            console.log("✅ Despesa adicionada:", novaDespesa);
          } catch (error) {
            console.error("Erro ao adicionar despesa:", error);
          }
        }}
      >
        <Text style={{ color: "#fff", fontSize: 30 }}>+</Text>
      </TouchableOpacity> */}
      

      <Graphics data={Receitas} title="Receitas"/>;
      <Graphics data={Despesas} title="Despesas"/>;

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