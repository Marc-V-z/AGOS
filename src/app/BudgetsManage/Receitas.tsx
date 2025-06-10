import { Receita } from "@/common/asyncStorage/receitas";
import { loadData } from "@/common/asyncStorage/storage";
import MainConteiner from "@/components/itens/MainConteiner";
import { useTheme } from "@/constants/ThemeContext";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Receitas() {
  const theme = useTheme();
  const [receitas, setReceitas] = useState<Receita[]>([]);

  useEffect(() => {
    const fetchReceitas = async () => {
      const list = (await loadData("app_budget_receitas_list")) || [];
      setReceitas(list);
    };
    fetchReceitas();
  }, []);

  const totalReceita = receitas.reduce(
    (acum, item) => acum + Number(item.quantia),
    0
  );
  const totalDespesa = 0;
  const total = totalReceita + totalDespesa;

  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}>
      <MainConteiner
        mainNumber={total}
        leftNumber={0}
        rightNumber={totalReceita}
      />
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
    color: "#48c9b0"
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});