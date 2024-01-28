import c from "./RootHome.module.css";
import cs from "./Shifts.module.css";
// import { PLANNEDDATA } from "../../DEMO_DATA";
import { dataConstruter, paradasFilter } from "../hooks/getCrews";
import Shifts from "./Shifts";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    BarElement,
  } from "chart.js";
const statisticsCal = (d) => {
  let dc = 0;
  d.forEach((e) => {
    dc += e.matricule.length;
  });
  return dc;
};

const RootHome = (p) => {
  const morning =
    p.data.length > 0 ? paradasFilter(dataConstruter(p.data[0].morning)) : [];
  const evening =
    p.data.length > 0 ? paradasFilter(dataConstruter(p.data[0].evening)) : [];
  const night =
    p.data.length > 0 ? paradasFilter(dataConstruter(p.data[0].night)) : [];
  const adminOne =
    p.data.length > 0 ? paradasFilter(dataConstruter(p.data[0].adminOne)) : [];
  const adminTwo =
    p.data.length > 0 ? paradasFilter(dataConstruter(p.data[0].adminTwo)) : [];

  console.log(morning);
  const statistics = [];
  if (statistics.length === 0) {
    statistics.push(statisticsCal(morning));
    statistics.push(statisticsCal(evening));
    statistics.push(statisticsCal(night));
    statistics.push(statisticsCal(adminOne));
    statistics.push(statisticsCal(adminTwo));
  }
  console.log(statistics);
  const dataBar = {
    labels: ["Morning", "Evening", "Night", "Admin One", "Admin Two"],
    datasets: [
      {
        label: `Actual Data`,
        data: statistics,
        backgroundColor: "#FCAE9C",
        hoverBackgroundColor: "#F96D4D",
        borderColor: "black",
        borderWidth: 1,
      },
    ],
  };
  const optionsBar = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: "#f3f3f34f",
          display: false,

        },
        ticks: {
          color: "white",
          fontWeight: "bold",
        },
      },
      y: {
        grid: {
          color: "#f3f3f34f",
          display: false,

        },
        ticks: {
          display: false,
          color: "white",
          fontWeight: "bold",
        },
        y: {
          stacked: true,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#FAF0E6",
        },
        display: false,
      },
      datalabels: {
        display: true,
      },
    },
    animation: {
      onComplete: (animation) => {
        const { chart } = animation;
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset, index) => {
          const meta = chart.getDatasetMeta(index);

          meta.data.forEach((element, index) => {
            const data = dataset.data[index];
            let xPos, yPos;
            xPos = element.x;
            yPos = element.y+15;
            ctx.save();
            ctx.textAlign = "center";
            ctx.fillStyle = "balck";
            ctx.font = "17px Arial";
            ctx.fillText(data, xPos, yPos);

            ctx.restore();
          });
        });
      },
    },
  };

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    BarElement
  );
  return (
    <div className={c.wrapper}>
      <div className={c.center}>
        <h1 className={c.slogan}>
          Together On Time: <span>Get teams there quicker, together.</span>
        </h1>
        <div className={c["card"]}>
          <div className={c["card-info"]}>
            <div className={c["card-avatar"]}>
            </div>
            <div className={c["card-title"]}>Lahcen transport</div>
            <div className={c["card-subtitle"]}>ROOT &amp; transport agent</div>
          </div>
        </div>
        <div className={`${cs.crewHolder} ${cs.modify}`}>
          <h1 className={cs.title}>statistics</h1>
          <Bar data={dataBar} options={optionsBar} />
        </div>
        <div className={c.content}>
          <Shifts title={"morning"} data={morning} />
          <Shifts title={"evening"} data={evening} />
          <Shifts title={"night"} data={night} />
          <Shifts title={"admine one"} data={adminOne} />
          <Shifts title={"admine two"} data={adminTwo} />
        </div>
      </div>
    </div>
  );
};

export default RootHome;
