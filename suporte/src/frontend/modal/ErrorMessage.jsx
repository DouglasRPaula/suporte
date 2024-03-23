import Alert from "react-bootstrap/Alert";

export default function ErrorMessage({ message }) {
  return (
    <Alert
      variant="danger"
      style={{ position: "fixed", top: "20px", right: "20px", zIndex: 9999 }}
    >
      {message}
    </Alert>
  );
}
