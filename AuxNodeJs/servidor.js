const net = require('net');
const args = process.argv.slice(2).toString();
var port = parseInt(args, 10);
var id = [1, 2, 3] 
var nombre = ["Dan Israel", "Jorge Andres", "Ana"];
var apellido = ["Copa Lupe", "Alanoca Quino", "Condori Quispe"];
var usuario = ["dcopalupe", "jalanocaquino", "acondoriquispe"];
var password = ["123456", "1q2w3e4", "54321"];

const server = net.createServer(function (connection) {
    connection.on('end', function () {
        console.log('Cliente desconectado');
    });
    // Establecemos los mensajes tanto para el servidor como para el cliente
    connection.on('data', function(data){
        var cadena = data.toString();
        var arraycad = cadena.split("/");
        var user = arraycad[0].toString();
        var pass = arraycad[1].toString();
        var valus = 0;
        var valpa = 0;
        var indu = 0;
        var indp = 0;
        for (const prop in usuario) {
            if(usuario[prop]==user){
                valus=1;
                indu = id[prop];
            }
            if(password[prop]==pass){
                valpa=1;
                indp = id[prop];
            }
        }
        if(valus==1){
            if(valpa==1 && indp==indu){
                // Mensaje para el servidor
                console.log('Ciente conectado '+data);
                // Mensaje para el cliente
                connection.write('Bienvenido '+nombre[indu-1]+" "+apellido[indu-1]+'!!!');
            } else {
                connection.write('La contraseña para '+user+' es incorrecta.');
                connection.write('Ingrese usuario y contraseña (user/pass)');
            }
        } else {
            connection.write('El usuario '+user+' es incorrecto o no existe');
            connection.write('Ingrese usuario y contraseña (user/pass)');
        }
    });
});
server.listen(port, function () {
    console.log('Servidor corriendo en puerto '+port);
});