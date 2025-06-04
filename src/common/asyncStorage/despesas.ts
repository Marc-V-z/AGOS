import { v4 as uuidv4 } from 'uuid';
import { saveData, loadData } from './storage';

// Chave específica para armazenar a lista de despesas no AsyncStorage
const DESPESAS_STORAGE_KEY = 'app_budget_despesas_list';

// --- Interface para Tipagem ---

/**
 * Representa um único registro de despesa.
 */
interface Despesa {
  id: string; // Identificador único para cada despesa
  nome: string;
  descricao?: string; // Descrição opcional
  quantia: number; // Valor da despesa (deve ser negativo)
}

// --- Funções Auxiliares Internas ---

/**
 * Carrega a lista de despesas do AsyncStorage.
 * Se nenhum dado for encontrado, inicializa com uma lista vazia.
 * @returns Uma Promise que resolve com a lista de Despesa[].
 */
const loadDespesas = async (): Promise<Despesa[]> => {
  const data = await loadData(DESPESAS_STORAGE_KEY);
  // Se não houver dados ou a estrutura for inválida (não for um array), retorna uma lista vazia
  if (!data || !Array.isArray(data)) {
    return [];
  }
  // Validação adicional
  return data.filter(item => typeof item === 'object' && item !== null && 'id' in item && 'nome' in item && 'quantia' in item) as Despesa[];
};

/**
 * Salva a lista completa de despesas no AsyncStorage.
 * @param despesas A lista de Despesa[] a ser salva.
 * @returns Uma Promise que resolve quando os dados são salvos.
 */
const saveDespesas = async (despesas: Despesa[]): Promise<void> => {
  await saveData(DESPESAS_STORAGE_KEY, despesas);
};

// --- Funções Públicas para Gerenciamento de Despesas ---

/**
 * Adiciona uma nova despesa à lista.
 *
 * @param despesaData Os dados da despesa a ser adicionada (nome, descrição opcional, quantia).
 *                    A quantia deve ser um valor negativo.
 * @returns Uma Promise que resolve com o objeto da despesa recém-criada.
 */
const addDespesa = async (despesaData: { nome: string; descricao?: string; quantia: number }): Promise<Despesa> => {
  if (!despesaData || typeof despesaData.quantia !== 'number' || !despesaData.nome || despesaData.quantia >= 0) {
    throw new Error('Dados inválidos para a despesa. Nome e quantia negativa são obrigatórios.');
  }

  const currentDespesas = await loadDespesas();

  const newDespesa: Despesa = {
    id: uuidv4(), // Gera um ID único para a despesa
    nome: despesaData.nome.trim(),
    description: despesaData.descricao?.trim(),
    quantia: despesaData.quantia, // Garante que a quantia é negativa
  };

  currentDespesas.push(newDespesa);
  await saveDespesas(currentDespesas);
  console.log(`Despesa "${newDespesa.nome}" (${newDespesa.quantia}) adicionada com sucesso.`);
  return newDespesa;
};

/**
 * Retorna todas as despesas armazenadas.
 *
 * @returns Uma Promise que resolve com a lista de todas as despesas (Despesa[]).
 */
const getAllDespesas = async (): Promise<Despesa[]> => {
  console.log('Recuperando todas as despesas...');
  return await loadDespesas();
};

/**
 * Remove uma despesa específica pelo seu ID.
 *
 * @param despesaId O ID da despesa a ser removida.
 * @returns Uma Promise que resolve quando a despesa é removida.
 */
const removeDespesa = async (despesaId: string): Promise<void> => {
  if (!despesaId) {
    throw new Error('O ID da despesa é necessário para a remoção.');
  }
  let currentDespesas = await loadDespesas();
  const initialLength = currentDespesas.length;
  currentDespesas = currentDespesas.filter(despesa => despesa.id !== despesaId);

  if (currentDespesas.length === initialLength) {
     console.warn(`Despesa com ID "${despesaId}" não encontrada para remoção.`);
     return; // Não salva se nada mudou
  }

  await saveDespesas(currentDespesas);
  console.log(`Despesa com ID "${despesaId}" removida com sucesso.`);
};

export type { Despesa };
export { 
  addDespesa, 
  getAllDespesas, 
  removeDespesa,
  DESPESAS_STORAGE_KEY
};

