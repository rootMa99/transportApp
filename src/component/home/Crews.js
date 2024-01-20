

import { getCrewsfilter } from "../hooks/getCrews";
import c from "./Crews.module.css";

const Crews=p=>{
    console.log(p.data);
    let data=getCrewsfilter(p.data);
    console.log(data);

    return(
        <div className={c.crewHolder}>
            <h1>{p.title}</h1>
            {
                data.map(m=><span>{m.crewName}</span>)
            }
            {
                data.map(m=><span>{m.crewName}</span>)
            }
            {
                data.map(m=><span>{m.crewName}</span>)
            }
            {
                data.map(m=><span>{m.crewName}</span>)
            }
            {
                data.map(m=><span>{m.crewName}</span>)
            }
            {
                data.map(m=><span>{m.crewName}</span>)
            }
            {
                data.map(m=><span>{m.crewName}</span>)
            }
            {
                data.map(m=><span>{m.crewName}</span>)
            }
            {
                data.map(m=><span>{m.crewName}</span>)
            }
        </div>
    )
}

export default Crews;