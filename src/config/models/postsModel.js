import 'dotenv/config';
import { ObjectId } from "mongodb"
import conectarAoBanco from "../dbConfig.js"

// Estabelece conexão com o banco de dados usando a string de conexão do ambiente
// await garante que a conexão seja estabelecida antes de continuar
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO) 

// Função assíncrona para buscar todos os posts no banco de dados
export async function getTodosPosts() {
    // Seleciona o banco de dados "Imersão-instabytes"
    const db = conexao.db("Imersão-instabytes")
    
    // Seleciona a coleção "posts" dentro do banco de dados
    const colecao = db.collection("posts")
    
    // Busca todos os documentos na coleção e converte para um array
    return colecao.find().toArray()
}
export async function criarPost(novoPost) {
    const db = conexao.db("Imersão-instabytes")
    const colecao = db.collection("posts")
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("Imersão-instabytes")
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id:new ObjectId(objID)}, {$set:novoPost})
}