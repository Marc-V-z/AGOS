import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'saldos.db', location: 'default' });

db.transaction(tx => {
  // Tabela de Receitas
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      nome TEXT, 
      descricao TEXT, 
      quantia REAL, 
      ano INTEGER, 
      mes INTEGER
    )`,
    []
  );

  // Tabela de Despesas
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS despesas (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      nome TEXT, 
      descricao TEXT, 
      quantia REAL, 
      ano INTEGER, 
      mes INTEGER
    )`,
    []
  );

  // Tabela de Grupos
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS grupos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      nome TEXT
    )`,
    []
  );

  // Tabela de Saldos (vinculados a grupos)
  tx.executeSql(
    `CREATE TABLE IF NOT EXISTS saldos (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      grupo_id INTEGER, 
      nome TEXT, 
      descricao TEXT, 
      quantia REAL,
      FOREIGN KEY (grupo_id) REFERENCES grupos(id)
    )`,
    []
  );
});

export default db;
