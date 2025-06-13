import { addReceita } from "@/common/asyncStorage/receitas";
import { saveTransactionOnline } from "@/common/firebaseCRUD";
import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/*
  A função formatMoney converte um valor inteiro (em centavos) para uma string
  formatada para exibição. Exemplo: 1500 => "15,00".
  A conversão por 100 ocorre apenas na exibição; o valor em si permanece como inteiro.
*/
const formatMoney = (centValue: number): string => {
  const reais = Math.floor(centValue / 100);
  const centavos = centValue % 100;
  return `${reais},${centavos.toString().padStart(2, "0")}`;
};

export default function Receita_CRUD() {
  const theme = useTheme();
  const navigation = useNavigation();

  // "digits" representa o número digitado em centavos (armazenado como string)
  const [digits, setDigits] = useState("");
  // Estado para distinguir o método de salvamento
  const [savingMethod, setSavingMethod] = useState<"local" | "online" | null>(null);

  // Atualiza os dígitos digitados
  const addDigit = (d: string) => setDigits((prev) => prev + d);
  // Remove o último dígito
  const backspace = () => setDigits((prev) => prev.slice(0, -1));
  // Converte a string em número (em centavos)
  const getCentavos = () => parseInt(digits || "0", 10);

  // Função de salvamento utilizando os valores do Formik e o valor do teclado numérico
  const handleSalvar = async (
    values: { nome: string; desc: string },
    method: "local" | "online"
  ) => {
    if (method === "local") {
      await addReceita({ nome: values.nome, descricao: values.desc, quantia: getCentavos() });
    } else {
      await saveTransactionOnline("receita", {
        nome: values.nome,
        descricao: values.desc,
        quantia: getCentavos(),
      });
    }
    navigation.goBack();
  };

  const txtColor = theme === "dark" ? "#FFF" : "#000";

  return (
    <View style={{ flex: 1 }}>
      <Header isHomeScreen={false} />

      <View style={[styles.container, { backgroundColor: theme === "dark" ? "#222" : "#FFF" }]}>
        <Text style={[styles.label, { color: txtColor }]}>Saldo:</Text>
        {/* Para exibir, usa-se a divisão por 100 na formatação */}
        <Text style={[styles.valor, { color: "#48c9b0" }]}>{formatMoney(getCentavos())}</Text>

        {/* Teclado numérico */}
        <View style={styles.keypad}>
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((d) => (
            <TouchableOpacity key={d} style={styles.key} onPress={() => addDigit(d)}>
              <Text style={styles.keyTxt}>{d}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.key} onPress={backspace}>
            <Text style={styles.keyTxt}>⌫</Text>
          </TouchableOpacity>
        </View>

        {/* Formulário controlado pelo Formik para Nome e Descrição */}
        <Formik
          initialValues={{ nome: "", desc: "" }}
          validate={(values) => {
            const errors: { nome?: string } = {};
            if (!values.nome.trim()) {
              errors.nome = "Nome é obrigatório";
            }
            return errors;
          }}
          onSubmit={(values) => {
            if (savingMethod) {
              handleSalvar(values, savingMethod);
            }
          }}
        >
          {({ handleChange, handleBlur, values, errors, touched, handleSubmit }) => (
            <>
              {/* Envolve o campo Nome e sua mensagem de erro em um contêiner com margem fixa */}
              <View style={styles.fieldContainer}>
                <TextInput
                  style={[styles.input, { marginBottom: 0, color: txtColor }]}
                  placeholder="Nome"
                  placeholderTextColor="#aaa"
                  value={values.nome}
                  onChangeText={handleChange("nome")}
                  onBlur={handleBlur("nome")}
                />
                {errors.nome && touched.nome && (
                  <Text style={styles.errorText}>{errors.nome}</Text>
                )}
              </View>
              <TextInput
                style={[styles.input, { color: txtColor }]}
                placeholder="Descrição"
                placeholderTextColor="#aaa"
                value={values.desc}
                onChangeText={handleChange("desc")}
                onBlur={handleBlur("desc")}
              />

              {/* Botões de salvamento */}
              <TouchableOpacity
                style={styles.btn}
                onPress={() => {
                  setSavingMethod("local");
                  handleSubmit();
                }}
              >
                <Text style={styles.btnTxt}>Salvar Receita Local</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn, { backgroundColor: "#2d8073" }]}
                onPress={() => {
                  setSavingMethod("online");
                  handleSubmit();
                }}
              >
                <Text style={styles.btnTxt}>Salvar Receita Online</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  label: { fontSize: 14, fontStyle: "italic", marginBottom: 8 },
  valor: {
    fontSize: 32,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#48c9b0",
    marginBottom: 20,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  key: {
    width: 60,
    height: 60,
    margin: 5,
    backgroundColor: "#eee",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  keyTxt: { fontSize: 22 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  fieldContainer: {
    marginBottom: 12, // Espaço fixo abaixo do conjunto Nome + erro
  },
  errorText: {
    color: "red",
    fontSize: 14,
  },
  btn: {
    backgroundColor: "#48c9b0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  btnTxt: { color: "#FFF", fontWeight: "bold" },
});