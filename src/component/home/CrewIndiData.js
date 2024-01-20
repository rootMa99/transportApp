
import c from "./CrewIndiData.module.css";


const CrewIndiData = (p) => {
  console.log("ddd", p.data)
  return (
    <div className={c.holder}>
      <h1 className={c.title} >{p.data.name} Details </h1>
      <table className={c.table}>
        <thead>
          <tr>
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
        {
          p.data.status=== "crews" ? p.data.data[0].employee.map((m, i)=><tr key={i}>
            <td>{m.matricule}</td>
            <td>{m.lastName}</td>
            <td>{m.name}</td>
            <td>{m.category}</td>
            <td>{m.crew}</td>
            <td>{m.plannigLeader}</td>
            <td>{m.userLeader}</td>
            <td>{m.parada}</td>
            <td>status</td>
          </tr>) :''
        }
        </tbody>
      </table>
    </div>
  );
};


export default CrewIndiData;