import Header from "@/components/itens/Header";
import { useTheme } from "@/constants/ThemeContext";
import { Formik } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Yup from "yup";
// Função para salvar dados localmente (deve estar implementada no seu projeto)
import { saveData } from "@/common/asyncStorage/storage";
// Função para salvar dados online no Firebase
import { saveTransactionOnline } from "@/common/firebaseCRUD";

interface SaldoCRUDProps {
  transactionType: "receita" | "despesa";
}

const SaldoCRUD: React.FC<SaldoCRUDProps> = ({ transactionType }) => {
  const theme = useTheme();

  // Estado que guarda o valor digitado em centavos
  const [valorCentavos, setValorCentavos] = useState<number>(0);

  /**
   * Adiciona um dígito à direita do valor atual.
   * Se o usuário digitar, por exemplo, "5", o novo valor será: valorAnterior * 10 + 5.
   */
  const handleDigitInput = (digit: string) => {
    if (!/^\d$/.test(digit)) return; // Garante que apenas dígitos de 0 a 9 sejam processados.
    const novoValor = valorCentavos * 10 + Number(digit);
    setValorCentavos(novoValor);
  };

  /**
   * Remove o último dígito do valor (operador de backspace).
   */
  const handleBackspace = () => {
    const novoValor = Math.floor(valorCentavos / 10);
    setValorCentavos(novoValor);
  };

  /**
   * Formata o valor (em centavos) para exibição no formato "reais,centavos".
   * Ex.: 12345 → "123,45"
   */
  const formatarValor = (centavos: number): string => {
    const reais = Math.floor(centavos / 100);
    const centavosStr = String(centavos % 100).padStart(2, "0");
    return `${reais},${centavosStr}`;
  };

  // Esquema de validação usando Yup para validar os campos Nome e Descrição
  const validationSchema = Yup.object().shape({
    nome: Yup.string().required("O nome é obrigatório"),
    descricao: Yup.string(),
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "dark" ? "#222" : "#FFF" },
      ]}
    >
      {/* Cabeçalho */}
      <Header isHomeScreen={false} />

      {/* Texto "Saldo:" logo abaixo do cabeçalho */}
      <View style={styles.topContainer}>
        <Text style={[styles.saldoLabel, { color: theme === "dark" ? "#FFF" : "#000" }]}>
          Saldo:
        </Text>
      </View>

      {/* Campo de Valor — exibido como um TextInput não editável */}
      <TextInput
        style={[styles.valorInput, { color: "#48c9b0" }]}
        value={formatarValor(valorCentavos)}
        editable={false}
        pointerEvents="none" // Evita que o usuário edite diretamente o valor
      />

      {/* Teclado Personalizado para Digitar os Números */}
      <View style={styles.keypadContainer}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map((digit) => (
          <TouchableOpacity
            key={digit}
            style={styles.keypadButton}
            onPress={() => handleDigitInput(digit)}
          >
            <Text style={styles.keypadButtonText}>{digit}</Text>
          </TouchableOpacity>
        ))}
        {/* Botão de backspace para apagar o último dígito */}
        <TouchableOpacity style={styles.keypadButton} onPress={handleBackspace}>
          <Text style={styles.keypadButtonText}>⌫</Text>
        </TouchableOpacity>
      </View>

      {/* Formulário para os campos Nome e Descrição */}
      <Formik
        initialValues={{ nome: "", descricao: "" }}
        onSubmit={(values) => {
          // Junta os dados do formulário com o valor digitado (em centavos)
          const transactionData = {
            valor: valorCentavos, // valor armazenado em centavos
            nome: values.nome,
            descricao: values.descricao,
          };
          console.log("Dados para salvar:", transactionData, transactionType);
          // Você pode escolher qual método de salvamento utilizar conforme o botão pressionado.
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, values, errors, touched, handleSubmit }) => (
          <View style={styles.formContainer}>
            {/* Campo Nome (obrigatório) */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme === "dark" ? "#FFF" : "#000" }]}>
                Nome
              </Text>
              <TextInput
                style={[styles.input, { color: theme === "dark" ? "#FFF" : "#000" }]}
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
                value={values.nome}
                placeholder="Digite o nome"
                placeholderTextColor="#aaa"
              />
              {errors.nome && touched.nome ? (
                <Text style={styles.errorText}>{errors.nome}</Text>
              ) : null}
            </View>

            {/* Campo Descrição */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: theme === "dark" ? "#FFF" : "#000" }]}>
                Descrição
              </Text>
              <TextInput
                style={[styles.input, { color: theme === "dark" ? "#FFF" : "#000" }]}
                onChangeText={handleChange("descricao")}
                onBlur={handleBlur("descricao")}
                value={values.descricao}
                placeholder="Digite a descrição"
                placeholderTextColor="#aaa"
              />
            </View>

            {/* Botões de Salvamento */}
            {/* Botão para salvar localmente via AsyncStorage */}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={async () => {
                const transactionData = {
                  valor: valorCentavos,
                  nome: values.nome,
                  descricao: values.descricao,
                };
                try {
                  // Escolhe a chave conforme o tipo de transação
                  const chave =
                    transactionType === "receita"
                      ? "app_budget_receitas_list"
                      : "app_budget_despesas_list";
                  await saveData(chave, transactionData);
                  console.log("Salvo localmente com sucesso:", transactionData);
                } catch (error) {
                  console.error("Erro ao salvar localmente:", error);
                }
              }}
            >
              <Text style={styles.submitButtonText}>
                {transactionType === "receita"
                  ? "Salvar Receita Local"
                  : "Salvar Despesa Local"}
              </Text>
            </TouchableOpacity>

            {/* Botão para salvar online via Firebase */}
            <TouchableOpacity
              style={[styles.submitButton, { backgroundColor: "#2d8073" }]}
              onPress={async () => {
                const transactionData = {
                  valor: valorCentavos,
                  nome: values.nome,
                  descricao: values.descricao,
                };
                try {
                  const id = await saveTransactionOnline(transactionType, transactionData);
                  console.log("Salvo online com sucesso! ID:", id);
                } catch (error) {
                  console.error("Erro ao salvar online:", error);
                }
              }}
            >
              <Text style={styles.submitButtonText}>
                {transactionType === "receita"
                  ? "Salvar Receita Online"
                  : "Salvar Despesa Online"}
              </Text>
            </TouchableOpacity>

            {/*
              // Container inativo para Mês e Ano (futuro)
              <View style={styles.mesAnoContainer}>
                <View style={styles.mesContainer}>
                  <Text style={styles.mesAnoLabel}>Mês</Text>
                </View>
                <View style={styles.anoContainer}>
                  <Text style={styles.mesAnoLabel}>Ano</Text>
                </View>
              </View>
            */}
          </View>
        )}
      </Formik>
    </View>
  );
};

export default SaldoCRUD;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  topContainer: {
    marginBottom: 20,
  },
  saldoLabel: {
    fontSize: 14,
    fontStyle: "italic",
  },
  valorInput: {
    fontSize: 32,
    textAlign: "center",
    marginVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#48c9b0",
  },
  // Estilos para o teclado personalizado
  keypadContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 20,
  },
  keypadButton: {
    width: 50,
    height: 50,
    margin: 5,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  keypadButtonText: {
    fontSize: 20,
    color: "#000",
  },
  formContainer: {
    // Adicione estilos adicionais se necessário
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: "#48c9b0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  /*
  mesAnoContainer: {
    flexDirection: "row",
    marginTop: 30,
    backgroundColor: "#2d8073",
    borderRadius: 8,
    padding: 10,
    justifyContent: "space-between",
  },
  mesContainer: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: "#FFF",
    paddingRight: 5,
  },
  anoContainer: {
    flex: 1,
    alignItems: "center",
    paddingLeft: 5,
  },
  mesAnoLabel: {
    color: "#FFF",
    fontSize: 16,
  },
  */
});