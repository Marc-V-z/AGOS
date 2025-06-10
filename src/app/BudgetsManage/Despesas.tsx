import { Despesa } from "@/common/asyncStorage/despesas";
import { loadData } from "@/common/asyncStorage/storage";
import { getDataSourcePreference } from "@/common/preferences";
import DespesasConteiner from "@/components/itens/DespesasConteiner";
import MainConteiner from "@/components/itens/MainConteiner";
import { firestore } from "@/config/firebaseConfig";
import { useTheme } from "@/constants/ThemeContext";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Função de formatação: divide o valor (em centavos) por 100 e formata com vírgula para exibição
const formatMoney = (centValue: number): string => {
  const absValue = Math.abs(centValue);
  const reais = Math.floor(absValue / 100);
  const centavos = absValue % 100;
  return (centValue < 0 ? "-" : "") + `${reais},${centavos.toString().padStart(2, "0")}`;
};

export default function Despesas(): JSX.Element {
  const theme = useTheme();
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Função para carregar despesas salvas localmente via AsyncStorage
  const fetchLocalDespesas = async (): Promise<Despesa[]> => {
    try {
      const list = (await loadData("app_budget_despesas_list")) || [];
      return list as Despesa[];
    } catch (error) {
      console.error("Erro ao carregar despesas do AsyncStorage:", error);
      return [];
    }
  };

  // Função para carregar despesas do Firestore (dados online)
  const fetchFirestoreDespesas = async (): Promise<Despesa[]> => {
    try {
      const despesaCol = collection(firestore, "despesas");
      const snapshot = await getDocs(despesaCol);
      const list = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          nome: data.nome,
          descricao: data.descricao,
          quantia: data.quantia,
        } as Despesa;
      });
      return list;
    } catch (error) {
      console.error("Erro ao buscar despesas do Firestore:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchDespesas = async () => {
      // Lê a preferência do usuário: "online" ou "offline"
      const pref = await getDataSourcePreference();
      let data: Despesa[] = [];
      
      if (pref === "online") {
        data = await fetchFirestoreDespesas();
      } else {
        data = await fetchLocalDespesas();
      }
      
      setDespesas(data);
      setIsLoading(false);
    };

    fetchDespesas();
  }, []);

  // Calcula o total de despesas (valor em centavos)
  const totalDespesa = despesas.reduce(
    (acum, item) => acum + Number(item.quantia),
    0
  );
  const totalReceita = 0;
  const total = totalReceita + totalDespesa;

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme === "dark" ? "#222" : "#FFF",
          },
        ]}
      >
        <ActivityIndicator size="large" color="#48c9b0" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme === "dark" ? "#222" : "#FFF" }]}>
      <MainConteiner
        mainNumber={total}
        leftNumber={totalReceita}
        rightNumber={totalDespesa}
      />
      <ScrollView contentContainerStyle={styles.listContainer}>
        {despesas.length > 0 ? (
          despesas.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>
                {item.nome} – {item.descricao || "Sem descrição"} –{" "}
                {formatMoney(item.quantia)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhuma despesa encontrada</Text>
        )}
      </ScrollView>
      {/* Adiciona o contêiner exclusivo para Despesas */}
      <DespesasConteiner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 150,
  },
  item: {
    width: "100%",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    color: "#48c9b0",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});