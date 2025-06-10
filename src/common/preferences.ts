import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY_DATA_SOURCE = "data_source_preference";

// Define os valores possíveis: "online" ou "offline"
export const setDataSourcePreference = async (value: "online" | "offline"): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEY_DATA_SOURCE, value);
  } catch (error) {
    console.error("Erro ao salvar preferencia:", error);
  }
};

export const getDataSourcePreference = async (): Promise<"online" | "offline"> => {
  try {
    const storedValue = await AsyncStorage.getItem(KEY_DATA_SOURCE);
    if (storedValue === "online" || storedValue === "offline") {
      return storedValue;
    }
    // Valor padrão
    return "offline";
  } catch (error) {
    console.error("Erro ao carregar preferencia:", error);
    return "offline";
  }
};