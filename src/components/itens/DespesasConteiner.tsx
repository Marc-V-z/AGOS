import React from "react";
import { StyleSheet, View } from "react-native";
import AddButton from "./AddButton";
import DateButton from "./DateButton";
import GButton from "./GraphcsButton";

export default function DespesasConteiner() {
  return (
    <View style={styles.container}>
      <DateButton onPress={() => alert("Botão Data pressionado!")} />
      <AddButton target="despesa" />
      <GButton onPress={() => alert("Botão Gráfico pressionado!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Faz o contêiner flutuar sobre a tela
    bottom: 20,           // Mantém ele na parte inferior
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },
});