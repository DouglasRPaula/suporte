import Image from "react-bootstrap/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useLogoutMutation } from "../redux/usersApiSlice";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const editUserHandler = () => {
    navigate("/profile");
  };

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const customNavbarColor = {
    backgroundColor: "#598392",
  };
  const roundButtonStyle = {
    backgroundColor: "#124559",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    textAlign: "center",
    padding: "10px",
  };

  const getUserInitials = () => {
    if (!userInfo || !userInfo.name) return "";
    const initials = userInfo.name.match(/\b\w/g) || [];
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
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
        <ul className="navbar-nav px-3">
          <div className="d-flex align-center"></div>
          <li className="nav-item">
            <div className="user-info">
              <style type="text/css">
                {`.btn.dropdown-toggle::after {display: none;}
                  .btn.dropdown-toggle:focus {outline: none; box-shadow: none;}`}
              </style>
              {userInfo && (
                <DropdownButton
                  id="dropdown-basic-button"
                  title={
                    <div style={roundButtonStyle}>{getUserInitials()}</div>
                  }
                  drop="left"
                >
                  <Dropdown.Header>{userInfo.name}</Dropdown.Header>
                  <Dropdown.Item onClick={editUserHandler}>
                    Editar usuário
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logoutHandler}>
                    Desconectar
                  </Dropdown.Item>
                </DropdownButton>
              )}
            </div>
            <div className="dropdown-menu dropdown-menu-stateless dropdown-menu-right"></div>
          </li>
        </ul>
      </div>
    </div>
  );
}
