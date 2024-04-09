import "./App.css";
import NavBar from "./frontend/components/Header";
import SideBar from "./frontend/components/SideBar";
import Footer from "./frontend/components/Footer";
import RoutesComponent from "./frontend/components/RoutesComponent";
import LoginPage from "./frontend/loginPage/LoginPage";
import { useEffect, useState } from "react";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <NavBar />
          <div className="side-bar">
            <SideBar />
          </div>
          <div className="main-content">
            <RoutesComponent />
          </div>
          <Footer />
        </div>
      ) : (
        <LoginPage onLogin={() => setIsAuthenticated(true)} />
      )}
    </div>
  );
}
