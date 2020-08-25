

//para subir el archivo con un puerto que proporcione el servidor 
//se necesita el process

process.env.PORT = process.env.PORT || 3000;



//=======================================
// VENCIMIENTO DEL TOKEN
//=======================================
//60 SEGUNDOS
//60 MINUTOS//
//24 HORAS
//30 DIAS
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30

//=======================================
// VENCIMIENTO DEL TOKEN
//=======================================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';
