const { Pool } = require("pg");

const config = {
    user: "postgres",
    host: "localhost",
    password: "navi1992",
    database: "repertorio",
    port: 5432,
};

const pool = new Pool (config)

const agregar = async (datos) => {
    const consulta = {
        text: "insert into canciones (titulo, artista, tono) values ($1, $2, $3)",
        values: datos, 
    }
    const result = await pool.query(consulta);
    return result;
};


const consultar = async () => {
    const result = await pool.query ("Select * from canciones");
    return result.rows;  
};


const editar = async( { titulo, artista, tono, id } ) => {
    const consulta = {
        text: "update canciones set titulo = $1 , artista = $2 , tono = $3 where id = $4 RETURNING *",
        values: [titulo, artista, tono, id],
    };
    const result = await pool.query(consulta);
     console.log(result),
     console.log(result.rows),
     console.log(result.rows[0])
     return result;
};
 
const eliminar = async (id) => {
    const resultado = {
        text: "delete from canciones where id = $1 RETURNING *",
        values: [id], 
    }
    const result = await pool.query(resultado);
    return result;
}

module.exports = { agregar, consultar, editar, eliminar};
