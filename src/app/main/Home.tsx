import { loadData, saveData } from "@/common/asyncStorage/storage";
import Graphics from "@/components/itens/ColumnGraphics";
import Header from "@/components/itens/Header";
import MainButton from "@/components/itens/MainButtons";
import MainConteiner from "@/components/itens/MainConteiner";
import { useTheme } from "@/constants/ThemeContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";


//import { Link } from "expo-router";

export default function Home() {
 useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.clear();
        console.log("AsyncStorage limpo na inicialização!");
      } catch (error) {
        console.error("Erro ao limpar o AsyncStorage no startup:", error);
      }
    })();
  }, []);



  // Estados para Despesas
  const [Despesas, setDespesas] = useState([]); // Armazena todos os objetos de despesa
  const [despesa, setDespesa] = useState(0);     // Armazena apenas a quantia da última despesa
  
  // Estados para Receitas
  const [Receitas, setReceitas] = useState([]);   // Armazena todas as receitas (objetos)
  const [receita, setReceita] = useState(0);        // Armazena apenas a quantia da última receita

  // Carrega as despesas salvas
  useEffect(() => {
    const fetchDespesas = async () => {
      const data = await loadData("app_budget_despesas_list") || [];
      if (Array.isArray(data) && data.length > 0) {
        setDespesas(data);
        setDespesa(Number(data[data.length - 1].quantia));
      } else {
        setDespesas([]);
        setDespesa(0);
      }
    };
    fetchDespesas();
  }, []);

  // Carrega as receitas salvas
  useEffect(() => {
    const fetchReceitas = async () => {
      const data = await loadData("app_budget_receitas_list") || [];
      if (Array.isArray(data) && data.length > 0) {
        setReceitas(data);
        setReceita(Number(data[data.length - 1].quantia));
      } else {
        setReceitas([]);
        setReceita(0);
      }
    };
    fetchReceitas();
  }, []);


  const theme = useTheme();
  const navigation = useNavigation();
  const router = useRouter();

  //const receita = 50050
  //const despesa = -25000
  const total = receita + despesa;
  //const Receitas = [50050, 120035, 80080, 180050, 100050, 150000, 20050, 92010, 50050];
  //const Despesas = [80055, 33000, 67300, 2000, 100000, 23000, 11150, 92020, 25000];



  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}>
      {/* Passa uma flag para o Header informando que estamos na Home */}
      <Header isHomeScreen={true} />

      {/* Conteúdo da Home */}
        <MainConteiner mainNumber={total} leftNumber={receita} rightNumber={despesa} />

      <View style={styles.container}>
        <MainButton title="Receitas" color="#2fa500" onPress={() => router.push("/BudgetsManage/Receitas")} />
        <MainButton title="Orçamentos" color="#9c9e70" onPress={() => router.push("/BudgetsManage/Budgets")} /> 
        <MainButton title="Despesas" color="#E74C3C" onPress={() => router.push("/BudgetsManage/Despesas")} />
      </View>


      
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#3498db",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
        onPress={async () => {
          try {
            const novaDespesa = { id: uuidv4(), nome: "Nova Despesa", descricao: "Automática", quantia: -100 };

            setDespesas((prevDespesas) => {
              console.log("Estado anterior despesas:", prevDespesas);
              const novasDespesas = [...prevDespesas, novaDespesa];
              saveData("app_budget_despesas_list", novasDespesas);
              console.log("Novo estado despesas:", novasDespesas);
              const somaDespesas = novasDespesas.reduce(
                (acum, item) => acum + Number(item.quantia),
                0
              );
              setDespesa(somaDespesas);

              return novasDespesas;
            });

            console.log("✅ Despesa adicionada:", novaDespesa);
          } catch (error) {
            console.error("Erro ao adicionar despesa:", error);
          }
        }}
      >
        <Text style={{ color: "#fff", fontSize: 30 }}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#3498db",
          justifyContent: "center",
          alignItems: "center",
          margin: 5,
        }}
        onPress={async () => {
          try {
            const novaReceita = { 
              id: uuidv4(), 
              nome: "Nova Receita", 
              descricao: "Automática", 
              quantia: 1500 
            };

            setReceitas((prevReceitas) => {
              console.log("Estado anterior receitas:", prevReceitas);
              const novasReceitas = [...prevReceitas, novaReceita];
              // Salva as receitas usando a chave correta
              saveData("app_budget_receitas_list", novasReceitas);
              console.log("Novo estado receitas:", novasReceitas);
              // Atualiza o total das receitas
              const somaReceitas = novasReceitas.reduce(
                (acum, item) => acum + Number(item.quantia),
                0
              );
              setReceita(somaReceitas);
              return novasReceitas;
            });
            console.log("✅ Receita adicionada:", novaReceita);
          } catch (error) {
            console.error("Erro ao adicionar receita:", error);
          }
        }}
      >
        <Text style={{ color: "#fff", fontSize: 30 }}>+</Text>
      </TouchableOpacity>

      

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