import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
//import Icon from "react-native-vector-icons/MaterialIcons";

const Header = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Obtém a tela atual

  // Define ícone e ação do botão esquerdo
  const LeftButton = () => {
    if (route.name === "Home") {
      return (
        <TouchableOpacity onPress={() => navigation.navigate("Configurações")}>
          <MaterialIcons name="settings" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      );
    }
  };

  // Define a função do botão da lupa com `switch` (match case)
  const handleSearchPress = () => {
    switch (route.name) {
      case "Home":
        console.log("Abrindo pesquisa geral...");
        break;
      case "Orçamentos":
        console.log("Buscando orçamentos");
        break;
      case "Data":
        console.log("Buscando por data");
        break;
      default:
        console.log("Pesquisa padrão ativada...");
        break;
    }
  };

  return (
    <View style={styles.header}>
      {/* Botão esquerdo */}
      <LeftButton />

      {/* Imagem central fixa */}
      <Image source={require("../assets/imgs/AGOS.png")} style={styles.logo} />

      {/* Botão direito - Lupa */}
      <TouchableOpacity onPress={handleSearchPress}>
        <MaterialIcons name="search" size={30} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#005A4E", // Verde azulado escuro
  },
  logo: {
    width: 50,
    height: 50,
  },
});

export default Header;