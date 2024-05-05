import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../redux/usersApiSlice";
import { setCredentials } from "../redux/authSlice";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import videoBackground from "../loginPage/background.mp4";
import slaColor from "../../assets/sla-tracker-color.png";

export default function CadastroUsuario() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !email.endsWith("@geolabor.com.br") &&
      !email.endsWith("@simplelabtech.com.br")
    ) {
      toast.error("Domínio não permitido.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Senhas diferentes");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Registro concluído com sucesso!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="main">
      <div className="overlay"></div>
      <video autoPlay loop muted src={videoBackground} />
      <div className="content">
        <div className="card text-center" style={{ width: "30rem" }}>
          <div className="card-body">
            <img
              alt="logo"
              src={slaColor}
              style={{ width: "200px", height: "auto", marginBottom: "10px" }}
            />
            <h2>Registrar</h2>
            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="name">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Digite seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Insira sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
              <Form.Group className="my-2" controlId="confirmPassword">
                <Form.Label>Confirmar senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>

              <Button type="submit" variant="primary" className="mt-3">
                Registrar
              </Button>

              {isLoading && <Loader />}
            </Form>

            <Row className="py-3">
              <Col>
                Já tem uma conta? <Link to={`/login`}>Login</Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
