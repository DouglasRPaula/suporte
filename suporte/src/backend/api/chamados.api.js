const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

const chamadoRoutes = require("../routes/chamados.routes.js");

app.use("/", chamadoRoutes);

mongoose
  .connect(
    "mongodb+srv://suporteGeolabor:simplelabtech2024geo@suportegeolabor.talzfqi.mongodb.net/"
  )
  .then(() => {
    console.log("conectado ao mongodb");
    app.listen(5000);
  })
  .catch((error) => console.log(error));
