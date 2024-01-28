import c from "./Shifts.module.css";
import * as XLSX from "xlsx";

const Shifts = (p) => {
  console.log(p.data);

  const flattenMatricule = (data) => {
    return data.map(item => ({
      parada: item.parada,
      matricule: item.matricule.join(', ') // Flatten the matricule array to a string
    }));
  };

  const arrayToExcel = (data, filename) => {
    const datam = flattenMatricule(data);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(datam);
    XLSX.utils.book_append_sheet(wb, ws, filename);
    XLSX.writeFile(wb, filename + ".xlsx");
  };
  return (
    <div className={c.crewHolder}>
      <h1 className={c.title}>{p.title}</h1>
      <div className={c.tableHolder}>
        <table className={c.table}>
          <thead>
            <tr style={{ backgroundColor: "#761904" }}>
              <th className={c.paradaTable}>parada</th>
              <th className={c.matricluesTable}>matricules</th>
            </tr>
          </thead>
          <tbody>
            {p.data.length > 0 ? (
              p.data.map((m) => (
                <tr>
                  <td>{m.parada} </td>
                  <td className={c.matriculesh}>
                    {m.matricule.map((m) => (
                      <p>{m}</p>
                    ))}{" "}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>no Item </td>
                <td className={c.matriculesh}>no Item </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {p.data.length > 0 && (
        <button className={c.button} type="button" onClick={()=>arrayToExcel(p.data, p.title)}>
          <span className={c["button__text"]}>Download</span>
          <span className={c["button__icon"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35 35"
              id="bdd05811-e15d-428c-bb53-8661459f9307"
              data-name="Layer 2"
              className={c.svg}
            >
              <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
              <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
              <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default Shifts;
