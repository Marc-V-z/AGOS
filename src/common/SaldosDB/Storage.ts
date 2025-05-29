import db from './SqliteConfig';

// 🔹 Salvar Receita ou Despesa (mês e ano são obrigatórios)
const salvarSaldo = (tipo: 'receita' | 'despesa', nome: string, descricao: string, quantia: number, ano: number, mes: number) => {
  const tabela = tipo === 'receita' ? 'receitas' : 'despesas';

  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO ${tabela} (nome, descricao, quantia, ano, mes) VALUES (?, ?, ?, ?, ?)`,
      [nome, descricao, quantia, ano, mes]
    );
  });
};

// 🔹 Buscar valores por filtro (mês ou ano)
const buscarSaldo = (tipo: 'receita' | 'despesa', filtro: 'mes' | 'ano', valor: number, callback: (dados: any[]) => void) => {
  const tabela = tipo === 'receita' ? 'receitas' : 'despesas';
  let query = `SELECT * FROM ${tabela} WHERE ${filtro} = ?`;

  db.transaction(tx => {
    tx.executeSql(query, [valor], (_, results) => {
      const dados = results.rows.raw();
      callback(dados);
    });
  });
};

export { salvarSaldo, buscarSaldo };
