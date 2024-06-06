const express = require("express");
const app = express();

const { agregar, consultar, editar, eliminar} = require('./consultas');

app.listen(3000, console.log("Server on"));

app.use(express.json())

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/cancion", async (req, res) => {
    try {
        const datos = Object.values(req.body)
        const respuesta = await agregar(datos)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Algo salió mal agregando canciones :( ")
    }
});


app.get("/canciones", async (req, res) => { 
    try {
        const registros = await consultar();
        res.json(registros)
    } catch (error) {
        res.status(500).send("Algo salió mal consultando las cancioens");
    }
});

app.put("/cancion/:id", async (req, res) => { 
    try {
        const { id } = req.params
        const { titulo, artista, tono } = req.body; 
        const respuesta = await editar( { titulo, artista, tono, id } );
        res.json(respuesta);
    } catch (error) {
        res.status(500).send("Algo salió mal editando los datos :( ")
    }
});

app.delete("/cancion", async (req, res) => { 
    try {
        const { id } = req.query
        const respuesta = await eliminar(id)
        res.json(respuesta)
    } catch (error) {
        res.status(500).send("Algo salió mal eliminando la canción :( ")
    }
})
