const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("../backend/config/db.js");
const cookieParser = require("cookie-parser");
const {
  notFound,
  errorHandler,
} = require("../backend/middleware/errorMiddleware.js");
const userRoutes = require("../backend/routes/userRoutes.js");
const chamadoRoutes = require("../backend/routes/chamadosRoutes.js");
const graficosRoutes = require("../backend/routes/graficosRoutes.js");
const User = require("./schemas/userModel.js");

const port = 5000;

connectDB();

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/chamados", chamadoRoutes);

app.use("/graficos", graficosRoutes);

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.get('/verify-email', async (req, res) => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token, isVerified: false });

  if (!user) {
    return res.status(400).send('Invalid or expired verification token.');
  }

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  res.send('Email successfully verified. You can now login.');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Servidor iniciado na porta: ${port}`));

