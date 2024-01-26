import { useDispatch, useSelector } from "react-redux";
import { getCrewsfilter, getIndivFilter } from "../hooks/getCrews";
import c from "./Crews.module.css";
import { dataSliceAction } from "../store/DataSlice";

const Crews = (p) => {
  const { data } = useSelector((s) => s.datas);
  const dispatch=useDispatch();

  console.log(data);
  let datas =
    p.title === "crews" ? getCrewsfilter(data) : getIndivFilter(data);
  console.log(datas);
  const ClickHandler = (name) => {
    console.log(name);
    if (p.title === "crews") {
      p.setDataSelected();
      dispatch(dataSliceAction.setDatac({
        data:datas.filter((f) => f.crewName === name),
        status:p.title,
        name: name
      }))
    } else {
      p.setDataSelected();
      dispatch(dataSliceAction.setDatac({
        data:datas.filter((f) => f.matricule === name),
        status: p.title,
        name: name
      }))
    }
  };
  return (
    <div className={c.crewHolder}>
      <h1 className={c.title}>{p.title}</h1>
      {datas.length > 0 ? (
        datas.map((m, i) => (
          <span
            key={i}
            onClick={() =>
              ClickHandler(p.title === "crews" ? m.crewName : m.matricule)
            }
          >
            {p.title === "crews" ? m.crewName : m.matricule}
          </span>
        ))
      ) : (
        <h1 className={c.notFound}>no {p.title} found </h1>
      )}
    </div>
  );
};

export default Crews;
