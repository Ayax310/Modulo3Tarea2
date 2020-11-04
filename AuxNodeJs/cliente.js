var net = require('net');
const rl = require('./readl');

var client = net.connect({ port: 7000 }, function () {
    console.log('Bienvenido al sistema LAB 273');
    console.log('Ingrese usuario y contraseña (user/pass)');
});

rl.on('line', function (msg) {
    if(msg == 'salir'){
        rl.close();
        client.end();
    }else{
        client.write(msg);
    }
});

client.on('data', function (data) {
    console.log(data.toString());
    //client.end();
});
client.on('end', function () {
    console.log('Desconectado del servidor!');
});