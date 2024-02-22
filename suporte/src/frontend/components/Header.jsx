import Image from "react-bootstrap/Image";

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
        <div className="ml-3">
          <a className="navbar-brand" href="/">
            <Image
              src="../../src/assets/geolabor-branco-simples.png"
              alt="logo"
              className="mr-1 ms-2 mb-2"
              style={{ height: "23px" }}
            />
          </a>
        </div>
        <ul className="navbar-nav px-3">
          <div className="d-flex align-center"></div>
          <li className="nav-item">
            <div className="user-info">
              <div className="dropdown" tabIndex="1">
                <div
                  style={customButtonColor}
                  type
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
