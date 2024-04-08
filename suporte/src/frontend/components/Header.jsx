import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const customNavbarColor = {
    backgroundColor: "#598392",
  };
  const customButtonColor = {
    backgroundColor: "#124559",
    width: "40px",
    height: "40px",
  };
  return (
    <div className="sticky-top">
      <div
        className="main-navbar navbar navbar-dark flex-nowarp icons-light"
        style={customNavbarColor}
      >
        <div className="margin">
          <a href="/" className="d-none d-lg-inline mr-3 text-light">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </a>
          <a className="navbar-brand" href="/">
            <Image
              src={require("../../assets/sla-tracker.png")}
              alt="logo"
              className="ms-2"
              style={{ height: "40px" }}
            />
          </a>
        </div>
        <strong>Beta </strong>
        <ul className="navbar-nav px-3">
          <div className="d-flex align-center"></div>
          <li className="nav-item">
            <div className="user-info">
              <div className="dropdown" tabIndex="1">
                <div
                  style={customButtonColor}
                  className="btn btn-circle text-light rounded-circle d-flex align-items-center justify-content-center"
                >
                  DP
                </div>
                <div className="dropdown-menu dropdown-menu-stateless dropdown-menu-right"></div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
