import c from "./RootHome.module.css";
import { PLANNEDDATA } from "../../DEMO_DATA";
import { dataConstruter, paradasFilter } from "../hooks/getCrews";
import Shifts from "./Shifts";


const RootHome = (p) => {

const morning= paradasFilter(dataConstruter(PLANNEDDATA.morning));
const evening= paradasFilter(dataConstruter(PLANNEDDATA.evening));
const night= paradasFilter(dataConstruter(PLANNEDDATA.night));
const adminOne= paradasFilter(dataConstruter(PLANNEDDATA.adminOne));
const adminTwo= paradasFilter(dataConstruter(PLANNEDDATA.adminTwo));

console.log(morning);


  return (
    <div className={c.wrapper}>
      <div className={c.center}>
        <h1 className={c.slogan}>
          Together On Time: <span>Get teams there quicker, together.</span>
        </h1>
        <div className={c["card"]}>
          <div className={c["card-info"]}>
            <div className={c["card-avatar"]}></div>
            <div className={c["card-title"]}>Lahcen</div>
            <div className={c["card-subtitle"]}>ROOT &amp; transport agent</div>
          </div>
        </div>

        <div className={c.content}>
            <Shifts title={"morning"}  data={morning}/>
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
