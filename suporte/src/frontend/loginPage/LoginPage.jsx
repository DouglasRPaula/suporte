import videoBackground from "../loginPage/background.mp4";
import slaColor from "../../assets/sla-tracker-color.png";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useLoginMutation } from "../redux/usersApiSlice";
import { setCredentials } from "../redux/authSlice";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/chamados");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
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
              style={{ width: "300px", height: "auto", marginBottom: "10px" }}
            />
            <h3>Login</h3>

            <Form onSubmit={submitHandler}>
              <Form.Group className="my-2" controlId="email">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Insira o e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="my-2" controlId="password">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Insira sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                disabled={isLoading}
                type="submit"
                variant="primary"
                className="mt-3"
              >
                Login
              </Button>
            </Form>

            {isLoading && <Loader />}

            <Row className="py-3">
              <Col>
                Novo usuário? <Link to="/register">Criar conta</Link>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
}
