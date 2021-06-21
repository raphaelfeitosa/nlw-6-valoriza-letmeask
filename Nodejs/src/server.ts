import express from "express";

const app = express();

/**
 * GET => Busca uma informação
 * POST => Inserir(Criar) uma informação
 * PUT => Alterar uma informação
 * DELETE => Deletar um dado
 * PATCH => Alterar uma informação específica
 */

app.get("/test-get", (request, response) => {
    //request => Entrada
    //response => Sáida
    return response.send("Olá metodo GET");
});

app.post("/test-post", (request, response) => {

    return response.send("Olá metodo POST");
});


app.listen(3000, () => console.log("Server is running NLW6"));