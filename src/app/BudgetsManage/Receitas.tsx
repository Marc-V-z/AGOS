import { Receita } from "@/common/asyncStorage/receitas";
import { loadData } from "@/common/asyncStorage/storage";
import { getDataSourcePreference } from "@/common/preferences";
import MainConteiner from "@/components/itens/MainConteiner";
import { firestore } from "@/config/firebaseConfig";
import { useTheme } from "@/constants/ThemeContext";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Receitas(): JSX.Element {
  const theme = useTheme();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Carrega os dados salvos localmente
  const fetchLocalReceitas = async (): Promise<Receita[]> => {
    try {
      const list = (await loadData("app_budget_receitas_list")) || [];
      return list as Receita[];
    } catch (error) {
      console.error("Erro ao carregar receitas do AsyncStorage:", error);
      return [];
    }
  };

  // Carrega os dados do Firestore
  const fetchFirestoreReceitas = async (): Promise<Receita[]> => {
    try {
      const receitaCol = collection(firestore, "receitas");
      const snapshot = await getDocs(receitaCol);
      const list = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          nome: data.nome,
          descricao: data.descricao,
          quantia: data.quantia,
        } as Receita;
      });
      return list;
    } catch (error) {
      console.error("Erro ao buscar receitas do Firestore:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchReceitas = async () => {
      // Lê a preferência do usuário: "online" ou "offline"
      const pref = await getDataSourcePreference();
      let data: Receita[] = [];

      // Se a preferência for "online", carrega os dados do Firestore; caso contrário, carrega os dados locais
      if (pref === "online") {
        data = await fetchFirestoreReceitas();
      } else {
        data = await fetchLocalReceitas();
      }
      setReceitas(data);
      setIsLoading(false);
    };

    fetchReceitas();
  }, []);

  const totalReceita = receitas.reduce(
    (acum, item) => acum + Number(item.quantia),
    0
  );
  const totalDespesa = 0;
  const total = totalReceita + totalDespesa;

  if (isLoading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center", backgroundColor: theme === "dark" ? "#222" : "#FFF" },
        ]}
      >
        <ActivityIndicator size="large" color="#48c9b0" />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme === "dark" ? "#222" : "#FFF" }]}>
      <MainConteiner mainNumber={total} leftNumber={0} rightNumber={totalReceita} />
      <ScrollView contentContainerStyle={styles.listContainer}>
        {receitas.length > 0 ? (
          receitas.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>
                {item.nome} – {item.descricao || "Sem descrição"} – {item.quantia}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhuma receita encontrada</Text>
        )}
      </ScrollView>
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