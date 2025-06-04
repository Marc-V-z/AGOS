import { v4 as uuidv4 } from 'uuid';
import { saveData, loadData } from './storage';

// Chave específica para armazenar a lista de receitas no AsyncStorage
const RECEITAS_STORAGE_KEY = 'app_budget_receitas_list';

// --- Interface para Tipagem ---

/**
 * Representa um único registro de receita.
 */
interface Receita {
  id: string; // Identificador único para cada receita
  nome: string;
  descricao?: string; // Descrição opcional
  quantia: number; // Valor da receita (deve ser positivo)
}

// --- Funções Auxiliares Internas ---

/**
 * Carrega a lista de receitas do AsyncStorage.
 * Se nenhum dado for encontrado, inicializa com uma lista vazia.
 * @returns Uma Promise que resolve com a lista de Receita[].
 */
const loadReceitas = async (): Promise<Receita[]> => {
  const data = await loadData(RECEITAS_STORAGE_KEY);
  // Se não houver dados ou a estrutura for inválida (não for um array), retorna uma lista vazia
  if (!data || !Array.isArray(data)) {
    return [];
  }
  // Validação adicional para garantir que os itens são minimamente parecidos com Receita
  // (Pode ser mais robusta dependendo da necessidade)
  return data.filter(item => typeof item === 'object' && item !== null && 'id' in item && 'nome' in item && 'quantia' in item) as Receita[];
};

/**
 * Salva a lista completa de receitas no AsyncStorage.
 * @param receitas A lista de Receita[] a ser salva.
 * @returns Uma Promise que resolve quando os dados são salvos.
 */
const saveReceitas = async (receitas: Receita[]): Promise<void> => {
  await saveData(RECEITAS_STORAGE_KEY, receitas);
};

// --- Funções Públicas para Gerenciamento de Receitas ---

/**
 * Adiciona uma nova receita à lista.
 *
 * @param receitaData Os dados da receita a ser adicionada (nome, descrição opcional, quantia).
 *                    A quantia deve ser um valor positivo.
 * @returns Uma Promise que resolve com o objeto da receita recém-criada.
 */
const addReceita = async (receitaData: { nome: string; descricao?: string; quantia: number }): Promise<Receita> => {
  if (!receitaData || typeof receitaData.quantia !== 'number' || !receitaData.nome || receitaData.quantia <= 0) {
    throw new Error('Dados inválidos para a receita. Nome e quantia positiva são obrigatórios.');
  }

  const currentReceitas = await loadReceitas();

  const newReceita: Receita = {
    id: uuidv4(), // Gera um ID único para a receita
    nome: receitaData.nome.trim(),
    description: receitaData.descricao?.trim(),
    quantia: receitaData.quantia, // Garante que a quantia é positiva
  };

  currentReceitas.push(newReceita);
  await saveReceitas(currentReceitas);
  console.log(`Receita "${newReceita.nome}" (${newReceita.quantia}) adicionada com sucesso.`);
  return newReceita;
};

/**
 * Retorna todas as receitas armazenadas.
 *
 * @returns Uma Promise que resolve com a lista de todas as receitas (Receita[]).
 */
const getAllReceitas = async (): Promise<Receita[]> => {
  console.log('Recuperando todas as receitas...');
  return await loadReceitas();
};

/**
 * Remove uma receita específica pelo seu ID.
 *
 * @param receitaId O ID da receita a ser removida.
 * @returns Uma Promise que resolve quando a receita é removida.
 */
const removeReceita = async (receitaId: string): Promise<void> => {
  if (!receitaId) {
    throw new Error('O ID da receita é necessário para a remoção.');
  }
  let currentReceitas = await loadReceitas();
  const initialLength = currentReceitas.length;
  currentReceitas = currentReceitas.filter(receita => receita.id !== receitaId);

  if (currentReceitas.length === initialLength) {
     console.warn(`Receita com ID "${receitaId}" não encontrada para remoção.`);
     return; // Não salva se nada mudou
  }

  await saveReceitas(currentReceitas);
  console.log(`Receita com ID "${receitaId}" removida com sucesso.`);
};

export type { Receita };
export { 
  addReceita, 
  getAllReceitas, 
  removeReceita,
  RECEITAS_STORAGE_KEY
};

