import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const Header = ({ isHomeScreen }) => {
  const navigation = useNavigation();
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* Botão esquerdo: engrenagem na Home, seta nas outras telas */}
      <TouchableOpacity
        onPress={() => {
          if (isHomeScreen) {
            router.push("/main/Settings");
            //navigation.navigate("Settings");
          } else {
            router.back()
            //navigation.goBack();
          }
        }}
      >
        <MaterialIcons
          name={isHomeScreen ? "settings" : "arrow-back"}
          size={30}
          color="#FFFFFF"
        />
      </TouchableOpacity>

      {/* Logo central fixa */}
      <Image
        source={require("../../assets/images/invertedAGOS.png")}
        style={styles.logo}
      />

      {/* Botão direito - Lupa */}
      <TouchableOpacity onPress={() => console.log("Pesquisa ativada")}>
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
    height: 65,
  },
  logo: {
    width: 200,
    height: 50,
    transform: [{ scale: 0.9 }], 
    resizeMode: "contain",
  },
});

export default Header;