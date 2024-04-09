import GoogleLoginAuth from "../auth/GoogleAuth";
import videoBackground from "../loginPage/background.mp4";
import slaColor from "../../assets/sla-tracker-color.png";

export default function LoginPage({ onLogin }) {
  return (
    <div className="main">
      <div className="overlay"></div>
      <video autoPlay loop muted src={videoBackground} />
      <div className="content">
        <div className="card text-center mb-3 width-18rem">
          <div class="card-body">
            <img
              alt="logo"
              src={slaColor}
              style={{ width: "200px", height: "auto", marginBottom: "10px" }}
            />
            <p class="card-text">
              Faça login com sua conta Google Simplelabtech ou Geolabor.
            </p>
            <div className="">
              <GoogleLoginAuth onLogin={onLogin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
