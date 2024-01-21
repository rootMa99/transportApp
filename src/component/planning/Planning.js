import { useSelector } from "react-redux";
import c from "../home/Home.module.css";
import cs from "../home/Crews.module.css";
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
  console.log(crews, individuals, night, type);
  const handleDragStart = (e, id, type) => {
    e.dataTransfer.setData("text/plain", id);
    setType(type);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData("text/plain");

    // Perform the action you want with the dragged item and target
    console.log(`Item with ID ${draggedItem} dropped onto ${targetId}`);
    if (type === "indiv") {
      if (targetId === "night") {
        const selected = individuals.filter(
          (f) => f.matricule === +draggedItem
        );
        console.log("ruun", selected);
        setNight((prev) => [...prev, ...selected]);
        setIndividuals((prev) => [
          ...prev.filter((f) => f.matricule !== +draggedItem),
        ]);
      }
      if (targetId === "morning") {
        const selected = individuals.filter(
          (f) => f.matricule === +draggedItem
        );
        console.log("ruun", selected);
        setMor((prev) => [...prev, ...selected]);
        setIndividuals((prev) => [
          ...prev.filter((f) => f.matricule !== +draggedItem),
        ]);
      }
      if (targetId === "evening") {
        const selected = individuals.filter(
          (f) => f.matricule === +draggedItem
        );
        console.log("ruun", selected);
        setEvening((prev) => [...prev, ...selected]);
        setIndividuals((prev) => [
          ...prev.filter((f) => f.matricule !== +draggedItem),
        ]);
      }
    }
    if (type === "crew") {
      if (targetId === "night") {
        const selected = individuals.filter((f) => f.crewName === draggedItem);
        console.log("ruun", selected);
        setNight((prev) => [...prev, ...selected]);
        setCrews((prev) => [
          ...prev.filter((f) => f.crewName !== draggedItem),
        ]);
      }
      if (targetId === "morning") {
        const selected = individuals.filter((f) => f.crewName === draggedItem);
        console.log("ruun", selected);
        setMor((prev) => [...prev, ...selected]);
        setCrews((prev) => [
          ...prev.filter((f) => f.crewName !== draggedItem),
        ]);
      }
      if (targetId === "evening") {
        const selected = individuals.filter((f) => f.crewName === draggedItem);
        console.log("ruun", selected);
        setEvening((prev) => [...prev, ...selected]);
        setCrews((prev) => [
          ...prev.filter((f) => f.crewName !== draggedItem),
        ]);
      }
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
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderPsM}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "morning")}
          >
            <h1 className={cs.titles}>morning</h1>
          </div>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderPsE}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "evening")}
          >
            <h1 className={cs.titles}>evenning</h1>
          </div>
          <div
            className={`${cs.crewHolderPs} ${cs.crewHolderPsN}`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, "night")}
          >
            <h1 className={cs.titles}>night</h1>
            {night.length === 0 ? (
              <h1>NO Item</h1>
            ) : (
              night.map((m, i) =>
                m.hasOwnProperty("crewName") ? (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) => handleDragStart(e, m.crewName, "crew")}
                  >
                    {m.crewName}
                  </span>
                ) : (
                  <span
                    key={i}
                    draggable
                    onDragStart={(e) =>
                      handleDragStart(e, m.matricule, "indiv")
                    }
                  >
                    {m.matricule}
                  </span>
                )
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planning;
