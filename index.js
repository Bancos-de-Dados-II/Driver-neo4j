require('dotenv').config();
let neo4j = require('neo4j-driver');

let driver = null;

(async () => {
  const URI = process.env.NEO4J_URI
  const USER = process.env.NEO4J_USERNAME
  const PASSWORD = process.env.NEO4J_PASSWORD

  try {
    driver = neo4j.driver(URI, neo4j.auth.basic(USER, PASSWORD))
    const serverInfo = await driver.getServerInfo()
    console.log('Connection established')
    console.log(serverInfo)
  } catch(err) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
  }
})();

async function salvarPessoa(pessoa){
    const retorno = await driver.executeQuery(
        'CREATE (:Pessoa{nome:$nome, email:$email})',
        {nome: pessoa.nome, email:pessoa.email}
    );
    console.log(retorno.summary.counters._stats);
}

async function criarAmizade(email1, email2){
    const retorno = await driver.executeQuery(
        'MATCH (p1:Pessoa{email:$email1}) OPTIONAL MATCH (p2:Pessoa{email:$email2}) CREATE (p1)-[:AMIGO]->(p2)',
        {email1: email1, email2:email2});
        console.log(retorno.summary.counters._stats);
    }

// salvarPessoa({nome:"Ana", email:"ana@gmail.com"});
criarAmizade('joao@gmail.com', 'maria@gmail.com');