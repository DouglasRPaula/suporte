const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI_TESTE_DOUGLAS);
    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Erro: ${error.message}`);
    process.exit(1);
  }
};

module.exports =  connectDB;
