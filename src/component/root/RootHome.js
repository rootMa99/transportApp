import c from "./RootHome.module.css";
// import { PLANNEDDATA } from "../../DEMO_DATA";
import { dataConstruter, paradasFilter } from "../hooks/getCrews";
import Shifts from "./Shifts";

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

  return (
    <div className={c.wrapper}>
      <div className={c.center}>
        <h1 className={c.slogan}>
          Together On Time: <span>Get teams there quicker, together.</span>
        </h1>
        <div className={c["card"]}>
          <div className={c["card-info"]}>
            <div className={c["card-avatar"]}>
              {/* <img src={unk} alt="alk" /> */}
            </div>
            <div className={c["card-title"]}>Lahcen transport</div>
            <div className={c["card-subtitle"]}>ROOT &amp; transport agent</div>
          </div>
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
