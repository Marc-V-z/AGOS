import { addReceita } from "@/common/asyncStorage/receitas";
import { saveTransactionOnline } from "@/common/firebaseCRUD";
import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

/* helpers de valor ---------------------------------------------------- */
const fmt = (c: string) => {
  const p = (c === "" ? "0" : c).padStart(3, "0");
  return `${p.slice(0, -2)},${p.slice(-2)}`;
};

export default function Receita_CRUD() {
  const theme = useTheme();
  const nav   = useNavigation();
  const [digits, setDigits] = useState("");           // centavos   (string)
  const [nome,  setNome]   = useState("");
  const [desc,  setDesc]   = useState("");

  /* keypad ------------------------------------------------------------- */
  const addDigit = (d: string) => setDigits(p => (p + d).replace(/^0+/,""));
  const backspace = () => setDigits(p => p.slice(0, -1));
  const cent   = () => parseInt(digits || "0", 10);
  const valueR = () => cent() / 100;

  /* salvar ------------------------------------------------------------- */
  const salvarLocal = async () => {
    await addReceita({ nome, descricao: desc, quantia: valueR() });
    nav.goBack();                        // <-- volta
  };

  const salvarOnline = async () => {
    await saveTransactionOnline("receita", { nome, descricao: desc, quantia: valueR() });
    nav.goBack();
  };

  const txt = theme === "dark" ? "#FFF" : "#000";

  /* UI ----------------------------------------------------------------- */
  return (
    <View style={{ flex: 1 }}>
      <Header isHomeScreen={false} />

      <View style={[styles.screen, { backgroundColor: theme === "dark" ? "#222" : "#FFF" }]}>
        <Text style={[styles.label, { color: txt }]}>Saldo:</Text>
        <Text style={[styles.valor, { color: "#48c9b0" }]}>{fmt(digits)}</Text>

        {/* keypad */}
        <View style={styles.keypad}>
          {["1","2","3","4","5","6","7","8","9","0"].map(d => (
            <TouchableOpacity key={d} style={styles.key} onPress={() => addDigit(d)}>
              <Text style={styles.keyTxt}>{d}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.key} onPress={backspace}>
            <Text style={styles.keyTxt}>⌫</Text>
          </TouchableOpacity>
        </View>

        {/* inputs */}
        <TextInput
          style={[styles.input, { color: txt }]}
          placeholder="Nome" placeholderTextColor="#aaa"
          value={nome} onChangeText={setNome}
        />
        <TextInput
          style={[styles.input, { color: txt }]}
          placeholder="Descrição" placeholderTextColor="#aaa"
          value={desc} onChangeText={setDesc}
        />

        {/* botões */}
        <TouchableOpacity style={styles.btn} onPress={salvarLocal}>
          <Text style={styles.btnTxt}>Salvar Receita Local</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, { backgroundColor: "#2d8073" }]} onPress={salvarOnline}>
          <Text style={styles.btnTxt}>Salvar Receita Online</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen:{ flex:1, padding:16 },
  label :{ fontSize:14, fontStyle:"italic", marginBottom:8 },
  valor :{ fontSize:32, textAlign:"center", borderBottomWidth:1,
           borderBottomColor:"#48c9b0", marginBottom:20 },
  keypad:{ flexDirection:"row", flexWrap:"wrap", justifyContent:"center", marginBottom:20 },
  key   :{ width:60, height:60, margin:5, backgroundColor:"#eee", borderRadius:8,
           justifyContent:"center", alignItems:"center" },
  keyTxt:{ fontSize:22 },
  input :{ borderWidth:1, borderColor:"#ccc", borderRadius:6, padding:10,
           marginBottom:12, fontSize:16 },
  btn   :{ backgroundColor:"#48c9b0", padding:15, borderRadius:8,
           alignItems:"center", marginTop:10 },
  btnTxt:{ color:"#FFF", fontWeight:"bold" },
});