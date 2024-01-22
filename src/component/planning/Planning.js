import { useSelector } from "react-redux";
import c from "../home/Home.module.css";
import cs from "../home/Crews.module.css";
import morning from "../../assets/morning.png";
import eveningpic from "../../assets/evening.png";
import nightPic from "../../assets/night.png";
import enAm from "../../assets/8am.png";
import enpm from "../../assets/16h.png";
import enpmt from "../../assets/17h.png";
import { getCrewsfilter, getIndivFilter } from "../hooks/getCrews";
import { useState } from "react";

const Planning = (p) => {
  const { data } = useSelector((s) => s.datas);
  const [crews, setCrews] = useState(getCrewsfilter(data));
  const [individuals, setIndividuals] = useState(getIndivFilter(data));
  const [night, setNight] = useState([]);
  const [mor, setMor] = useState([]);
  const [evening, setEvening] = useState([]);
  const [type, setType] = useState();
  const [zone, setZone] = useState();
  console.log(crews, individuals, night, type, zone);
  const handleDragStart = (e, id, type, zone) => {
    e.dataTransfer.setData("text/plain", id);
    setType(type);
    setZone(zone);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text/plain");

    // Perform the action you want with the dragged item and target
    console.log(`Item with ID ${draggedItem} dropped onto ${targetId}`);
    if (zone === undefined) {
      const selected =
        type === "indiv"
          ? individuals.filter((f) => f.matricule === +draggedItem)
          : crews.filter((f) => f.crewName === draggedItem);
      console.log("ruun", selected);
      if (targetId === "night") {
        if (type === "indiv") {
          if (selected[0].status === "inem") {
            alert("This employee cannot work the night shift.");
          }
        } else {
          selected[0].employee.map(
            (m) =>
              m.status === "inem" &&
              alert(
                `${m.name} ${m.lastName}, matricule ${m.matricule} cannot work the night shift.`
              )
          );
        }
        setNight((prev) => [...prev, ...selected]);
      }
      targetId === "morning" && setMor((prev) => [...prev, ...selected]);
      targetId === "evening" && setEvening((prev) => [...prev, ...selected]);

      type === "indiv"
        ? setIndividuals((prev) => [
            ...prev.filter((f) => f.matricule !== +draggedItem),
          ])
        : setCrews((prev) => [
            ...prev.filter((f) => f.crewName !== draggedItem),
          ]);
    } else {
      const selecte = () => {
        if (zone === "morning") {
          type === "indiv"
            ? setMor((prev) => [
                ...prev.filter((f) => f.matricule !== +draggedItem),
              ])
            : setMor((prev) => [
                ...prev.filter((f) => f.crewName !== draggedItem),
              ]);
          return type === "indiv"
            ? mor.filter((f) => f.matricule === +draggedItem)
            : mor.filter((f) => f.crewName === draggedItem);
        }
        if (zone === "evening") {
          type === "indiv"
            ? setEvening((prev) => [
                ...prev.filter((f) => f.matricule !== +draggedItem),
              ])
            : setEvening((prev) => [
                ...prev.filter((f) => f.crewName !== draggedItem),
              ]);
          return type === "indiv"
            ? evening.filter((f) => f.matricule === +draggedItem)
            : evening.filter((f) => f.crewName === draggedItem);
        }
        if (zone === "night") {
          type === "indiv"
            ? setNight((prev) => [
                ...prev.filter((f) => f.matricule !== +draggedItem),
              ])
            : setNight((prev) => [
                ...prev.filter((f) => f.crewName !== draggedItem),
              ]);
          return type === "indiv"
            ? night.filter((f) => f.matricule === +draggedItem)
            : night.filter((f) => f.crewName === draggedItem);
        }
      };
      const selected = selecte();
      console.log("ruun", selected);
      if (targetId === "night") {
        if (type === "indiv") {
          if (selected[0].status === "inem") {
            alert("This employee cannot work the night shift.");
          }
        } else {
          selected[0].employee.map(
            (m) =>
              m.status === "inem" &&
              alert(
                `${m.name} ${m.lastName}, matricule ${m.matricule} cannot work the night shift.`
              )
          );
        }
        setNight((prev) => [...prev, ...selected]);
      }
      targetId === "morning" && setMor((prev) => [...prev, ...selected]);
      targetId === "evening" && setEvening((prev) => [...prev, ...selected]);
    }
  };

  return (
    <div className={c.wrapper}>
      <div className={c.center}>
        <div className={c.content}>
          <div className={cs.crewHolderP}>
            <h1 className={cs.title}>crews</h1>
            {crews.length > 0 ? (
              crews.map((m, i) => (
                <span
                  key={i}
                  draggable
                  onDragStart={(e) => handleDragStart(e, m.crewName, "crew")}
                >
                  {m.crewName}
                </span>
              ))
            ) : (
              <h1 className={cs.notFound}>no crews found </h1>
            )}
          </div>
          <div className={cs.crewHolderP}>
            <h1 className={cs.title}>individuals</h1>
            {individuals.length > 0 ? (
              individuals.map((m, i) => (
                <span
                  key={i}
                  draggable
                  onDragStart={(e) => handleDragStart(e, m.matricule, "indiv")}
                >
                  {m.matricule}
                </span>
              ))
            ) : (
              <h1 className={cs.notFound}>no crews found </h1>
            )}
          </div>
        </div>
        <div className={cs.crewHolderPSh}>
          <h1 className={cs.titles}>Shifts</h1>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderPsM} ${cs.crewHolderP}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "morning")}
          >
            <img src={morning} alt="mor" className={cs.img} />
            {mor.length === 0 ? (
              <h1 className={cs.notFound}>NO Item</h1>
            ) : (
              mor.map((m, i) =>
                m.hasOwnProperty("crewName") ? (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.crewName, "crew", "morning")
                    }
                  >
                    {m.crewName}
                  </span>
                ) : (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.matricule, "indiv", "morning")
                    }
                  >
                    {m.matricule}
                  </span>
                )
              )
            )}
          </div>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderPsE} ${cs.crewHolderP}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "evening")}
          >
            <img src={eveningpic} alt="mor" className={cs.img} />

            {evening.length === 0 ? (
              <h1 className={cs.notFound}>NO Item</h1>
            ) : (
              evening.map((m, i) =>
                m.hasOwnProperty("crewName") ? (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.crewName, "crew", "evening")
                    }
                  >
                    {m.crewName}
                  </span>
                ) : (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.matricule, "indiv", "evening")
                    }
                  >
                    {m.matricule}
                  </span>
                )
              )
            )}
          </div>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderPsN} ${cs.crewHolderP}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "night")}
          >
            <img src={nightPic} alt="mor" className={cs.img} />
            {night.length === 0 ? (
              <h1 className={cs.notFound}>NO Item</h1>
            ) : (
              night.map((m, i) =>
                m.hasOwnProperty("crewName") ? (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.crewName, "crew", "night")
                    }
                  >
                    {m.crewName}
                  </span>
                ) : (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.matricule, "indiv", "night")
                    }
                  >
                    {m.matricule}
                  </span>
                )
              )
            )}
          </div>
        </div>
        <div className={cs.crewHolderPSh}>
          <h1 className={cs.titles}>Admin</h1>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderAdmin} ${cs.crewHolderP}`}
            // onDragOver={handleDragOver}
            // onDrop={(e) => handleDrop(e, "morning")}
          >
            <img src={enAm} alt="mor" className={cs.imgs} />
            <img src={enpm} alt="mor" className={cs.imgss} />
            <h1 className={cs.notFound}>NO Item</h1>
          </div>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderAdmin} ${cs.crewHolderP}`}
            // onDragOver={handleDragOver}
            // onDrop={(e) => handleDrop(e, "night")}
          >
            <img src={enAm} alt="mor" className={cs.imgs} />
            <img src={enpmt} alt="mor" className={cs.imgss} />
            <h1 className={cs.notFound}>NO Item</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planning;
