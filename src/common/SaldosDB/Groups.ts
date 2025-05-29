import db from './SqliteConfig';

// Criar um novo grupo
const criarGrupo = (nome: string) => {
  db.transaction(tx => {
    tx.executeSql('INSERT INTO grupos (nome) VALUES (?)', [nome]);
  });
};

// Salvar um saldo dentro de um grupo (baseado na id)
const salvarSaldoNoGrupo = (grupo_id: number, nome: string, descricao: string, quantia: number) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO saldos (grupo_id, nome, descricao, quantia) VALUES (?, ?, ?, ?)',
      [grupo_id, nome, descricao, quantia]
    );
  });
};

// Buscar todos os saldos de um grupo específico
const buscarSaldosPorGrupo = (grupo_id: number, callback: (dados: any[]) => void) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM saldos WHERE grupo_id = ?', [grupo_id], (_, results) => {
      const dados = results.rows.raw();
      callback(dados);
    });
  });
};

export { criarGrupo, salvarSaldoNoGrupo, buscarSaldosPorGrupo };
