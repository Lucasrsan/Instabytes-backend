import express from "express";
import multer from "multer";
import {listarPosts,postarNovoPost, uploadImagem, atualizarNovoPost} from "../Controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage}); //No mac ou linux não precisa do storage

const routes = (app) => {
    // Middleware para parsear o corpo das requisições em formato JSON
    // Permite que o servidor entenda e processe dados enviados no formato JSON
    app.use(express.json()); 
    app.use(cors(corsOptions))
    // Rota GET para recuperar todos os posts
    app.get("/posts", listarPosts);
    app.post("/posts",postarNovoPost);
    app.post("/upload", upload.single("imagem"), uploadImagem)

    app.put("/upload/:id", atualizarNovoPost)
}


export default routes;