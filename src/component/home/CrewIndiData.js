import { useState } from "react";
import c from "./CrewIndiData.module.css";
import SelectDrop from "../ui/SelectDrop";
import BackDrop from "../ui/BackDrop";
import { useSelector } from "react-redux";

const CrewIndiData = (p) => {
  //const { data } = useSelector((s) => s.datas);
  
  console.log("ddd", p.data);
  const [data, setData] = useState(
    p.data.status === "crews" && p.data.data[0].employee
  );
    const [changePar, setChangePar]=useState(false);
    const [matricule, setMatricule]=useState(null);

    
  const [inputValue, setInputValue] = useState("");
  const changeHandler = (e) => {
    console.log(e.target.value, data);
    setData(p.data.data[0].employee);
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputValue(value);
      if (e.target.value.trim() !== "") {
        setData((prev) =>
          Array.from(prev).filter((obj) =>
            String(obj["matricule"]).includes(e.target.value)
          )
        );
      }
    }
  };

  const changeParada=(e, matricule)=>{
    setMatricule(matricule);
    setChangePar(true);
  }
  const closeParada=e=>{
    setChangePar(false);
  }
  
  return (
    <div className={c.holder}>
    {changePar&& <SelectDrop closeParada={closeParada} matricule={matricule}/> }
    {changePar&& <BackDrop /> }
      <h1 className={c.title}>{p.data.name} Details </h1>
      {p.data.status === "crews" && (
        <input
          className={c.input}
          type="text"
          placeholder="Search by Matricule"
          value={inputValue}
          pattern="[0-9]*"
          onChange={changeHandler}
        />
      )}
      <table className={`${c.table}`}>
        <thead>
          <tr style={{ backgroundColor: "#761904" }}>
            <th>Matricule</th>
            <th>first Name</th>
            <th>last name</th>
            <th>category</th>
            <th>crew</th>
            <th>plannig Leader</th>
            <th>user Leader</th>
            <th>parada</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {p.data.status === "crews"
            ? data.map((m, i) => (
                <tr
                  key={i}
                  style={
                    m.status === "infirmity"
                      ? { backgroundColor: "#393E41" }
                      : m.status === "inapt"
                      ? { backgroundColor: "#3D305F" }
                      :  m.status === "ctp"
                      ? {backgroundColor:"#02383C"}
                      : {}
                  }
                >
                  <td>{m.matricule}</td>
                  <td>{m.lastName}</td>
                  <td>{m.name}</td>
                  <td>{m.category}</td>
                  <td>{m.crew}</td>
                  <td>{m.plannigLeader}</td>
                  <td className={c.spec}>{m.userLeader}</td>
                  <td className={c.spec} onClick={(e)=> changeParada(e, m.matricule)}>{m.parada}</td>
                  <td className={c.spec}>{m.status} </td>
                </tr>
              ))
            : p.data.data.map((m, i) => (
                <tr
                  key={i}
                  style={
                    m.status === "infirmity"
                      ? { backgroundColor: "#393E41" }
                      : m.status === "inapt"
                      ? { backgroundColor: "#3D305F" }
                      : m.status === "ctp"
                      ? {backgroundColor:"#02383C"}
                      : {}
                  }
                >
                  <td>{m.matricule}</td>
                  <td>{m.lastName}</td>
                  <td>{m.name}</td>
                  <td>{m.category}</td>
                  <td>{m.crew}</td>
                  <td>{m.plannigLeader}</td>
                  <td className={c.spec}>{m.userLeader}</td>
                  <td className={c.spec} onClick={(e)=> changeParada(e, m.matricule)}>{m.parada}</td>
                  <td>{m.status}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrewIndiData;
