const asyncHandler = require("express-async-handler");
const User = require("../schemas/userModel");
const generateToken = require("../utils/generateToken");
const { sendingMail } = require("../utils/mailing");

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Email ou senha invalidos");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isVerified } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("usuário já existe");
  }

  const user = await User.create({
    name,
    email,
    password,
    isVerified,
  });

  if (user) {
    const verificationToken = await user.generateVerificationToken();
    await user.save();

    if (verificationToken) {
      sendingMail({
        from: "test@gmail.com",
        to: process.env.MAIL_USERNAME,
        subject: "Confirmação de e-mail",
        text: `Olá ${name},<br><br> Por favor confirme seu endereço de e-mail clicando neste link: <a href="http://localhost:3000/verify-email?token=${verificationToken}">Confirmar E-mail</a>`,
      });
    } else {
      return res.status(400).send("token não criado");
    }

    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      verificationToken,
    });
  } else {
    res.status(400);
    throw new Error("Dados inválidos do usuário");
  }
});

const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Desconectado com sucesso" });
};

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("Usuário não encontrado");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updateUser = await user.save();

    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    });
  } else {
    res.status(404);
    throw new Error("usuário nào encontrado");
  }
});

module.exports = {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
