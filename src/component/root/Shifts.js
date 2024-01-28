import c from "./Shifts.module.css";

const Shifts = (p) => {
  return (
    <div className={c.crewHolder}>
      <h1 className={c.title}>{p.title}</h1>
      <table className={c.table}>
        <thead>
          <tr style={{ backgroundColor: "#761904" }}>
            <th className={c.paradaTable}>parada</th>
            <th className={c.matricluesTable}>matricules</th>
          </tr>
        </thead>
        <tbody>
          {p.data.map(m=><tr>
            <td>{m.parada} </td>
            <td className={c.matriculesh} >{
                m.matricule.map(m=><p>{m}</p>)
            } </td>
          </tr>)}
        </tbody>
      </table>
    </div>
  );
};

export default Shifts;
