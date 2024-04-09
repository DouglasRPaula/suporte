import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginAuth({ onLogin }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        localStorage.setItem("authToken", credentialResponse.token);
        onLogin();
      }}
      onError={() => {
        console.log("Login falhou");
      }}
    />
  );
}
