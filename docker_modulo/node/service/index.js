const express = require('express');
var mysql = require('mysql');
const app = express();
const port = 3000;
var config ={
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config);

app.get('/', (req, res)=>{
    
    connection.query(
        `
            CREATE TABLE IF NOT EXISTS people(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id));
        `
    );

    connection.query('INSERT INTO people(name) Values("Aluno '+Math.floor(Math.random()*100)+'")');

    connection.query('SELECT id, name FROM people', function(error, results, fields){
        var html = `
                    <style>
                    table, th, td {
                    border:1px solid black;
                    }
                    </style>
                    <h1>Full Cycle Rocks!</h1>
                    <table>
                        <tr>
                            <th>Nome Do Aluno</th>
                        </tr>
        `
        results.map(nome => {
            html = html + '<tr><td>'+nome.name+'</td></tr>'
        });
        
        html = html + ' </table>'
        res.send(html);
    });
    console.log("Chamada")
});

app.listen(port);
console.log('Executando na porta: ' +port);