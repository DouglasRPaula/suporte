import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    fetch(`http://localhost:3000/verify-email?token=${token}`)
      .then((response) => response.text())
      .then((data) => {
        alert(data);
        navigate("/login");
      })
      .catch((err) => {
        toast.error("Verification failed:", err);
        navigate("/login");
      });
  }, [navigate, location.search]);

  return <div>Verificando seu e-mail...</div>;
}
