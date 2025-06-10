import React from "react";
import { StyleSheet, View } from "react-native";

import AddButton from "./AddButton";
import DateButton from "./DateButton";
import GButton from "./GraphcsButton";

export default function ManageConteiner() {
  return (
    <View style={styles.container}>
        <DateButton onPress={() => alert("Botão Adicionar pressionado!")} />
        <AddButton/>
        <GButton onPress={() => alert("Botão Adicionar pressionado!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Faz o contêiner flutuar sobre a tela
    bottom: 20, // Mantém ele na parte inferior
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: 20,
  },
});