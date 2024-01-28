import { useSelector } from "react-redux";
import c from "./Home.module.css";
import Crews from "./Crews";
import CrewIndiData from "./CrewIndiData";
import { useState } from "react";

const Home = (p) => {
  const { data } = useSelector((s) => s.datas);
  const [selectedData, setSelectedData] = useState(false);

  const getSelectedData = () => {
    setSelectedData(false);
    setTimeout(()=>setSelectedData(true), 100);
  };
  console.log(selectedData);

  return (
    <div className={c.wrapper}>
      <div className={c.center}>
        <h1 className={c.slogan}>
          Together On Time: <span>Get teams there quicker, together.</span>
        </h1>
        <div className={c["card"]}>
          <div className={c["card-info"]}>
            <div className={c["card-avatar"]}></div>
            <div className={c["card-title"]}>amine tayia</div>
            <div className={c["card-subtitle"]}>planning Leader</div>
          </div>
        </div>
        <div className={c.content}>
          <Crews data={data} title="crews" setDataSelected={getSelectedData} />
          <Crews
            data={data}
            title="individuals"
            setDataSelected={getSelectedData}
          />
        </div>
        {selectedData && <CrewIndiData data={data}  setDataSelected={getSelectedData}/>}
      </div>
    </div>
  );
};

export default Home;
