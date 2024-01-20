import { useSelector } from "react-redux";
import c from "./Home.module.css";
import Crews from "./Crews";

const Home = (p) => {
  const {data } = useSelector((s) => s.datas);

  return (
    <div className={c.wrapper}>
      <h1 className={c.slogan}>Together On Time: <span>Get teams there quicker, together.</span></h1>
      <div className={c.content}>
        <Crews data={data} title="crews" />
        <Crews data={data} title="individuals" />
      </div>
    </div>
  );
};

export default Home;
