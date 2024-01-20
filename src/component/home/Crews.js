import { getCrewsfilter, getIndivFilter } from "../hooks/getCrews";
import c from "./Crews.module.css";

const Crews = (p) => {
  console.log(p.data);
  let data =
    p.title === "crews" ? getCrewsfilter(p.data) : getIndivFilter(p.data);
  console.log(data);
    const ClickHandler =name=>{
        console.log(name)
    }
  return (
    <div className={c.crewHolder}>
      <h1 className={c.title}>{p.title}</h1>
      {data.length > 0 ? (
        data.map((m, i) => (
          <span key={i} onClick={()=>ClickHandler(p.title === "crews" ? m.crewName : m.matricule)}>{p.title === "crews" ? m.crewName : m.matricule}</span>
        ))
      ) : (
        <h1 className={c.notFound}>no {p.title} found </h1>
      )}
    </div>
  );
};

export default Crews;
