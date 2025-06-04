import { v4 as uuidv4 } from 'uuid';
import { saveData, loadData } from './storage';

// Chave específica para armazenar a lista de grupos no AsyncStorage
const GRUPOS_STORAGE_KEY = 'app_budget_grupos_list';

// --- Interface para Tipagem ---

/**
 * Representa um grupo de orçamento simples, contendo apenas ID e nome.
 * Os saldos (receitas/despesas) são gerenciados separadamente.
 */
interface Grupo {
  id: string; // Identificador único para cada grupo
  name: string;
}

// --- Funções Auxiliares Internas ---

/**
 * Carrega a lista de grupos do AsyncStorage.
 * Se nenhum dado for encontrado, inicializa com uma lista vazia.
 * @returns Uma Promise que resolve com a lista de Grupo[].
 */
const loadGroups = async (): Promise<Grupo[]> => {
  const data = await loadData(GRUPOS_STORAGE_KEY);
  // Se não houver dados ou a estrutura for inválida (não for um array), retorna uma lista vazia
  if (!data || !Array.isArray(data)) {
    return [];
  }
  // Validação adicional
  return data.filter(item => typeof item === 'object' && item !== null && 'id' in item && 'name' in item) as Grupo[];
};

/**
 * Salva a lista completa de grupos no AsyncStorage.
 * @param grupos A lista de Grupo[] a ser salva.
 * @returns Uma Promise que resolve quando os dados são salvos.
 */
const saveGroups = async (grupos: Grupo[]): Promise<void> => {
  await saveData(GRUPOS_STORAGE_KEY, grupos);
};

// --- Funções Públicas para Gerenciamento de Grupos ---

/**
 * Cria um novo grupo de orçamento.
 * Garante que não existam grupos com nomes duplicados.
 *
 * @param groupName O nome do novo grupo a ser criado.
 * @returns Uma Promise que resolve com o objeto do grupo recém-criado, ou rejeita se o grupo já existir.
 */
const createGroup = async (groupName: string): Promise<Grupo> => {
  if (!groupName || groupName.trim() === '') {
    throw new Error('O nome do grupo não pode estar vazio.');
  }

  const currentGroups = await loadGroups();
  const groupExists = currentGroups.some(group => group.name.toLowerCase() === groupName.trim().toLowerCase());

  if (groupExists) {
    throw new Error(`Um grupo com o nome "${groupName}" já existe.`);
  }

  const newGroup: Grupo = {
    id: uuidv4(), // Gera um ID único para o grupo
    name: groupName.trim(),
  };

  currentGroups.push(newGroup);
  await saveGroups(currentGroups);
  console.log(`Grupo "${newGroup.name}" criado com sucesso com ID: ${newGroup.id}`);
  return newGroup;
};

/**
 * Retorna todos os grupos armazenados.
 *
 * @returns Uma Promise que resolve com a lista de todos os grupos (Grupo[]).
 */
const getAllGroups = async (): Promise<Grupo[]> => {
  console.log('Recuperando todos os grupos...');
  return await loadGroups();
};

/**
 * Remove um grupo específico pelo seu ID.
 * TODO: Considerar o que fazer com receitas/despesas associadas a este grupo, se houver essa ligação.
 * Atualmente, apenas remove o grupo da lista de grupos.
 *
 * @param groupId O ID do grupo a ser removido.
 * @returns Uma Promise que resolve quando o grupo é removido.
 */
const removeGroup = async (groupId: string): Promise<void> => {
  if (!groupId) {
    throw new Error('O ID do grupo é necessário para a remoção.');
  }
  let currentGroups = await loadGroups();
  const initialLength = currentGroups.length;
  currentGroups = currentGroups.filter(group => group.id !== groupId);

  if (currentGroups.length === initialLength) {
     console.warn(`Grupo com ID "${groupId}" não encontrado para remoção.`);
     return; // Não salva se nada mudou
  }

  await saveGroups(currentGroups);
  console.log(`Grupo com ID "${groupId}" removido com sucesso.`);
  // Nota: A lógica para desvincular/remover receitas e despesas associadas
  // precisaria ser implementada separadamente, se necessário.
};


export type { Grupo };
export { 
  createGroup, 
  getAllGroups, 
  removeGroup,
  GRUPOS_STORAGE_KEY
};

