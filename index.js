import pkg from 'pg';
const { Client } = pkg;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'music',
    password: '1234',
    port: 5432
});

const nuevoEstudiante = async ( nombre, rut, curso, nivel ) =>{
    client.connect()
        await client.query(`INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ('${nombre}', '${rut}', '${curso}', '${nivel}')`);
    client.end()
}
    
const updateEstudiante = async ( nombre, rut, curso, nivel ) => {
    client.connect()
        await client.query(`UPDATE estudiantes SET rut = '${rut}', curso = '${curso}', nivel = '${nivel}' WHERE nombre = '${nombre}'`);
    client.end() 
}

const consulta = async () =>{
    client.connect()
        const res = await client.query("SELECT * FROM estudiantes");
        console.log('Estudiantes:', res.rows )
    client.end()
}  

const eliminarEstudiante = async () =>{
    client.connect()
        await client.query(`DELETE FROM estudiantes WHERE nombre = '${nombre}'`);
    client.end() 
} 

const argumentos = process.argv.slice(2);
const funcion = argumentos[0];
const nombre = argumentos[1];
const rut = argumentos[2];
const curso = argumentos[3];
const nivel = argumentos[4];


const consultas = () => {
    switch ( funcion ) {
        case 'nueva':
            nuevoEstudiante( nombre, rut, curso, nivel  )
            break;
        case 'consulta':
            consulta()
            break;
        case 'editar':
            updateEstudiante( nombre, rut, curso, nivel )
            break;
        case 'eliminar':
            eliminarEstudiante( nombre)
            break;
     }    
}

consultas()

// node index.js nueva camila 11111 canto 0
// node index.js nueva pedro 22222 baile basico
// node index.js nueva jorge 3333 baile avanzado
// node index.js editar camila 11111 canto avanzado
// node index.js eliminar camila
// node index.js consulta