import { Despesa } from "@/common/asyncStorage/despesas";
import { loadData } from "@/common/asyncStorage/storage";
import MainConteiner from "@/components/itens/MainConteiner";
import { useTheme } from "@/constants/ThemeContext";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Budgets() {
  const theme = useTheme();
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  // Carrega as despesas do AsyncStorage
  useEffect(() => {
    const fetchDespesas = async () => {
      const list = (await loadData("app_budget_despesas_list")) || [];
      setDespesas(list);
    };
    fetchDespesas();
  }, []);

  // Soma de todas as despesas
  const totalDespesa = despesas.reduce(
    (acum, item) => acum + Number(item.quantia),
    0
  );
  const totalReceita = 0;
  const total = totalReceita + totalDespesa;

  return (
    <View
      style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}
    >
      {/* Aqui o seu MainConteiner */}
      <MainConteiner
        mainNumber={total}
        leftNumber={totalReceita}
        rightNumber={totalDespesa}
      />

      {/* Container rolável para as despesas */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {despesas.length > 0 ? (
          despesas.map((item) => (
            <View key={item.id} style={styles.item}>
              <Text style={styles.itemText}>
                {item.nome} – {item.descricao || "Sem descrição"} –{" "}
                {item.quantia}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>Nenhuma despesa encontrada</Text>
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