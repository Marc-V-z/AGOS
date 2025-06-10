import { firestore } from "@/config/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

/**
 * Função para salvar uma transação (receita ou despesa) online no Firebase.
 * @param transactionType - "receita" | "despesa"
 * @param data - Objeto com os dados da transação
 * @returns O ID do documento criado, caso seja bem-sucedido.
 */
export const saveTransactionOnline = async (
  transactionType: "receita" | "despesa",
  data: any
): Promise<string> => {
  try {
    // Define qual coleção usar com base no tipo de transação
    const collectionName = transactionType === "receita" ? "receitas" : "despesas";
    const collectionRef = collection(firestore, collectionName);
    const docRef = await addDoc(collectionRef, data);
    return docRef.id;
  } catch (error) {
    console.error("Erro ao salvar dados no Firebase:", error);
    throw error;
  }
};