// Importa o módulo Express para criação do servidor web
import express from 'express'

// Importa a função de conexão com o banco de dados MongoDB
import conectarAoBanco from './src/config/dbConfig.js';
import routes from './src/config/routes/postsRoutes.js';

// Array de posts mockados (dados de exemplo) antes de conectar ao banco de dados real
const posts = [
    {
        id: 1, 
        descricao: "Foto teste",
        imagem: "https://placecats.com/millie/300/150"
    },
    {
        id: 2, 
        descricao: "Gato escalando montanha",
        imagem: "https://th.bing.com/th/id/OIG2.U279rKS5OFyFkz8ZE0hu?pid=ImgGn"
    },
    {
        id: 3,  
        descricao: "Gato com um brinquedo",
        imagem: "https://www.mein-haustier.de/wp-content/uploads/2018/10/iStock-933093382.jpg"
    },
];
  
// Cria uma instância do servidor Express
const app = express();
app.use(express.static("uploads"))
routes(app)

// Middleware para parsear o corpo das requisições em formato JSON
// Permite que o servidor entenda e processe dados enviados no formato JSON
app.use(express.json()); 

// Inicia o servidor na porta 3000 
// O callback é executado quando o servidor começa a escutar
app.listen(3000, () => {
    console.log("Servidor escutando...");
});

// Rota GET para recuperar todos os posts
app.get("/posts", async (req, res) => {
    // Busca todos os posts do banco de dados de forma assíncrona
    const posts = await getTodosPosts()
    
    // Envia os posts como resposta com status 200 (OK)
    res.status(200).json(posts);
});

// //Função de buscar post por ID
// function buscarPostPorID(id) {
//     return posts.findIndex((post) => {
//         return post.id === Number(id)
//     })

// }
// //Retorna post de acordo com o ID
// app.get("/posts/:id",(req,res) => {
//     const index = buscarPostPorID(req.params.id)
//     res.status(200).json(posts[index]);
    
// });
