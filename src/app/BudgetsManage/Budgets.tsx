import { Despesa } from "@/common/asyncStorage/despesas";
import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function Budgets() {
  const theme = useTheme();
  const [despesas, setDespesas] = useState<Despesa[]>([]);

  useEffect(() => {
    const fetchDespesas = async () => {
      const list = (await loadData("app_budget_despesas_list")) || [];
      setDespesas(list);
    };

    fetchDespesas();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme === "dark" ? "#222" : "#FFF" }}>
      <Header isHomeScreen={false} />
      <View style={{ flex: 1, padding: 16 }}>
        <Text style={{ fontSize: 20, marginBottom: 16 }}>Seus Orçamentos:</Text>
        <FlatList
          data={despesas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>
                {item.nome} – {item.descricao || "Sem descrição"} – {item.quantia}
              </Text>
            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhuma despesa encontrada</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});