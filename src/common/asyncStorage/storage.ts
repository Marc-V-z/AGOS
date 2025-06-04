import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Salva dados no AsyncStorage de forma assíncrona.
 * Esta função recebe uma chave e um objeto de dados, converte o objeto
 * para uma string JSON e a armazena sob a chave fornecida.
 *
 * @param key A chave sob a qual os dados serão armazenados.
 * @param data O objeto de dados a ser armazenado.
 * @returns Uma Promise que resolve quando os dados são salvos com sucesso, ou rejeita em caso de erro.
 */
const saveData = async (key: string, data: object): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
    console.log(`Dados salvos com sucesso para a chave: ${key}`);
  } catch (e) {
    console.error(`Erro ao salvar dados para a chave ${key}:`, e);
    // Lançar o erro novamente para que a chamada possa tratá-lo se necessário
    throw e;
  }
};

/**
 * Carrega dados do AsyncStorage de forma assíncrona.
 * Esta função busca dados associados a uma chave específica. Se encontrados,
 * os dados JSON são parseados e retornados como um objeto. Se não encontrados
 * ou ocorrer um erro, retorna null.
 *
 * @param key A chave dos dados a serem carregados.
 * @returns Uma Promise que resolve com o objeto de dados carregado, ou null se a chave não existir ou ocorrer um erro.
 */
const loadData = async (key: string): Promise<object | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue !== null) {
      console.log(`Dados carregados com sucesso para a chave: ${key}`);
      return JSON.parse(jsonValue);
    } else {
      console.log(`Nenhum dado encontrado para a chave: ${key}`);
      return null;
    }
  } catch (e) {
    console.error(`Erro ao carregar dados para a chave ${key}:`, e);
    return null;
  }
};

/**
 * Remove dados do AsyncStorage de forma assíncrona.
 *
 * @param key A chave dos dados a serem removidos.
 * @returns Uma Promise que resolve quando os dados são removidos com sucesso, ou rejeita em caso de erro.
 */
const removeData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
    console.log(`Dados removidos com sucesso para a chave: ${key}`);
  } catch (e) {
    console.error(`Erro ao remover dados para a chave ${key}:`, e);
    throw e;
  }
};

/**
 * Obtém todas as chaves armazenadas no AsyncStorage.
 *
 * @returns Uma Promise que resolve com um array contendo todas as chaves, ou rejeita em caso de erro.
 */
const getAllKeys = async (): Promise<readonly string[] | string[]> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log('Todas as chaves recuperadas:', keys);
    return keys;
  } catch (e) {
    console.error('Erro ao recuperar todas as chaves:', e);
    throw e;
  }
};

export { saveData, loadData, removeData, getAllKeys };

