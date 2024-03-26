import "./App.css";
import NavBar from "./frontend/components/Header";
import SideBar from "./frontend/components/SideBar";
import Footer from "./frontend/components/Footer";
import RoutesComponent from "./frontend/components/RoutesComponent";

export default function App() {
  return (
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
  );
}
