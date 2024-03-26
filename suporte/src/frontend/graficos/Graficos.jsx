import { Bar } from "react-chartjs-2";

const Graficos = () => {

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      <div style={{ width: "45%", height: "400px" }}>
      </div>
      <div style={{ width: "45%", height: "400px" }}>
        <Bar />
      </div>
      <div style={{ width: "45%", height: "400px" }}>
        <Bar />
      </div>
      <div style={{ width: "45%", height: "400px" }}>
        <Bar />
      </div>
    </div>
  );
};

export default Graficos;
